# Moojy — My Page

Site pessoal da Moojy em [Astro](https://astro.build) + TypeScript, estático e quase sem JavaScript.

## Rodar

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # tipos e diagnósticos do Astro
npm run build    # gera dist/
npm run format   # Prettier
```

## Onde mexer

| O quê                                       | Arquivo                                    |
| ------------------------------------------- | ------------------------------------------ |
| Textos, navegação, projetos e links         | `src/data/site.ts`                         |
| Cores dos temas claro/escuro e tipografia   | `src/styles/tokens.css`                    |
| Artigos (um `.md` por publicação)           | `src/content/artigos/` (veja `_modelo.md`) |
| Materiais da biblioteca (um `.md` por item) | `src/content/biblioteca/`                  |
| Previews dos projetos                       | `public/` + campo `preview` em `site.ts`   |

**Projetos:** `url: null` mostra "Link público pendente". Use só URLs públicas aprovadas e **nunca** a instância privada do Nexo.

**Artigo de exemplo** (`src/content/artigos/meu-artigo.md`):

```md
---
title: Título
description: Resumo curto
date: 2026-11-21
---

Texto do artigo.
```

## Publicar um artigo

1. Copie `src/content/artigos/_modelo.md` e renomeie, sem o `_` (ex.: `meu-texto.md` → `/artigos/meu-texto`).
2. Preencha `title`, `description` e `date`, e escreva o texto em Markdown.
3. Para publicar, mude `draft: true` para `draft: false` (ou apague a linha).
4. Confira em `npm run dev` → http://localhost:4321/articles.
5. Publique: `npm run build` e envie o conteúdo de `dist/` para a hospedagem de moojy.com.br. O push na branch `main` também atualiza a cópia em https://orsi88.github.io/my-page-moojy/.

Imagens dos artigos ficam na mesma pasta do texto (`src/content/artigos/`) e são usadas como `./nome.png`.

## Adicionar um material na biblioteca

1. Copie `src/content/biblioteca/_modelo.md` e renomeie, sem o `_`.
2. Preencha `title`, `description` e `category` (materiais da mesma categoria ficam juntos).
3. Escolha um: `file: /library/arquivo.pdf` (arquivo em `public/library/`) ou `url: https://...` (link externo). Sem nenhum dos dois, aparece como "Coming soon".
4. `draft: false` para aparecer; depois, commit e push como nos artigos.

## Estrutura

`src/components/`: `SiteHeader`, `ThemeToggle`, `Hero`, `ProjectsGrid`, `ProjectCard`, `ArticlesTeaser`, `LibraryTeaser`, `SiteFooter`.

## Estado

Fase 1 da especificação (estrutura e conteúdo). Os itens marcados como **Provisório** (texto de apresentação, paleta, tipografia, previews e URLs) aguardam validação.

O hero usa só fundo off-white. O cenário de lírios da spec (RF-003, RF-005, RF-006) foi descartado por decisão da autora.
