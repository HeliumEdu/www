import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const support = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/support' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
  }),
});

export const collections = { support };
