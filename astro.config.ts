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
  const filePath = path.resolve(__dirname, './src/content/support', category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

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
    '/signin': 'https://app.heliumedu.com/login',
    '/signup': 'https://app.heliumedu.com/signup',
    '/press': '/about',
    '/docs': 'https://api.heliumedu.com/docs',
    '/api': 'https://api.heliumedu.com/docs',
    '/index': '/',
    '/support/resources': '/support/notebook',
    '/support/resources/using-resources-to-track-study-materials':
      '/support/notebook/using-resources-to-track-study-materials',
    // Helium Classic (legacy frontend) shutdown 2026-08-01 — preserve
    // bookmarked routes by mapping them to their app.heliumedu.com equivalents.
    '/login': 'https://app.heliumedu.com/login',
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
