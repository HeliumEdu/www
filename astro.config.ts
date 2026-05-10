import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import compress from 'astro-compress';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'static',

  redirects: {
    '/support': 'https://support.heliumedu.com',
    '/contact': 'https://support.heliumedu.com',
    '/status': 'https://status.heliumedu.com',
    '/app': 'https://app.heliumedu.com',
    '/press': '/about',
    '/docs': 'https://support.heliumedu.com',
    '/index': '/',
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
  ],

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
