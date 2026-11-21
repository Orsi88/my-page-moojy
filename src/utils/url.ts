// O site é publicado numa subpasta (base em astro.config.mjs).
// Todo link interno passa por withBase(): withBase('/articles') → '/my-page-moojy/articles'.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string) => (path.startsWith('/') ? `${base}${path}` : path);

/** Caminho da página atual sem a base, para comparar com os links do menu. */
export const stripBase = (pathname: string) =>
  (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/\/$/, '') || '/';
