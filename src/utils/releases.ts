// Busca a versão mais recente de um projeto no GitHub Releases, na hora do build.
// Se a busca falhar (sem internet, limite da API), a página mostra só o link dos Releases.

export type Download = { label: string; file: string; url: string; size: string };
export type Release = { version: string; url: string; date: Date; downloads: Download[] };

// Rótulo amigável conforme a extensão do arquivo; arquivos fora da lista não aparecem.
const kinds: [RegExp, string][] = [
  [/\.exe$/i, 'Download for Windows'],
  [/\.dmg$/i, 'Download for macOS'],
  [/\.AppImage$/i, 'Download for Linux'],
  [/\.vsix$/i, 'VS Code extension'],
];

const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export async function latestRelease(repo: string): Promise<Release | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'static-site-build' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const downloads: Download[] = [];
    for (const asset of data.assets ?? []) {
      const kind = kinds.find(([re]) => re.test(asset.name));
      if (kind) {
        downloads.push({
          label: kind[1],
          file: asset.name,
          url: asset.browser_download_url,
          size: formatSize(asset.size),
        });
      }
    }
    // mesma ordem da lista `kinds` (Windows antes da extensão, por exemplo)
    downloads.sort(
      (a, b) =>
        kinds.findIndex(([, l]) => l === a.label) - kinds.findIndex(([, l]) => l === b.label),
    );
    return {
      version: data.tag_name,
      url: data.html_url,
      date: new Date(data.published_at),
      downloads,
    };
  } catch {
    return null;
  }
}
