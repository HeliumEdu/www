import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const support = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/support' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    faq: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
        })
      )
      .optional(),
    howTo: z
      .object({
        name: z.string().optional(),
        totalTime: z.string().optional(),
        steps: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
          })
        ),
      })
      .optional(),
  }),
});

export const collections = { support };
