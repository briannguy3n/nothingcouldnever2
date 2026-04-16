import { createHash } from 'node:crypto';
import slugify from 'slugify';

const EXT_BY_MIME = {
  'image/jpeg': '.jpg',
  'image/jpg':  '.jpg',
  'image/png':  '.png',
  'image/webp': '.webp',
  'image/gif':  '.gif',
  'image/avif': '.avif',
};

function shortHash(input) {
  return createHash('sha1').update(input).digest('hex').slice(0, 6);
}

export async function prepareImage({ imageUrl, title, sourceUrl }) {
  const res = await fetch(imageUrl, {
    headers: { 'User-Agent': 'link-enricher/1.0 (nothingcouldnever.com)' },
  });
  if (!res.ok) {
    throw new Error(`Image fetch failed (${res.status}) for ${imageUrl}`);
  }

  const ct = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  const ext = EXT_BY_MIME[ct] || '.jpg';

  const slug = slugify(title, { lower: true, strict: true }).slice(0, 60) || 'link';
  const filename = `${slug}-${shortHash(sourceUrl)}${ext}`;
  const buffer = Buffer.from(await res.arrayBuffer());

  return { filename, buffer };
}
