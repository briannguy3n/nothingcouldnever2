import yaml from 'js-yaml';
import { BUILTIN_ORDER } from './classify.js';

export function buildYaml(entries) {
  const grouped = new Map();
  const customOrder = [];

  for (const e of entries) {
    if (!grouped.has(e.category)) {
      grouped.set(e.category, {
        category: e.category,
        color_key: e.color_key,
        custom: e.custom,
        links: [],
      });
      if (e.custom) customOrder.push(e.category);
    }
    grouped.get(e.category).links.push({ title: e.title, url: e.url, image: e.image });
  }

  const builtins = BUILTIN_ORDER
    .map((c) => grouped.get(c.category))
    .filter(Boolean);

  const customs = customOrder
    .map((name) => grouped.get(name))
    .filter(Boolean);

  const shaped = [...builtins, ...customs].map((section) => ({
    category: section.category,
    color_key: section.color_key,
    links: section.links,
  }));

  return yaml.dump(shaped, {
    lineWidth: -1,
    quotingType: '"',
    forceQuotes: false,
    noRefs: true,
  });
}
