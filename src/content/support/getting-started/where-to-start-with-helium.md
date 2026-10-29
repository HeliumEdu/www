---
title: Where to Start with Helium
description: "Set up Helium for a new term step by step, or let an AI assistant set it up from your syllabi — two ways to get started."
category: getting-started
publishedDate: 2026-05-19
updatedDate: 2026-10-29
---

There are two ways to set up Helium for a new term. Pick whichever fits how you like to work — both end with the same well-organized planner.

  * [**Manual setup**](#set-up-your-first-term) — the walkthrough below will get you started.
  * [**AI scheduling assistant**](#use-ai-as-a-scheduling-assistant) — give an AI assistant your syllabi and it sets up the whole term in Helium for you.

> **Coming from another planner?** See our guides for moving your schedule into Helium from [iStudiez Pro](/support/import-export-and-backup/switching-from-istudiez-pro-to-helium/) or [myHomework](/support/import-export-and-backup/switching-from-myhomework-to-helium/).

## Set Up Your First Term

Each step below has a one-line summary and a link to the full article in the relevant category. If you already have an account and the app installed, skip straight to step 2.

  1. **Install Helium and sign in.** Available on iOS, Android, and the web — see [Getting the Helium App (iOS, Android, and Web)](/support/getting-started/getting-the-helium-app-ios-android-and-web/).
  2. **Add a Class Group for your term.** In Helium, your academic life is organized around **Class Groups** (e.g., "Fall 2026") and **Classes** within them. Open [**Classes**](https://app.heliumedu.com/classes), add a group, and set its start and end dates — see [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes/).
  3. **Add your first class and its schedule.** Inside the group, add a class with a title, color, and weekly meeting times — the same article also covers the **Details** and **Schedule** tabs.
  4. **Set up grading categories.** Needed only if your syllabus uses weights (e.g., Homework 20%, Exams 50%, Participation 30%) — see [Setting Up Weighted Grading & Assignment Categories](/support/grades-and-progress/setting-up-weighted-grading-assignment-categories/).
  5. **Add an assignment and a reminder.** Open the [**Planner**](https://app.heliumedu.com/planner), add an assignment to the class, and attach a push or email reminder — see [Setting Up and Managing Reminders](/support/reminders-and-notifications/setting-up-and-managing-reminders/). Assignments belong to a class, so steps 2 and 3 have to come first — with no classes, Planner items can only be created as Events.
  6. **Pick the Planner view that suits you.** Month, Week, 3-Day, Day, Agenda, or Todos — set the one you want as your default in [**Settings → Preferences**](https://app.heliumedu.com/settings/preferences). See [Planner Views, and Changing Your Default](/support/calendar-and-schedule/planner-views-and-changing-your-default/).

That's the minimum to get a usable term in Helium. Bring outside calendars in with **External Calendars**, or send Helium out to other apps with **Feeds** — see [Sync & Integration](/support/sync-and-integration/) when you're ready.

## Use AI as a Scheduling Assistant

Use an AI assistant to set up and keep track of your schedule. Give it your syllabi and it sets up your term in Helium: the Class Group, classes and meeting times, grading categories, assignments, and events. There are two ways to do it:

  * [**Connect your AI assistant**](#connect-your-ai-assistant) to Helium. It imports the term for you, and answers questions about your planner afterward.
  * [**Use a prompt**](#use-a-prompt-instead) with any AI assistant. It produces an import file, and you upload that file to Helium yourself.

Either way, nothing already in your account is changed or overwritten: a term imports as a new Class Group alongside what you already have. When an import finishes, spot-check the result: term dates on the Class Group, class colors and meeting times, category weights matching your syllabus, and a sample assignment's due date. Adjust anything directly in Helium. To start over, delete the imported Class Group and import again.

### Connect Your AI Assistant

Helium works with any AI assistant that supports custom connectors (also called MCP servers).

  1. In your AI assistant's settings, add a custom connector with the URL `https://mcp.heliumedu.com/mcp`.
  2. When Helium opens in your browser, sign in and click **Allow**.
  3. Attach the syllabus for every class in your term, and ask the assistant to import your term into Helium. Attaching them all at once keeps every class together in one Class Group.
  4. Answer the assistant's questions about anything your syllabi leave unclear. It checks the term with Helium before saving anything.

If a syllabus arrives after your term is in Helium, attach it and ask your assistant to add the class to that term.

Once connected, ask your assistant about your planner any time — "What's due this week?" or "What's my grade in BIO 151?" The assistant reads your assignments, events, notes, classes, resources, and grades. It never changes or deletes anything already in Helium.

### Use a Prompt Instead

If your assistant does not support custom connectors, use [the prompt below](#the-prompt). The assistant reads your syllabi and produces an import file, and you upload that file to Helium yourself.

  1. Copy [the prompt](#the-prompt).
  2. Open a new chat with your AI assistant and paste the prompt as your first message.
  3. The assistant reads [the Helium API docs](https://api.heliumedu.com/docs/), then asks you to attach your syllabi. Attach the syllabus for every class in your term at once.
  4. Answer the assistant's questions about anything your syllabi leave unclear. The prompt tells it to ask rather than guess — credits, lecture and lab structure, online or in-person, and vague due times come up often.
  5. Download the import file the assistant produces. You do not need to open it.
  6. In Helium, open [**Settings → Import / Export**](https://app.heliumedu.com/settings/import-export), click **Import**, and select the file.

If the assistant pastes text into the chat instead of producing a file, or its first attempt looks off (missing classes or wrong dates), ask it to regenerate the file strictly per the prompt.

### The Prompt

<details>
<summary><strong>Show the prompt</strong></summary>

```
You will produce a single JSON file that the user uploads to Helium via Settings → Import / Export → Import. The user will attach one or more syllabi after you confirm you've read the docs.

Before doing anything:

1. Open https://api.heliumedu.com/docs/. Find the section titled "Importing a schedule from a syllabus" and read it in full. It explains the import flow end-to-end, including the relationship-by-id pattern, schedule field defaults, and known limitations.
2. Find the section titled "Bulk import via /importexport/import/" and read it in its entirety. This section is the source of truth for what the bulk endpoint accepts — its request example, every field's purpose and format, and its constraints. This is the ONLY import mechanism you will use.
   The same docs page also documents per-entity API routes (GET/POST/PUT for course_groups, courses, course_schedules, homework, and so on, grouped under planner.* tags further down the page). These are useful as REFERENCE for what each entity's fields look like. They are NOT an import path. Do not generate a sequence of API calls against them, do not assume the user will run any HTTP requests, and do not let a per-entity request example mislead you about how the import works.
3. The docs are long and may be truncated, paginated, or summarized in your view — if any of the sections named above are not fully present, fetch the rest before continuing. A partial read is worse than no read; it produces output that looks plausible but isn't valid.
4. Read the section titled "Vocabulary (wire format vs. user-facing terms)" in full. The wire-format names you must use in the JSON (course_group, homework, resource, and so on) do not match the words a syllabus uses. Map syllabus language to wire-format keys via this table before generating.
5. Do not rely on prior knowledge of Helium. Confirm every field name, encoding, and relationship against the docs you just read.

After reading the sections above in full, tell the user you're ready and ask them to attach their source material — course syllabi, or an `.ics` file exported from another app. They can include every class for the term in a single conversation; you do not need them one at a time. An `.ics` file is source material to convert, not a file to upload as-is in this workflow: read its entries and fold them into the JSON you produce, and use the interview below to fill in what an `.ics` cannot carry — grading categories and weights, meeting schedules, and credits.

Then interview the user about anything the syllabi do not make explicit. The principle is no assumptions — the docs decide Helium's shape; the user decides what their syllabi, school, and schedule mean. If something could be read more than one way, ask. And if you still can't confirm a value after asking — for any reason, on any side — leave the field (or the whole item) off rather than inventing one. Omission is always safer than invention. Common things student syllabi leave ambiguous, and that you should ask about whenever they aren't clearly stated:

  - The user's IANA timezone (e.g., America/Los_Angeles)
  - Term start and end dates
  - Credits per course — frequently omitted from syllabi; ask, do not invent
  - Whether lecture and lab/recitation/discussion should be entered as one course or as separate courses
  - Online vs. in-person, and the room or location when in-person
  - Days and times when a class meets at different times on different days
  - Recurring assignments without specific dated entries ("weekly problem sets") — ask for the actual dates
  - Time-of-day for assignments that say only "due in class" or "due that week"
  - Grading scheme — weighted categories with their weights, or total-points
  - Anything else in the syllabi that could be read more than one way

When you have everything you need:

  - Generate the JSON exactly matching the Export schema from the docs.
  - Deliver it as a downloadable file (e.g., helium-import.json) so the user can save it with a single click. Do NOT paste the file contents into chat as text or wrap them in a markdown code block — the user is non-technical and should not have to copy, format, or extract anything. The file you provide is what they upload directly to Helium via Settings → Import / Export.

You never call the Helium API and never see the user's password, token, or account data. Your only inputs are the syllabi and answers the user provides.
```

</details>

## Related Articles

  * [Getting the Helium App (iOS, Android, and Web)](/support/getting-started/getting-the-helium-app-ios-android-and-web/)
  * [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes/)
  * [Setting Up Weighted Grading & Assignment Categories](/support/grades-and-progress/setting-up-weighted-grading-assignment-categories/)
  * [Setting Up and Managing Reminders](/support/reminders-and-notifications/setting-up-and-managing-reminders/)
  * [Importing & Exporting Your Data](/support/import-export-and-backup/importing-and-exporting-your-data/)
  * [Using the Helium API](/support/sync-and-integration/using-the-helium-api/)
