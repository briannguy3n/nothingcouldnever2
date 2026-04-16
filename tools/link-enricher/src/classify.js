import slugify from 'slugify';

const BUILTIN = [
  {
    keys: ['releases', 'release'],
    hosts: ['open.spotify.com', 'spotify.com', 'music.apple.com', 'itunes.apple.com', 'bandcamp.com'],
    category: 'Releases',
    color_key: 'releases',
    order: 0,
  },
  {
    keys: ['sets', 'set', 'recordings', 'recording', 'mixes', 'mix'],
    hosts: ['soundcloud.com', 'm.soundcloud.com', 'mixcloud.com', 'www.mixcloud.com'],
    category: 'Sets & Recordings',
    color_key: 'sets',
    order: 1,
  },
  {
    keys: ['shows', 'show', 'tour', 'tours'],
    hosts: [],
    category: 'Tour / Shows',
    color_key: 'shows',
    order: 2,
    isFallbackByHost: true,
  },
  {
    keys: ['video', 'videos'],
    hosts: ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'vimeo.com', 'www.vimeo.com'],
    category: 'Video',
    color_key: 'video',
    order: 3,
  },
];

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
  return BUILTIN.find((b) => b.isFallbackByHost);
}

export function classify({ url, overrideKey }) {
  if (overrideKey) {
    const match = findByKey(overrideKey);
    if (match) {
      return {
        category: match.category,
        color_key: match.color_key,
        order: match.order,
        custom: false,
      };
    }
    // Unknown key → custom section. Preserve user's capitalization for display;
    // slug the key for CSS.
    const category = overrideKey.trim();
    return {
      category,
      color_key: slugify(category, { lower: true, strict: true }) || 'custom',
      order: null,
      custom: true,
    };
  }

  const match = findByHost(url);
  return {
    category: match.category,
    color_key: match.color_key,
    order: match.order,
    custom: false,
  };
}

export const BUILTIN_ORDER = BUILTIN
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((b) => ({ category: b.category, color_key: b.color_key, order: b.order }));
