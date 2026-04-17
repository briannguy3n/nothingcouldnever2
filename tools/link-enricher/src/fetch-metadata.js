import ogs from 'open-graph-scraper';

const OEMBED = {
  'open.spotify.com':  (u) => `https://open.spotify.com/oembed?url=${encodeURIComponent(u)}`,
  'spotify.com':       (u) => `https://open.spotify.com/oembed?url=${encodeURIComponent(u)}`,
  'soundcloud.com':    (u) => `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(u)}`,
  'm.soundcloud.com':  (u) => `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(u)}`,
  'youtube.com':       (u) => `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(u)}`,
  'www.youtube.com':   (u) => `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(u)}`,
  'm.youtube.com':     (u) => `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(u)}`,
  'youtu.be':          (u) => `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(u)}`,
  'vimeo.com':         (u) => `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(u)}`,
  'www.vimeo.com':     (u) => `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(u)}`,
  'bandcamp.com':      (u) => `https://bandcamp.com/oembed?url=${encodeURIComponent(u)}&format=json`,
};

async function tryOEmbed(url) {
  const host = new URL(url).hostname.toLowerCase();
  const build = OEMBED[host] || OEMBED[host.replace(/^www\./, '')];
  if (!build) return null;

  const res = await fetch(build(url), {
    headers: { 'User-Agent': 'link-enricher/1.0 (nothingcouldnever.com)' },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const title = data.title;
  const image_url = data.thumbnail_url;
  if (!title || !image_url) return null;
  return { title, image_url };
}

async function tryOG(url) {
  const { error, result } = await ogs({
    url,
    fetchOptions: {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; link-enricher/1.0)' },
    },
  });
  if (error) return null;

  const title = result.ogTitle || result.twitterTitle || result.dcTitle;
  const img = (result.ogImage && result.ogImage[0]) || (result.twitterImage && result.twitterImage[0]);
  const image_url = img && img.url;
  if (!title || !image_url) return null;
  return { title, image_url };
}

export async function fetchMetadata(url) {
  const oembed = await tryOEmbed(url).catch(() => null);
  if (oembed) return oembed;

  const og = await tryOG(url).catch(() => null);
  if (og) return og;

  throw new Error(`No artwork found for ${url} (oEmbed + Open Graph both empty)`);
}
