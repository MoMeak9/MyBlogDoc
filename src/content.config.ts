import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!.vuepress/**'],
    base: './src',
    generateId: ({ entry }) => entry.replace(/\.md$/i, ''),
  }),
  // VuePress metadata remains valid; older notes need no frontmatter at all.
  schema: z.looseObject({}),
});

export const collections = { docs };
