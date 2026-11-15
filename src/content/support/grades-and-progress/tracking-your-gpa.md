---
title: Tracking Your GPA
description: "How Helium calculates your GPA for each term and across all terms, and how to turn it on with a grade scale and credits."
category: grades-and-progress
publishedDate: 2026-11-12
updatedDate: 2026-11-14
---

Helium calculates a GPA for each Class Group once you choose a grade scale for it and a class with credits has a grade. It shows in the **Overall Grade** widget on the [**Grades**](https://app.heliumedu.com/grades) page. If your school doesn't use GPA, leave the grade scale on **None** and Helium won't show one.

## Choosing a Grade Scale

A grade scale turns a class grade into a grade point, like 90% and up earning a 4.0. A new group uses the scale of your most recent group, or **None** for your first.

  1. Open [**Classes**](https://app.heliumedu.com/classes)
  2. Open the group menu at the top and click the edit (pencil) icon next to the group
  3. Choose a **Grade scale**, then click the table icon next to it to check its bands against your school's
  4. Click **Save**

A scale set through the [Helium API](/support/sync-and-integration/using-the-helium-api/) or an import that doesn't match a preset shows as **Custom**.

## A Class With Its Own Grade Scale

If a syllabus grades differently from the rest of your term, like whole letters in a group graded with +/-, give that class its own scale.

  1. Open [**Classes**](https://app.heliumedu.com/classes) and click the class
  2. On the **Details** tab, choose a **Grade scale**
  3. Click **Save**

The list only offers scales whose grades your group's scale also uses, so your GPA stays on one scale. It's unavailable when the group has no scale or nothing else fits. For example, a school that grades in whole letters never records an A-, so a class in that group can't use a scale with +/-. **Same as group** uses the group's scale. If you change the group's scale, a class scale that no longer fits goes back to **Same as group**.

When a class has a grade scale, its card on the **Classes** page shows it.

## Adding Credits

Credits decide how much each class counts toward your GPA. A class with no credits isn't counted.

  1. Open [**Classes**](https://app.heliumedu.com/classes) and click the class
  2. On the **Details** tab, set **Credits**
  3. Click **Save**

## How GPA Is Calculated

  * Each class earns the grade point of the band its grade falls in, shown next to the class on the **Grades** page when it has credits (e.g., "3.50 GP")
  * Your GPA is each class's grade point times its credits, added up, over the total credits

## GPA Across All Terms

When you have more than one Class Group, the **Overall Grade** widget also shows **All**, your GPA across every group on the same grade scale as your most recent group that has one, weighted by credits. The example schedule isn't included.

## Related Articles

  * [How Helium Calculates Your Grades](/support/grades-and-progress/how-helium-calculates-your-grades/)
  * [Understanding the Grades Dashboard](/support/grades-and-progress/understanding-the-grades-dashboard/)
  * [Grade Calculator](/support/grades-and-progress/grade-calculator/)
  * [Setting Up and Managing Classes](/support/classes/setting-up-and-managing-classes/)
