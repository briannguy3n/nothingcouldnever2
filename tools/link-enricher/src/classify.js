// Categories on the linktree page. Empty by default — add your own.
//
// Each entry:
//   - keys:      lowercase aliases accepted in urls.txt as `key: url`
//   - hosts:     URL hosts auto-classified into this section for bare URLs.
//                Leave [] if you only want key-based routing.
//   - category:  display name shown on the page
//   - color_key: slug used in SCSS (add `.linktree-thumb--<key>` in
//                _sass/_linktree.scss if you want a custom color)
//   - order:     render order on the page (0 = first). Keep unique.
//
// Example — copy, uncomment, edit:
//
// const BUILTIN = [
//   {
//     keys: ['releases', 'release'],
//     hosts: ['open.spotify.com', 'music.apple.com', 'bandcamp.com'],
//     category: 'Releases',
//     color_key: 'releases',
//     order: 0,
//   },
// ];
const BUILTIN = [];

function findByKey(key) {
  const lc = key.toLowerCase().trim();
  return BUILTIN.find((b) => b.keys.includes(lc));
}

function findByHost(url) {
  const host = new URL(url).hostname.toLowerCase();
  const hostNoSub = host.replace(/^www\./, '');
  for (const b of BUILTIN) {
    if (b.hosts.length === 0) continue;
    if (b.hosts.includes(host) || b.hosts.includes(hostNoSub)) return b;
    if (b.hosts.some((h) => host === h || host.endsWith('.' + h))) return b;
  }
  return null;
}

export function classify({ url, overrideKey }) {
  if (overrideKey) {
    const match = findByKey(overrideKey);
    if (!match) {
      const known = BUILTIN.flatMap((b) => b.keys).join(', ') || '(none defined)';
      throw new Error(
        `Unknown category key "${overrideKey}". ` +
        `Known keys: ${known}. ` +
        `Define categories in tools/link-enricher/src/classify.js.`
      );
    }
    return {
      category: match.category,
      color_key: match.color_key,
      order: match.order,
    };
  }

  const match = findByHost(url);
  if (!match) {
    return { category: null, color_key: null, order: null };
  }
  return {
    category: match.category,
    color_key: match.color_key,
    order: match.order,
  };
}

export const BUILTIN_ORDER = BUILTIN
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((b) => ({ category: b.category, color_key: b.color_key, order: b.order }));
