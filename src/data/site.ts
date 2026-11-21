// Conteúdo central do site (RF-012). Textos, links e projetos ficam só aqui.
// PROVISÓRIO = pendente de validação (spec §10). Não preencher com conteúdo inventado.

export const PROVISIONAL = 'Pending';

export const site = {
  name: 'Moojy',
  title: 'Moojy — My Page',
  description: 'Moojy’s personal page: open source projects, articles and a small library.',
  lang: 'en',
  // Apresentação do hero. Ajuste livremente o texto.
  // O site inteiro é em inglês, por escolha da autora.
  intro: {
    eyebrow: 'Personal page, mildly opinionated',
    heading: 'You made it.',
    headingAccent: 'The link worked.', // aparece em itálico, logo depois do título
    text: 'Open source projects, unsolicited opinions and a few resources that might save you an afternoon. All thoroughly tested in production.',
    primary: 'See the projects',
    secondary: 'Read the opinions',
  },
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Articles', href: '/articles/' },
  { label: 'Library', href: '/library/' },
];

export type Project = {
  id: string;
  name: string;
  description: string | null; // null = pendente
  url: string | null; // null = URL pública ainda não aprovada
  preview: string | null; // caminho em /public; null = placeholder identificado
};

// Projetos da home, em duas seções. Para incluir um projeto, acrescente um item na lista certa.
// Nunca apontar o Nexo para a instância privada (RNF-004 / CA-08).
export const projectGroups: {
  id: string;
  title: string;
  empty: string;
  items: Project[];
}[] = [
  {
    id: 'open-source',
    title: 'Open source',
    empty: 'Nothing here yet.',
    items: [
      { id: 'toki', name: 'Toki', description: null, url: null, preview: null },
      { id: 'moki', name: 'Moki', description: null, url: null, preview: null },
      { id: 'nexo', name: 'Nexo', description: null, url: null, preview: null },
    ],
  },
  {
    id: 'random',
    title: 'Random projects',
    empty: 'Nothing here yet. Give it a weekend or two.',
    items: [
      { id: 'libelula', name: 'Libélula', description: null, url: null, preview: null },
      { id: 'convia', name: 'Convia', description: null, url: null, preview: null },
    ],
  },
];

// Links públicos do rodapé. `href: null` = pendente (o link não aparece até ser preenchido).
export type PublicLink = { label: string; href: string | null; icon?: 'linkedin' };

export const publicLinks: PublicLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/j%C3%BAlia-orsi/', icon: 'linkedin' },
];
