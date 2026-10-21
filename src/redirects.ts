// The one list of redirects for this site, path to destination.
//
// Astro turns each entry into a fallback page at build time, which is what Docker and local builds serve. On deploy,
// scripts/sync-redirects.sh also copies the list into the site's CloudFront key value store so production redirects
// instantly instead of landing on that page first. Destinations that start with "/" are permanent (301), anything
// pointing at another host is temporary (302). Keys have no trailing slash or file extension, and
// destinations on this site end in one so they land without a further hop.
export const redirects: Record<string, string> = {
  '/contact': '/support/submit/',
  '/status': 'https://status.heliumedu.com',
  '/app': 'https://app.heliumedu.com',
  '/signin': 'https://app.heliumedu.com/signin',
  '/signup': 'https://app.heliumedu.com/signup',
  '/docs': 'https://api.heliumedu.com/docs/',
  '/api': 'https://api.heliumedu.com',
  '/index': '/',
  '/support/resources': '/support/notebook/',
  '/support/resources/using-resources-to-track-study-materials':
    '/support/notebook/using-resources-to-track-study-materials/',
  '/support/grades-and-progress/what-grade-do-i-need-grade-calculator':
    '/support/grades-and-progress/grade-calculator/',
  '/support/account/signing-in-with-google-or-apple':
    '/support/account/signing-in-with-google-apple-or-microsoft/',
  '/support/import-export-and-backup/using-exports-to-backup-data-move-between-accounts':
    '/support/import-export-and-backup/importing-and-exporting-your-data/',
  '/support/import-export-and-backup/printing-and-exporting':
    '/support/import-export-and-backup/printing-and-exporting-to-pdf-or-csv/',
  '/support/reminders-and-notifications/push-or-email-reminders-not-working':
    '/support/reminders-and-notifications/push-notifications-or-email-reminders-not-working/',
  // Legacy aliases
  '/login': 'https://app.heliumedu.com/signin',
  '/register': 'https://app.heliumedu.com/signup',
  '/logout': 'https://app.heliumedu.com/signin',
  '/forgot': 'https://app.heliumedu.com/forgot',
  '/settings': 'https://app.heliumedu.com/settings',
  '/planner': 'https://app.heliumedu.com/',
  '/planner/calendar': 'https://app.heliumedu.com/planner',
  '/planner/classes': 'https://app.heliumedu.com/classes',
  '/planner/grades': 'https://app.heliumedu.com/grades',
  '/planner/materials': 'https://app.heliumedu.com/resources',
};
