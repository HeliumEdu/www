<!-- Auto-synced from Freshdesk. Do not edit here — changes will be overwritten. To update this article, edit it in FreshDesk. -->

# Using Exports to Backup Data, Move Between Accounts

Source: https://heliumedu.freshdesk.com/support/solutions/articles/159000418665

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

Helium's import endpoint accepts the same JSON format produced by the export. If you can write a script — or use a tool that can — you can build your own integration to migrate from another planner or automate import from a syllabus or course outline.

The full schema and authentication flow are in our [API docs](https://api.heliumedu.com/docs). Helium does not maintain or support any official tooling for this, we just make the platform accessible to you so you can build your own, if interested.

## Related Articles

  * [What Is Included in a Helium Backup (and What Isn't)?](https://heliumedu.freshdesk.com/support/solutions/articles/159000418666)
  * [Re-Importing the "Example Schedule"](https://heliumedu.freshdesk.com/support/solutions/articles/159000418664)
  * [Using the Helium API](https://heliumedu.freshdesk.com/support/solutions/articles/159000431246)

---

## Helium Classic

In Helium Classic, access Import/Export via **Account → Settings → Import/Export**.

The process is the same — click **Export** to download or select a file and click **Import** to restore.

__Helium Classic will remain available until July 31, 2026.__
