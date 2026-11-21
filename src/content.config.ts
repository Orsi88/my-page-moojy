import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Arquivos que começam com "_" (como _modelo.md) são ignorados: servem de modelo.

// Artigos: um .md por publicação em src/content/artigos/.
// O nome do arquivo vira o endereço: meu-texto.md → /articles/meu-texto
const artigos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/artigos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false), // true = não aparece no site
  }),
});

// Biblioteca: um .md por material em src/content/biblioteca/.
// O material abre um link externo (`url`) ou um arquivo guardado em public/library/ (`file`).
const biblioteca = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/biblioteca' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    url: z.url().optional(),
    file: z.string().startsWith('/library/').optional(),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { artigos, biblioteca };
