import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './url';

export type LibraryItem = CollectionEntry<'biblioteca'>;
export type LibraryAction = { href: string; label: string; external: boolean; download: boolean };

/** Materiais publicados (sem rascunhos), em ordem alfabética. */
export async function libraryItems() {
  const items = await getCollection('biblioteca', ({ data }) => !data.draft);
  return items.sort((a, b) => a.data.title.localeCompare(b.data.title, 'en'));
}

/** O que o clique faz: baixar um arquivo do site, abrir um link externo ou nada (em breve). */
export function actionOf(data: LibraryItem['data']): LibraryAction | null {
  if (data.file) {
    const ext = data.file.split('.').pop()?.toUpperCase() ?? 'file';
    return { href: withBase(data.file), label: `Download ${ext}`, external: false, download: true };
  }
  if (data.url) return { href: data.url, label: 'Open link', external: true, download: false };
  return null;
}
