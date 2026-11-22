// Informações dos repositórios no GitHub, buscadas na hora do build:
// linguagem, licença e contribuidores (com o LinkedIn de quem cadastrou no perfil).
// Se a API falhar, a prévia do projeto aparece sem essas informações.

export type Person = {
  login: string;
  name: string;
  avatar: string;
  link: string; // LinkedIn quando houver; senão o perfil no GitHub
  linkLabel: 'LinkedIn' | 'GitHub';
};
export type RepoInfo = { language: string | null; license: string | null; people: Person[] };
export type PersonOverride = { name?: string; linkedin?: string };

const env =
  (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};
const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'static-site-build',
  // no GitHub Actions há um token, o que evita o limite de requisições anônimas
  ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
};

// cache por processo: evita repetir a mesma requisição em cada página
const cache = new Map<string, Promise<any>>();
const gh = (path: string) => {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(`https://api.github.com/${path}`, { headers })
        .then((res) => (res.ok ? res.json() : null))
        .catch(() => null),
    );
  }
  return cache.get(path)!;
};

export async function repoInfo(
  repoUrl: string,
  overrides: Record<string, PersonOverride> = {},
): Promise<RepoInfo | null> {
  const match = repoUrl.match(/github\.com\/([^/]+\/[^/#?]+)/);
  if (!match) return null;
  const full = match[1];
  const [repo, contributors] = await Promise.all([
    gh(`repos/${full}`),
    gh(`repos/${full}/contributors?per_page=20`),
  ]);
  if (!repo) return null;

  // sem estatística de contribuidores (repositório novo), mostra quem é dono dele
  let list: any[] = Array.isArray(contributors)
    ? contributors.filter((c) => c.type === 'User')
    : [];
  if (!list.length && repo.owner) list = [repo.owner];

  const people = await Promise.all(
    list.map(async (c): Promise<Person> => {
      const [user, social] = await Promise.all([
        gh(`users/${c.login}`),
        gh(`users/${c.login}/social_accounts`),
      ]);
      const override = overrides[c.login] ?? {};
      const linkedin =
        override.linkedin ??
        (Array.isArray(social)
          ? social.find((s: any) => s.provider === 'linkedin')?.url
          : undefined);
      return {
        login: c.login,
        name: override.name ?? (user?.name?.trim() || c.login),
        avatar: `${c.avatar_url}${c.avatar_url.includes('?') ? '&' : '?'}s=96`,
        link: linkedin ?? c.html_url,
        linkLabel: linkedin ? 'LinkedIn' : 'GitHub',
      };
    }),
  );

  const license = repo.license?.spdx_id;
  return {
    language: repo.language ?? null,
    license: license && license !== 'NOASSERTION' ? license : null,
    people,
  };
}
