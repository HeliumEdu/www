---
title: Using Exports to Backup Data, Move Between Accounts
description: "Export your full Helium schedule as JSON to back up your data, transfer to another account, or seed an automated import."
category: import-export-and-backup
publishedDate: 2026-05-19
updatedDate: 2026-05-19
---

## Overview

Helium lets you export your data as a JSON file, which can be used to archive your data or transfer it to another Helium account.

## Exporting Your Data

  1. Open [**Settings → Import / Export**](https://app.heliumedu.com/settings)
  2. Click **Export**

## Importing Data

  1. Open [**Settings → Import / Export**](https://app.heliumedu.com/settings)
  2. Click **Import** and select your backup file

Imported data is added alongside existing schedules in separate groups and does not overwrite anything already in your account.

## Moving Data to Another Account

  1. Export your data from the source account (steps above)
  2. Sign out and sign in to the destination account
  3. Import the backup file

> **Note:** Backups store notes in a dedicated **notes** section. Older backups that used the legacy **comments** or **details** fields will be preserved and automatically converted to **Notes** when imported. Newer backups will not include these legacy fields, so they will not import as **comments** or **details** into Helium Classic.

## Build Your Own Integration

Helium's import endpoint accepts the same JSON format produced by its exports. You can use scripts or other tooling to build your own integration to migrate from another planner or automate the import process for a syllabus or course outline.

The full schema and authentication flow are in our [API docs](https://api.heliumedu.com/docs). Helium does not maintain or support any official tooling for this, but we've made the platform accessible so you can build your own.

## Related Articles

  * [What Is Included in a Helium Backup (and What Isn't)?](/support/import-export-and-backup/what-is-included-in-a-helium-backup-and-what-isnt)
  * [Re-Importing the "Example Schedule"](/support/import-export-and-backup/re-importing-the-example-schedule)
  * [Where to Start with Helium](/support/getting-started/where-to-start-with-helium)
  * [Using the Helium API](/support/sync-and-integration/using-the-helium-api)

---

## Helium Classic

In Helium Classic, access Import/Export via **Account → Settings → Import/Export**.

The process is the same — click **Export** to download or select a file and click **Import** to restore.

__Helium Classic will remain available until July 31, 2026.__
