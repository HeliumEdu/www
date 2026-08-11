import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import compress from 'astro-compress';
import pagefind from 'astro-pagefind';

import astrowind from './vendor/integration';

import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
  lazyImagesRehypePlugin,
  externalLinksRehypePlugin,
} from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPPORT_URL_PATTERN = /^\/support\/([^/]+)\/([^/]+)\/?$/;

function readSupportArticleDate(category: string, slug: string): string | null {
  const base = path.resolve(__dirname, './src/content/support', category, slug);
  const filePath = ['.md', '.mdx'].map((ext) => `${base}${ext}`).find((candidate) => fs.existsSync(candidate));
  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const fmMatch = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    const updated = fmMatch[1].match(/^updatedDate:\s*(.+)$/m);
    const published = fmMatch[1].match(/^publishedDate:\s*(.+)$/m);
    const dateString = (updated?.[1] ?? published?.[1])?.trim().replace(/^['"]|['"]$/g, '');
    if (dateString) {
      const parsed = new Date(dateString);
      if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
    }
  }

  return fs.statSync(filePath).mtime.toISOString();
}

export default defineConfig({
  output: 'static',

  redirects: {
    '/contact': '/support/submit',
    '/status': 'https://status.heliumedu.com',
    '/app': 'https://app.heliumedu.com',
    '/signin': 'https://app.heliumedu.com/signin',
    '/signup': 'https://app.heliumedu.com/signup',
    '/docs': 'https://api.heliumedu.com/docs',
    '/api': 'https://api.heliumedu.com/docs',
    '/index': '/',
    '/support/resources': '/support/notebook',
    '/support/resources/using-resources-to-track-study-materials':
      '/support/notebook/using-resources-to-track-study-materials',
    '/support/grades-and-progress/what-grade-do-i-need-grade-calculator':
      '/support/grades-and-progress/grade-calculator',
    '/support/account/signing-in-with-google-or-apple':
      '/support/account/signing-in-with-google-apple-or-microsoft',
    '/support/import-export-and-backup/using-exports-to-backup-data-move-between-accounts':
      '/support/import-export-and-backup/importing-and-exporting-your-data',
    '/support/import-export-and-backup/printing-and-exporting':
      '/support/import-export-and-backup/printing-and-exporting-to-pdf-or-csv',
    '/support/reminders-and-notifications/push-or-email-reminders-not-working':
      '/support/reminders-and-notifications/push-notifications-or-email-reminders-not-working',
    // Legacy aliases
    '/login': 'https://app.heliumedu.com/signin',
    '/register': 'https://app.heliumedu.com/signup',
    '/settings': 'https://app.heliumedu.com/settings',
    '/planner': 'https://app.heliumedu.com/',
    '/planner/calendar': 'https://app.heliumedu.com/planner',
    '/planner/classes': 'https://app.heliumedu.com/classes',
    '/planner/grades': 'https://app.heliumedu.com/grades',
    '/planner/materials': 'https://app.heliumedu.com/resources',
  },

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !/\/support\/submit(\/|$)/.test(page),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const match = pathname.match(SUPPORT_URL_PATTERN);
        if (match) {
          const [, category, slug] = match;
          const lastmod = readSupportArticleDate(category, slug);
          if (lastmod) item.lastmod = lastmod;
        }
        return item;
      },
    }),
    {
      name: 'sitemap-xml-alias',
      hooks: {
        'astro:build:done': ({ dir }) => {
          const src = fileURLToPath(new URL('sitemap-index.xml', dir));
          const dest = fileURLToPath(new URL('sitemap.xml', dir));
          if (fs.existsSync(src)) fs.copyFileSync(src, dest);
        },
      },
    },
    icon({
      include: {
        tabler: ['*'],
      },
    }),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({
      config: './src/config.yaml',
    }),
    pagefind(),
  ],

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin, externalLinksRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
