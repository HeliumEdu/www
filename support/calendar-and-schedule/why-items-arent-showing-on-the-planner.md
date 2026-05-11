<!-- Auto-synced from Freshdesk. Do not edit here — changes will be overwritten. To update this article, edit it in FreshDesk. -->

# Why Items Aren't Showing on the Planner

Source: https://heliumedu.freshdesk.com/support/solutions/articles/159000418644

If something isn't appearing on your Planner, one of the causes below is usually responsible. The first three apply to anything that can show on the Planner; the later sections cover what's specific to each item type.

## Common Causes

### Filters

The Planner has filter options that control what's displayed. A highlighted filter indicator means filters are currently active. If **Remember filter selections** is enabled in [**Settings → Preferences**](https://app.heliumedu.com/settings), filters from a previous session may still be in effect. Verify that the type of item you're looking for (Assignments, Events, Class Schedules, or External Calendars) is selected.

### Hidden Class Group

A hidden Class Group hides all of its classes, schedules, and assignments. In [**Classes**](https://app.heliumedu.com/classes), a hidden group shows a closed eye icon — tap it to make the group visible again.

### Wrong View

The **Todos** view displays only Assignments. Events, Class Schedules, and External Calendars will not appear there. Switch to **Week** , **Day** , **Month** , or **Agenda** if you're looking for any of those.

## Assignments or Events

### Date Range

Assignments are tied to the start and end date range of their class. An assignment scheduled outside its class's date range still appears on calendar views but does not appear in the **Todos** view. Verify the class's date range in [**Classes**](https://app.heliumedu.com/classes).

## Class Schedules

### Schedule Not Set Up

Class Schedule items appear on the Planner only when the class has a schedule. See [Setting Up and Managing Classes](https://heliumedu.freshdesk.com/support/solutions/articles/159000427002) for setting up class meeting days and times.

### Date Range

Class Schedules are generated only for dates within the class's start and end dates. If you're viewing a date outside that range, the schedule will not appear.

## External Calendars

### Show on Calendar Toggle

Each external calendar has a **Show on calendar** toggle. If it's off, the calendar won't appear on the Planner. Find your calendar in [**Settings → External Calendars**](https://app.heliumedu.com/settings) and make sure the toggle is on.

If the toggle keeps turning itself off, the URL is likely invalid — Helium automatically disables a calendar when it encounters a load error.

### Invalid iCal/ICS URL

The URL for an External Calendar must return a valid iCal/ICS feed. HTML links to a webpage or a Google Calendar "share" URL will not work. Check that:

  * The URL was copied from your calendar app's **Subscribe** or **Add by URL** option (see [How to Sync Google, Apple, or Other Calendars in to Helium Using External Calendars](https://heliumedu.freshdesk.com/support/solutions/articles/159000418651))
  * There are no extra spaces before or after the URL

### URL Changed

Some services rotate or invalidate feed URLs after account changes (changing your password, switching accounts, adjusting privacy settings). If a feed suddenly stops working, re-copy the URL from the source and update it in [**Settings → External Calendars**](https://app.heliumedu.com/settings).

### Refresh Delay

Helium refreshes External Calendars on a periodic basis. If the source calendar updates slowly or its provider caches the feed, changes may take time to appear.

## Related Articles

  * [Planner Views, and Changing Your Default](https://heliumedu.freshdesk.com/support/solutions/articles/159000418667)
  * [Setting Up and Managing Classes](https://heliumedu.freshdesk.com/support/solutions/articles/159000427002)
  * [How to Sync Google, Apple, or Other Calendars in to Helium Using External Calendars](https://heliumedu.freshdesk.com/support/solutions/articles/159000418651)

---

## Helium Classic

The same troubleshooting steps apply in Helium Classic. The key navigation differences are:

  * The **Remember filter selections** setting is at [**Account → Settings → Preferences**](https://www.heliumedu.com/settings/#tab-preferences)
  * Active filters are indicated by blue dropdown indicators on the calendar
  * [**Classes**](https://www.heliumedu.com/planner/classes) is found under the Planner menu

 __Helium Classic will remain available until July 31, 2026.__
