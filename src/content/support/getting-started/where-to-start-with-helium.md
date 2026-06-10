---
title: Where to Start with Helium
description: "Set up Helium for a new term step by step, or import a whole syllabus at once with an AI-assisted prompt — two ways to get started."
category: getting-started
publishedDate: 2026-05-19
updatedDate: 2026-05-19
---

There are two ways to set up Helium for a new term. Pick whichever fits how you like to work — both end with the same well-organized planner.

  * [**Manual setup**](#set-up-your-first-term) — the walkthrough below will get you started.
  * [**AI-assisted syllabus import**](#import-a-whole-syllabus-with-ai) — paste [the prompt below](#the-prompt) into any modern AI assistant, attach your syllabi, and Helium imports the whole term from the file the AI produces.

## Set Up Your First Term

Each step below has a one-line summary and a link to the full article in the relevant category. If you already have an account and the app installed, skip straight to step 2.

  1. **Install Helium and sign in.** Available on iOS, Android, and the web — see [Getting the Helium App (iOS, Android, and Web)](/support/getting-started/getting-the-helium-app-ios-android-and-web/).
  2. **Add a Class Group for your term.** In Helium, your academic life is organized around **Class Groups** (e.g., "Fall 2026") and **Classes** within them. Open [**Classes**](https://app.heliumedu.com/classes), add a group, and set its start and end dates — see [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes/).
  3. **Add your first class and its schedule.** Inside the group, add a class with a title, color, and weekly meeting times — the same article also covers the **Details** and **Schedule** tabs.
  4. **Set up grading categories.** Needed only if your syllabus uses weights (e.g., Homework 20%, Exams 50%, Participation 30%) — see [Setting Up Weighted Grading & Assignment Categories](/support/grades-and-progress/setting-up-weighted-grading-assignment-categories/).
  5. **Add an assignment and a reminder.** Open the [**Planner**](https://app.heliumedu.com/planner), add an assignment to the class, and attach a push or email reminder — see [Setting Up and Managing Reminders](/support/reminders-and-notifications/setting-up-and-managing-reminders/).
  6. **Pick the Planner view that suits you.** Month, Week, Day, Agenda, or Todos — set the one you want as your default in [**Settings → Preferences**](https://app.heliumedu.com/settings/preferences). See [Planner Views, and Changing Your Default](/support/calendar-and-schedule/planner-views-and-changing-your-default/).

That's the minimum to get a usable term in Helium. Bring outside calendars in with **External Calendars**, or send Helium out to other apps with **Feeds** — see [Sync & Integration](/support/sync-and-integration/) when you're ready.

## Import a Whole Syllabus with AI

In this approach, an AI assistant (a modern LLM like ChatGPT, Claude, Gemini, or others) reads your syllabi and produces a single Helium import file. You then upload that file to Helium yourself.

### How It Works

  1. Copy the prompt in the next section.
  2. Open a fresh chat with the AI assistant of your choice. Paste the prompt as your first message.
  3. The AI will read [the Helium API docs](https://api.heliumedu.com/docs) you pointed it at. When it's ready, it will ask you to attach your syllabi — you can include every class in a single conversation.
  4. Answer the AI's follow-up questions about anything the syllabi don't make explicit. The prompt instructs the AI to ask rather than guess (credits, lecture/lab structure, online vs. in-person, vague due-by times, and similar often come up).
  5. The AI will produce an import file for you to download. Save it somewhere you can find it again — you do not need to open it.
  6. In Helium, open [**Settings → Import / Export**](https://app.heliumedu.com/settings/import-export), click **Import**, and select your saved file.
  7. Spot-check the result — term dates on the Class Group, class colors and meeting times, category weights matching your syllabus, and a sample assignment's due date. Tweak directly in Helium from there.

Each import adds new Class Groups alongside anything you've already added — nothing in your account gets overwritten. If you want to start over after a bad import, delete the imported Class Group and try again.

> **What the AI sees:** only the syllabus text you give it. **What the AI never sees:** your Helium password, email, or any account data. You stay signed in to Helium; the AI just builds the import file you upload yourself.

### The Prompt

```
You will produce a single JSON file that the user uploads to Helium via Settings → Import / Export → Import. The user will attach one or more syllabi after you confirm you've read the docs.

Before doing anything:

1. Open https://api.heliumedu.com/docs/. Find the section titled "Importing a schedule from a syllabus" and read it in full. It explains the import flow end-to-end, including the relationship-by-id pattern, schedule field defaults, and known limitations.
2. Find the section titled "Bulk import via /importexport/import/" and read it in its entirety. This section is the source of truth for what the bulk endpoint accepts — its request example, every field's purpose and format, and its constraints. This is the ONLY import mechanism you will use.
   The same docs page also documents per-entity API routes (GET/POST/PUT for course_groups, courses, course_schedules, homework, and so on, grouped under planner.* tags further down the page). These are useful as REFERENCE for what each entity's fields look like. They are NOT an import path. Do not generate a sequence of API calls against them, do not assume the user will run any HTTP requests, and do not let a per-entity request example mislead you about how the import works.
3. The docs are long and may be truncated, paginated, or summarized in your view — if any of the sections named above are not fully present, fetch the rest before continuing. A partial read is worse than no read; it produces output that looks plausible but isn't valid.
4. Read the section titled "Vocabulary (wire format vs. user-facing terms)" in full. The wire-format names you must use in the JSON (course_group, homework, material, and so on) do not match the words a syllabus uses. Map syllabus language to wire-format keys via this table before generating.
5. Do not rely on prior knowledge of Helium. Confirm every field name, encoding, and relationship against the docs you just read.

After reading the sections above in full, tell the user you're ready and ask them to attach their syllabi. They can include every class for the term in a single conversation; you do not need them one at a time.

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

If the AI's first attempt looks off (missing classes, wrong dates, or text pasted into the chat instead of a file to download), ask it to regenerate strictly per the prompt.

## Related Articles

  * [Getting the Helium App (iOS, Android, and Web)](/support/getting-started/getting-the-helium-app-ios-android-and-web/)
  * [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes/)
  * [Setting Up Weighted Grading & Assignment Categories](/support/grades-and-progress/setting-up-weighted-grading-assignment-categories/)
  * [Setting Up and Managing Reminders](/support/reminders-and-notifications/setting-up-and-managing-reminders/)
  * [Importing & Exporting Your Data](/support/import-export-and-backup/importing-and-exporting-your-data/)
  * [Using the Helium API](/support/sync-and-integration/using-the-helium-api/)
