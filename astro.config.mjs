// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // endereço público (GitHub Pages): usado em links canônicos e no sitemap
  site: 'https://orsi88.github.io',
  // o site fica numa subpasta: https://orsi88.github.io/my-page-moojy/
  // links internos usam withBase() de src/utils/url.ts
  base: '/my-page-moojy',
  devToolbar: { enabled: false },
});
