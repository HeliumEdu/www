#!/usr/bin/env bash
#
# Syncs a CloudFront KeyValueStore with a redirect map so the edge can answer redirects instantly. The map is read as
# JSON from stdin, {"/path": "destination"}, and the store ends up with exactly those entries. Internal destinations
# (starting with "/") are stored as permanent redirects (301), other hosts as temporary ones (302).
#
# A missing or stale store is never fatal to the site, the edge falls back to whatever the origin serves.
#
# Usage: <command printing the map> | sync-redirects.sh <store-name> [--dry-run]

set -euo pipefail

STORE_NAME="${1:?Usage: sync-redirects.sh <store-name> [--dry-run]}"
DRY_RUN="${2:-}"
MAX_CHANGES_PER_CALL=50

DESIRED=$(jq -c --sort-keys '
  to_entries
  | map({key: .key, value: ((if (.value | startswith("/")) then "301 " else "302 " end) + .value)})
  | from_entries')

if ! jq -e 'all(to_entries[];
      (.key | startswith("/") and (endswith("/") | not) and (contains(".") | not))
      and (.value | length <= 1024))' <<< "$DESIRED" > /dev/null; then
  echo "Redirect keys must start with / and have no trailing slash or file extension, and values must fit 1024 bytes." >&2
  exit 1
fi

if [ "$DRY_RUN" = "--dry-run" ]; then
  jq -r 'to_entries[] | "\(.key) -> \(.value)"' <<< "$DESIRED"
  exit 0
fi

KVS_ARN=$(aws cloudfront list-key-value-stores \
  --query "KeyValueStoreList.Items[?Name=='${STORE_NAME}'].ARN | [0]" --output text)
if [ -z "$KVS_ARN" ] || [ "$KVS_ARN" = "None" ]; then
  echo "Key value store ${STORE_NAME} not found, redirects will not be accelerated." >&2
  exit 1
fi

CURRENT=$(aws cloudfront-keyvaluestore list-keys --kvs-arn "$KVS_ARN" --query 'Items' --output json)
CURRENT=$(jq -c '. // []' <<< "$CURRENT")

PUTS=$(jq -c -n --argjson desired "$DESIRED" --argjson current "$CURRENT" '
  [$desired | to_entries[]
   | select(.key as $key | ($current | map(select(.Key == $key and .Value == $desired[$key])) | length) == 0)
   | {Key: .key, Value: .value}]')
DELETES=$(jq -c -n --argjson desired "$DESIRED" --argjson current "$CURRENT" '
  [$current[] | .Key as $key | select($desired | has($key) | not) | {Key: $key}]')

PUT_COUNT=$(jq 'length' <<< "$PUTS")
DELETE_COUNT=$(jq 'length' <<< "$DELETES")

if [ "$PUT_COUNT" -eq 0 ] && [ "$DELETE_COUNT" -eq 0 ]; then
  echo "${STORE_NAME} is already in sync."
  exit 0
fi

if [ $((PUT_COUNT + DELETE_COUNT)) -gt "$MAX_CHANGES_PER_CALL" ]; then
  echo "${PUT_COUNT} puts and ${DELETE_COUNT} deletes exceed the ${MAX_CHANGES_PER_CALL} allowed per update." >&2
  exit 1
fi

ETAG=$(aws cloudfront-keyvaluestore describe-key-value-store --kvs-arn "$KVS_ARN" --query 'ETag' --output text)

ARGS=(--kvs-arn "$KVS_ARN" --if-match "$ETAG")
[ "$PUT_COUNT" -gt 0 ] && ARGS+=(--puts "$PUTS")
[ "$DELETE_COUNT" -gt 0 ] && ARGS+=(--deletes "$DELETES")

aws cloudfront-keyvaluestore update-keys "${ARGS[@]}" > /dev/null
echo "Synced ${STORE_NAME}: ${PUT_COUNT} added or changed, ${DELETE_COUNT} removed."
