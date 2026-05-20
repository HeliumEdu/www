---
title: Understanding the Grades   Dashboard
description: "What the widgets on your Helium Grades dashboard are showing you — at-risk classes, progress vs. pace, ungraded work, and grade trends."
category: grades-and-progress
publishedDate: 2026-05-19
updatedDate: 2026-05-19
---

The Grades dashboard surfaces three summary widgets — **At-Risk Classes**, **Progress vs. Pace**, and **Pending Impact** — at the top of the page, followed by a grade trend graph and a per-class breakdown.

## At-Risk Classes

**At-Risk Classes** shows how many classes have an overall grade below a threshold you set. The label reads _All classes passing!_ when no classes are at risk. A class is included only after it has at least one graded assignment.

Tap the widget to scroll to and expand the first at-risk class in the list below.

### Adjusting the At-Risk Threshold

  1. Open [**Settings → Preferences**](https://app.heliumedu.com/settings?tab=1)
  2. Set the **At-risk threshold (%)** value (default 70%)
  3. Tap **Save**

## Progress vs. Pace

**Progress vs. Pace** compares how much of your work has been completed to how much of the term has elapsed. Two bars show:

  * **Work** — the percentage of assignments completed in the current Class Group
  * **Time** — the percentage of the Class Group's date range that has elapsed

A status badge of _Ahead_, _On Track_, or _Behind_ compares the two. The gap must exceed the tolerance threshold in either direction before the status switches from _On Track_.

### Adjusting the On-Track Tolerance

  1. Open [**Settings → Preferences**](https://app.heliumedu.com/settings?tab=1)
  2. Set the **On-track tolerance (%)** value (default 10%)
  3. Tap **Save**

## Pending Impact

**Pending Impact** shows the total number of ungraded assignments in the current Class Group. The class with the most ungraded work appears as a colored badge below the count. When more than one class has ungraded work, tap the badge to cycle through the others.

## Grade Trend Graph

The grade trend graph plots your grades over the class of the term. Tap the **Graph settings** icon (gear) in the upper-right corner of the graph to open the settings panel.

### Switch between term view and individual class view

Select **Entire Term** to see all classes plotted together, or choose a specific class from the list to focus the graph on that class's grade trend alone.

### Auto-adjust to graded range

Check **Auto-adjust to graded range** to zoom the graph's X-axis to the actual date range of your graded assignments, rather than spanning the full class group date range. This can make grade trends easier to read when grading is clustered within a shorter period.

## Per-Class Breakdown

Below the trend graph, each class has a breakdown table with one row per category, including:

  * **Contribution** — shown only for classes using weighted grading (see below)
  * **Graded** — how many assignments in the category have been graded
  * **Average** — the category's current grade

### How Contribution Is Calculated

**Contribution** shows each category's current share of the class's overall grade — not the weight configured for the category. It is calculated as `weight` x `current average` for each category, then normalized so all visible contributions sum to 100%. The mix shifts as more assignments are graded.

A category may show a smaller contribution than its configured weight if its current average is lower than the others, or larger if higher.

## Related Articles

  * [How Helium Calculates Your Grades](/support/grades-and-progress/how-helium-calculates-your-grades)
  * [Setting Up Weighted Grading & Assignment Categories](/support/grades-and-progress/setting-up-weighted-grading-assignment-categories)
  * [What Grade Do I Need? (Grade Calculator)](/support/grades-and-progress/what-grade-do-i-need-grade-calculator)
  * [Why Your Grade Graph Shows Sudden Drops or Spikes](/support/grades-and-progress/why-your-grade-graph-shows-sudden-drops-or-spikes)
