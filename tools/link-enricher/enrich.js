#!/usr/bin/env node
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import './src/proxy.js';
import { classify } from './src/classify.js';
import { fetchMetadata } from './src/fetch-metadata.js';
import { prepareImage } from './src/download-image.js';
import { buildYaml } from './src/emit-yaml.js';
import { parseUrls } from './src/parse-urls.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function findRepoRoot(start) {
  let dir = start;
  while (true) {
    try {
      await access(join(dir, '_config.yml'));
      return dir;
    } catch {
      const parent = dirname(dir);
      if (parent === dir) {
        throw new Error('Could not locate repo root (no _config.yml found walking up)');
      }
      dir = parent;
    }
  }
}

async function main() {
  const repoRoot = await findRepoRoot(__dirname);
  const urlsPath = join(__dirname, 'urls.txt');
  const dataPath = join(repoRoot, '_data', 'links.yml');
  const imgDir   = join(repoRoot, 'assets', 'img', 'links');

  const raw = await readFile(urlsPath, 'utf8');
  const parsed = parseUrls(raw);

  if (parsed.length === 0) {
    console.error('No URLs in urls.txt. Add at least one URL and rerun.');
    process.exit(1);
  }

  console.log(`Processing ${parsed.length} URL${parsed.length === 1 ? '' : 's'}...\n`);

  const entries = [];
  const pendingImages = [];
  for (const { url, overrideKey } of parsed) {
    const label = overrideKey ? `${overrideKey}: ${url}` : url;
    process.stdout.write(`  • ${label}\n`);
    try {
      const { category, color_key, order } = classify({ url, overrideKey });
      const { title, image_url } = await fetchMetadata(url);
      const { filename, buffer } = await prepareImage({ imageUrl: image_url, title, sourceUrl: url });
      pendingImages.push({ filename, buffer });
      entries.push({
        category,
        color_key,
        order,
        title,
        url,
        image: `/assets/img/links/${filename}`,
      });
      console.log(`      → ${category || '(uncategorized)'} — "${title}" → ${filename}`);
    } catch (err) {
      console.error(`\n  ✗ Failed: ${url}\n    ${err.message}\n`);
      console.error('Aborting. No files were written.');
      process.exit(1);
    }
  }

  const yamlText = buildYaml(entries);
  await mkdir(imgDir, { recursive: true });
  for (const { filename, buffer } of pendingImages) {
    await writeFile(join(imgDir, filename), buffer);
  }
  await writeFile(dataPath, yamlText, 'utf8');

  const counts = entries.reduce((acc, e) => {
    const label = e.category || '(uncategorized)';
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});
  console.log('\nDone.');
  for (const [cat, n] of Object.entries(counts)) {
    console.log(`  ${cat}: ${n}`);
  }
  console.log(`\nWrote ${dataPath}`);
  console.log(`Images in ${imgDir}`);
  console.log('Next: git status, then commit.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
