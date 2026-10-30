---
title: Importing & Exporting Your Data
description: "Import and export your Helium data to back up, restore, or transfer your schedule between accounts."
category: import-export-and-backup
publishedDate: 2026-05-19
updatedDate: 2026-10-29
---

## Overview

Helium lets you export your data as a JSON file, which can be used to archive your data or transfer it to another Helium account.

## Exporting Your Data

  1. Open [**Settings → Import / Export**](https://app.heliumedu.com/settings/import-export)
  2. Click **Export**

## Importing Data

> **Coming from another planner?** See our guides for moving your schedule into Helium from [iStudiez Pro](/support/import-export-and-backup/switching-from-istudiez-pro-to-helium/) or [myHomework](/support/import-export-and-backup/switching-from-myhomework-to-helium/).

  1. Open [**Settings → Import / Export**](https://app.heliumedu.com/settings/import-export)
  2. Click **Choose** and select your backup file
  3. Under **Import into**, keep **Create new groups**, or pick an existing group to add the file's classes to it
  4. Click **Import**

Imported data is added alongside what's already in your account — in new groups, or in the group you picked — and does not overwrite anything.

## Importing a Calendar (.ics) File

You can also import a calendar (`.ics`) file — for example, one exported from Google Calendar, Apple Calendar, or another planner.

  1. Open [**Settings → Import / Export**](https://app.heliumedu.com/settings/import-export)
  2. Click **Choose** and select your `.ics` file
  3. Under **Import into**, pick where the entries should go:
     * **An existing class** — each entry becomes an assignment in that class
     * **A new class** — a class is created in the group you pick, and each entry becomes an assignment in it
     * **Events** — each entry is added to your Planner as an Event, not tied to a class
  4. Click **Import**

A calendar only carries your schedule and due dates, so imported assignments start out ungraded and uncategorized — you can fill those in as the term goes on. A repeating entry becomes a separate assignment for each occurrence through the class's end date, or a single recurring Event when imported as Events.

> **Note:** A single `.ics` file imports into one place — Helium won't split one calendar across several classes. If yours covers multiple classes and you want them kept separate, split it into one `.ics` per class and import each on its own — or hand the whole calendar to [your AI assistant](/support/getting-started/where-to-start-with-helium/#use-ai-as-a-scheduling-assistant), which can sort a mixed calendar into the right classes for you.

## Moving Data to Another Account

  1. Export your data from the source account (steps above)
  2. Sign out and sign in to the destination account
  3. Import the backup file

> **Note:** Backups store notes in a dedicated **notes** section. Older backups that used the legacy **comments** or **details** fields will be preserved and automatically converted to **Notes** when imported.

## Data Transfer

The import endpoint accepts the same JSON format exports produce, making it straightforward to migrate data from another tool or automate schedule entry. [Using AI as a scheduling assistant](/support/getting-started/where-to-start-with-helium/#use-ai-as-a-scheduling-assistant) covers the no-code path; for scripted use, see [Using the Helium API](/support/sync-and-integration/using-the-helium-api/).

## Related Articles

  * [Switching from iStudiez Pro to Helium](/support/import-export-and-backup/switching-from-istudiez-pro-to-helium/)
  * [Switching from myHomework to Helium](/support/import-export-and-backup/switching-from-myhomework-to-helium/)
  * [What Is Included in a Helium Backup (and What Isn't)?](/support/import-export-and-backup/what-is-included-in-a-helium-backup-and-what-isnt/)
  * [Re-Importing the "Example Schedule"](/support/import-export-and-backup/re-importing-the-example-schedule/)
  * [Where to Start with Helium](/support/getting-started/where-to-start-with-helium/)
  * [Using the Helium API](/support/sync-and-integration/using-the-helium-api/)
