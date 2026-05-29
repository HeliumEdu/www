---
title: Why Items Aren't Showing on the Planner
description: "Troubleshoot missing assignments, events, class schedules, and external calendars on your Helium Planner — common causes and fixes."
category: calendar-and-schedule
publishedDate: 2026-05-19
updatedDate: 2026-05-19
---

If something isn't appearing on your Planner, one of the causes below is usually responsible. The first three apply to anything that can show on the Planner; the later sections cover what's specific to each item type.

## Common Causes

### Filters

The Planner has filter options that control what's displayed. A highlighted filter indicator means filters are currently active. If **Remember filter selections** is enabled in [**Settings → Preferences**](https://app.heliumedu.com/settings/preferences), filters from a previous session may still be in effect. Verify that the type of item you're looking for (Assignments, Events, Class Schedules, or External Calendars) is selected.

### Hidden Class Group

A hidden Class Group hides all of its class schedules and assignments. In [**Classes**](https://app.heliumedu.com/classes), a hidden group shows a closed eye icon — click it to make the group visible again.

### Wrong View

The **Todos** view displays only Assignments. Events, Class Schedules, and External Calendars will not appear there. Switch to **Week**, **Day**, **Month**, or **Agenda** if you're looking for any of those.

## Assignments or Events

### Date Range

Assignments are tied to the start and end date range of their class. An assignment scheduled outside its class's date range still appears on calendar views but does not appear in the **Todos** view. Verify the class's date range in [**Classes**](https://app.heliumedu.com/classes).

## Class Schedules

### Schedule Not Set Up

Class Schedule items appear on the Planner only when the class has a schedule. See [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes/) for setting up class meeting days and times.

### Date Range

Class Schedules are generated only for dates within the class's start and end dates. If you're viewing a date outside that range, the schedule will not appear.

## External Calendars

### Show on Calendar Toggle

Each external calendar has a **Show on calendar** toggle. If it's off, the calendar won't appear on the Planner. Find your calendar in [**Settings → External Calendars**](https://app.heliumedu.com/settings/external-calendars) and make sure the toggle is on.

If the toggle keeps turning itself off, something is likely wrong with the iCal feed itself — Helium automatically disables a calendar when it encounters recurring errors with the URL source.

### URL Changed

Some services rotate or invalidate feed URLs after account changes (changing your password, switching accounts, adjusting privacy settings). If a feed suddenly stops working, check the source URL to see if it's changed, and update it in [**Settings → External Calendars**](https://app.heliumedu.com/settings/external-calendars).

### Refresh Delay

Helium refreshes External Calendars on a periodic basis. If the source calendar updates slowly or its provider caches the feed, changes may take time to appear.

## Related Articles

  * [Planner Views, and Changing Your Default](/support/calendar-and-schedule/planner-views-and-changing-your-default/)
  * [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes/)
  * [How to Sync Google, Apple, or Other Calendars in to Helium Using External Calendars](/support/sync-and-integration/how-to-sync-google-apple-or-other-calendars-into-helium-using-external-calendars/)
