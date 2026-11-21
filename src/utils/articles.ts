import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'artigos'>;

/** Artigos publicados (sem rascunhos), do mais recente ao mais antigo. */
export async function publishedArticles() {
  const all = await getCollection('artigos', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Minutos de leitura, a ~200 palavras por minuto. */
export function readingTime(article: Article) {
  const words = (article.body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const formatDate = (d: Date, style: 'long' | 'medium' = 'long') =>
  new Intl.DateTimeFormat('en-US', { dateStyle: style, timeZone: 'UTC' }).format(d);
