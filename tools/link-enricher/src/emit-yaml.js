import yaml from 'js-yaml';
import { BUILTIN_ORDER } from './classify.js';

const UNCATEGORIZED = '__uncategorized__';

export function buildYaml(entries) {
  const grouped = new Map();

  for (const e of entries) {
    const key = e.category || UNCATEGORIZED;
    if (!grouped.has(key)) {
      grouped.set(key, {
        category: e.category,
        color_key: e.color_key,
        links: [],
      });
    }
    grouped.get(key).links.push({ title: e.title, url: e.url, image: e.image });
  }

  const orderedSections = BUILTIN_ORDER
    .map((c) => grouped.get(c.category))
    .filter(Boolean);

  const uncategorized = grouped.get(UNCATEGORIZED);

  const shaped = [...(uncategorized ? [uncategorized] : []), ...orderedSections].map((section) => {
    const out = { links: section.links };
    if (section.category) out.category = section.category;
    if (section.color_key) out.color_key = section.color_key;
    return out;
  });

  return yaml.dump(shaped, {
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false,
    noRefs: true,
  });
}
