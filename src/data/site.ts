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

// Cada projeto tem uma página própria em /projects/<id>/ (src/pages/projects/[slug].astro).
// Preencha só o que existir; o que estiver vazio simplesmente não aparece.
export type Project = {
  id: string; // vira o endereço: /projects/<id>/
  name: string;
  kind: string | null; // tipo do projeto, mostrado acima do nome (ex.: 'Web app')
  description: string | null; // null = "Details soon."
  preview: string | null; // imagem em /public (ex.: '/projects/toki.png'); null = sem imagem
  repo: string | null; // repositório no GitHub
  // Onde o projeto roda. null = ainda não está no ar (aparece "Coming soon").
  // Não preencher com instâncias privadas (RNF-004 / CA-08).
  appUrl?: string | null;
  // 'dono/repositório' no GitHub: a página mostra os downloads da versão mais recente.
  release?: string;
  // Projetos para instalar no próprio servidor: comandos e link da documentação.
  selfHost?: { commands: string; docs: string };
  // true = sem página própria: o card abre direto o app (appUrl) ou, enquanto ele
  // não estiver no ar, o repositório.
  direct?: boolean;
  // true = card vazio só para preencher o carrossel (sem prévia, página nem link)
  placeholder?: boolean;
  // true = tem página própria em src/pages/projects/<id>.astro (com a cara do projeto)
  customPage?: boolean;
};

// Projetos da home, em duas seções. Para incluir um projeto, acrescente um item na lista certa.
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
      {
        id: 'toki',
        name: 'Toki',
        kind: 'Web app',
        description:
          'Generates and validates test data, files and documents. Everything runs in your browser, so nothing leaves your machine.',
        preview: null,
        repo: 'https://github.com/Orsi88/Toki',
        appUrl: 'https://toki.moojy.com.br',
        direct: true, // o Toki é a própria página dele
      },
      {
        id: 'moki',
        name: 'Moki',
        kind: 'Desktop app · VS Code extension',
        description:
          'A local workspace for AI-assisted work. It turns a folder into a project with context, notes, activities and agents, and works with the AI you already use. No account, no server, no lock-in.',
        preview: null,
        repo: 'https://github.com/Orsi88/Moki',
        release: 'Orsi88/Moki',
        customPage: true,
      },
      {
        id: 'nexo',
        name: 'Nexo',
        kind: 'Self-hosted',
        description:
          'An open source panel to discover, configure, run, monitor and share test automation pipelines on Azure DevOps and GitHub Actions. There is no hosted version: you run your own instance.',
        preview: null,
        repo: 'https://github.com/Orsi88/nexo',
        selfHost: {
          commands:
            'git clone https://github.com/Orsi88/nexo.git\ncd nexo/deploy/compose\ncp .env.example .env    # change every value\ndocker compose up -d --build',
          docs: 'https://github.com/Orsi88/nexo#instalação-self-hosted',
        },
        customPage: true,
      },
    ],
  },
  {
    id: 'random',
    title: 'Random projects',
    empty: 'Nothing here yet. Give it a weekend or two.',
    items: [
      {
        id: 'libelula',
        name: 'Libélula',
        kind: null,
        description: null,
        preview: null,
        repo: null,
      },
      { id: 'convia', name: 'Convia', kind: null, description: null, preview: null, repo: null },
      {
        id: 'in-progress',
        name: 'In progress',
        kind: null,
        description: null,
        preview: null,
        repo: null,
        placeholder: true,
      },
    ],
  },
];

export const allProjects = projectGroups.flatMap((g) => g.items);

// Contribuidores vêm do GitHub automaticamente. Aqui dá para completar ou corrigir
// nome e LinkedIn de alguém, pelo usuário do GitHub (vale para todos os projetos).
export const people: Record<string, { name?: string; linkedin?: string }> = {
  Orsi88: { name: 'Júlia Orsi', linkedin: 'https://www.linkedin.com/in/j%C3%BAlia-orsi/' },
};

// Texto do botão principal da prévia, conforme o tipo de projeto.
export const accessLabel = (p: Project) =>
  p.direct && p.appUrl
    ? `Open ${p.name}`
    : p.release
      ? 'Download'
      : p.selfHost
        ? 'Run your own'
        : 'View project';

// Links públicos do rodapé. `href: null` = pendente (o link não aparece até ser preenchido).
export type PublicLink = { label: string; href: string | null; icon?: 'linkedin' };

export const publicLinks: PublicLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/j%C3%BAlia-orsi/', icon: 'linkedin' },
];
