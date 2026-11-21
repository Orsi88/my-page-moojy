// @ts-check
import { defineConfig } from 'astro/config';

// Endereço principal: https://moojy.com.br (raiz do domínio).
// O deploy do GitHub Pages publica uma cópia em https://orsi88.github.io/my-page-moojy/
// definindo SITE_URL e BASE_PATH no workflow (.github/workflows/deploy.yml).
// Links internos usam withBase() de src/utils/url.ts, então funcionam nos dois lugares.

/** @type {Record<string, string | undefined>} */
const env = /** @type {any} */ (globalThis).process?.env ?? {};

// https://astro.build/config
export default defineConfig({
  site: env.SITE_URL ?? 'https://moojy.com.br',
  base: env.BASE_PATH ?? '/',
  devToolbar: { enabled: false },
});
