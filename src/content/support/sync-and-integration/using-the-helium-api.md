---
title: Using the Helium API
description: "Build your own integrations on top of Helium's public REST API — anything you can do in the apps is available via the API too."
category: sync-and-integration
publishedDate: 2026-05-19
updatedDate: 2026-05-29
---

## Overview

Helium exposes a public REST API. Anything you can do in the iOS, Android, or web apps — view classes, add assignments, see grades, edit notes, run a bulk import — is also available via the API. The full schema and authentication reference live in our [API docs](https://api.heliumedu.com/docs).

Helium doesn't maintain official tooling or pre-built integrations, but the platform is open so you can build your own. Helium is also open source on [GitHub](https://github.com/HeliumEdu) — contributions are welcome, and if you build something with the API and want to share it, [let us know](/support/submit/).

> **Tip:** If you'd rather not write any code, the AI-assisted prompt in [Where to Start with Helium](/support/getting-started/where-to-start-with-helium/#the-prompt) is a no-code way to use the import endpoint — paste it into any modern AI assistant, attach your syllabi, and upload the file it produces.

## Getting Your API Token

To use the API from a script or tool, you need an **API token** — a long-lived key you can copy into your script, save in a password manager, or paste into something like Postman.

> **Important:** Your new API token is shown **exactly once**. Copy it the moment you see it and save it somewhere safe. If you lose it, you can always generate a new one with these same steps.

> **Note:** This requires a Helium password. If you signed up with an OAuth provider (Google, Apple, or Microsoft) and haven't set one yet, go to **Settings → Set Password** first.

  1. **Sign in.** Trade your email and password for a short-lived session token:

     ```sh
     curl -X POST https://api.heliumedu.com/auth/token/ \
       -H 'Content-Type: application/json' \
       -d '{"email": "you@example.com", "password": "your-password"}'
     # → {"access": "<SESSION>", "refresh": "..."}
     ```

  2. **Request your API token** using that session:

     ```sh
     curl -X POST https://api.heliumedu.com/auth/api-token/ \
       -H 'Authorization: Bearer <SESSION>'
     # → {"token": "<API_TOKEN>", "created_at": "..."}
     ```

  3. **Use the API token** on every API call from then on:

     ```sh
     curl https://api.heliumedu.com/planner/courses/ \
       -H 'Authorization: Token <API_TOKEN>'
     ```

For the full authentication reference, see the [API docs](https://api.heliumedu.com/docs#section/Authentication).

## Rotating or Revoking Your Token

  * **Rotate** — get a fresh token and invalidate the old one. Repeat step 2 above. Do this if you think your token may have leaked, or on a schedule of your own choosing.
  * **Revoke** — turn off your current token without replacing it:

    ```sh
    curl -X DELETE https://api.heliumedu.com/auth/api-token/ \
      -H 'Authorization: Bearer <SESSION>'
    ```

> **Note:** Only one API token is active per Helium account at a time. If you have multiple scripts or tools that need access, you can use the same token across all of them (just be sure to rotate them together, if you request a new token).

## Related Articles

  * [Where to Start with Helium](/support/getting-started/where-to-start-with-helium/)
  * [Importing & Exporting Your Data](/support/import-export-and-backup/importing-and-exporting-your-data/)

---
