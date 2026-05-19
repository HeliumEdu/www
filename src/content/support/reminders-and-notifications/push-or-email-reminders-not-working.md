---
title: Push Notifications or Email Reminders Not Working
description: "Troubleshoot Helium reminders that aren't arriving — device and browser permissions, the Notification Center, missing emails, and recurring class reminders."
category: reminders-and-notifications
publishedDate: 2026-05-19
updatedDate: 2026-05-19
---

If a reminder didn't arrive, one of the causes below is usually responsible. Start with the section that matches the reminder **Type** you set, then check the causes that apply to both.

For how reminder types differ, see [Reminder Types: Push vs. Email Notifications](/support/reminders-and-notifications/reminder-types-push-vs-email-notifications).

## Push Notifications

### App or Browser Permission

Push reminders require notifications to be enabled for Helium on the device or browser you're using. When you first use Push, your device or browser may prompt you to allow notifications. If you previously declined, re-enable them in your device's system settings (or your browser's site settings for web), then reopen Helium.

### Helium Not Installed or Not Signed In on That Device

Push is delivered to the device or browser where Helium is signed in and notifications were allowed. Make sure Helium is installed and you're signed in there. See [Getting the Helium App (iOS, Android, and Web)](/support/getting-started/getting-the-helium-app-ios-android-and-web).

### Only Push Appears in the Notification Center

The Notification Center (bell icon) collects **Push** reminders only. Email reminders are delivered to your inbox and never appear there — this is expected, not a missing notification.

### Reminder Type Set to Email

Open the reminder and confirm its **Type** is **Push**. A reminder set to **Email** won't produce a push notification.

## Email Reminders

### Wrong Email or Filtered to Spam

Email reminders are sent to the email address on your account. Confirm that address is correct in [**Settings**](https://app.heliumedu.com/settings), and check your spam or promotions folder if a reminder is missing.

### Reminder Type Set to Push

Open the reminder and confirm its **Type** is **Email**. A reminder set to **Push** won't send an email.

## Both Types

### Remind Before Time Already Passed

A reminder only fires at its **Remind before** point ahead of the item. If you add a reminder whose lead time is already in the past (for example, a "1 day before" reminder on something due in an hour), there's no future moment left for it to fire.

### Recurring Class Reminders

Class reminders fire before each session of the class's recurring schedule. If the class has no schedule set up, or you're outside the class's term date range, there are no sessions to remind you about. See [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes).

### Item Was Edited or Deleted

Editing an assignment's or event's date or time reschedules its reminders automatically — verify the new timing is what you expect. Deleting an assignment, class, or event also deletes its reminders.

## Related Articles

  * [Setting Up and Managing Reminders](/support/reminders-and-notifications/setting-up-and-managing-reminders)
  * [Reminder Types: Push vs. Email Notifications](/support/reminders-and-notifications/reminder-types-push-vs-email-notifications)
  * [Getting the Helium App (iOS, Android, and Web)](/support/getting-started/getting-the-helium-app-ios-android-and-web)

---

## Helium Classic

Helium Classic supports **Popup** and **Email** reminders only. For a missing email, verify your registered email address is correct. **Popup** reminders are delivered in the browser.

__Helium Classic will remain available until July 31, 2026.__
