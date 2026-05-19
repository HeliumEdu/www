export interface SupportCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  { slug: 'getting-started', title: 'Getting Started', description: 'New to Helium? Start here.', icon: 'tabler:rocket' },
  { slug: 'calendar-and-schedule', title: 'Calendar & Schedule', description: 'Planner views, scheduling, and managing your time.', icon: 'tabler:calendar-month' },
  { slug: 'classes', title: 'Classes', description: 'Setting up and managing classes, terms, and sessions.', icon: 'tabler:school' },
  { slug: 'grades-and-progress', title: 'Grades & Progress', description: 'Grade tracking, calculators, and at-a-glance progress.', icon: 'tabler:chart-bar' },
  { slug: 'notebook', title: 'Notebook & Resources', description: 'Capture notes and track study materials linked to your classes.', icon: 'tabler:notebook' },
  { slug: 'reminders-and-notifications', title: 'Reminders & Notifications', description: 'Stay ahead with timely push and email reminders.', icon: 'tabler:bell' },
  { slug: 'sync-and-integration', title: 'Sync & Integration', description: 'External calendars, feeds, and integrations.', icon: 'tabler:refresh' },
  { slug: 'import-export-and-backup', title: 'Import, Export & Backup', description: 'Move data in and out of Helium safely.', icon: 'tabler:arrows-left-right' },
  { slug: 'account', title: 'Account', description: 'Sign-in, settings, and account management.', icon: 'tabler:user-circle' },
];

export const CATEGORY_BY_SLUG: Record<string, SupportCategory> = Object.fromEntries(
  SUPPORT_CATEGORIES.map((c) => [c.slug, c])
);
