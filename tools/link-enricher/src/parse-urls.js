function isValidUrl(candidate) {
  try {
    const u = new URL(candidate);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function parseLine(raw) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) return null;

  // Bare URL
  if (isValidUrl(line)) {
    return { url: line, overrideKey: null };
  }

  // key: url  — split on the first colon, require remainder to be a valid URL
  const colonIdx = line.indexOf(':');
  if (colonIdx > 0) {
    const key = line.slice(0, colonIdx).trim();
    const rest = line.slice(colonIdx + 1).trim();
    if (key && isValidUrl(rest)) {
      return { url: rest, overrideKey: key };
    }
  }

  throw new Error(`Unparseable line in urls.txt: "${raw}"`);
}

export function parseUrls(rawFile) {
  const results = [];
  const lines = rawFile.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const parsed = parseLine(lines[i]);
    if (parsed) results.push(parsed);
  }
  return results;
}
