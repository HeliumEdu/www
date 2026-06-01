export interface SupportCategory {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export const SUPPORT_CATEGORIES: SupportCategory[] = [
  { slug: 'getting-started', title: 'Getting Started', description: 'Installing Helium and first-time setup.', icon: 'tabler:rocket' },
  { slug: 'calendar-and-schedule', title: 'Planner', description: 'Calendar and Todos views, adding events, and color customization.', icon: 'tabler:calendar-month' },
  { slug: 'classes', title: 'Classes', description: 'Setting up and managing classes, terms, and sessions.', icon: 'tabler:school' },
  { slug: 'grades-and-progress', title: 'Grades & Progress', description: 'Grade calculations, weighted categories, and the Grade Calculator.', icon: 'tabler:chart-bar' },
  { slug: 'notebook', title: 'Notebook & Resources', description: 'Notes (linked or standalone) and study materials organized by class.', icon: 'tabler:notebook' },
  { slug: 'reminders-and-notifications', title: 'Reminders & Notifications', description: 'Setting up push and email reminders.', icon: 'tabler:bell' },
  { slug: 'sync-and-integration', title: 'Sync & Integration', description: 'External Calendars, Feeds, and the Helium API.', icon: 'tabler:refresh' },
  { slug: 'import-export-and-backup', title: 'Import, Export & Backup', description: 'Backups, exports, printing, and managing the example schedule.', icon: 'tabler:arrows-left-right' },
  { slug: 'account', title: 'Account', description: 'Signing in, password reset, theme settings, and account deletion.', icon: 'tabler:user-circle' },
];

export const CATEGORY_BY_SLUG: Record<string, SupportCategory> = Object.fromEntries(
  SUPPORT_CATEGORIES.map((c) => [c.slug, c])
);
