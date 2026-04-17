# Personal site

Jekyll site served from GitHub Pages. Chooser splash at `/` routes to either
a linktree (`/links`) or the personal site (`/personal`).

## Local dev

```
bundle install            # first time only
bundle exec jekyll serve --livereload
```

Access at <http://localhost:4000/>.

## Managing the linktree

The linktree at `/links` is data-driven from `_data/links.yml`. To add, remove,
or update link entries, use the enricher CLI — do **not** hand-edit the YAML.

**Quick version:**

```
# 1. First time only: install tool deps
npm --prefix tools/link-enricher install

# 2. Edit the URL list
$EDITOR tools/link-enricher/urls.txt

# 3. Regenerate
npm --prefix tools/link-enricher run enrich

# 4. Review and commit
git status
git add _data/links.yml assets/img/links/ tools/link-enricher/urls.txt
git commit -m "update linktree"
git push
```

Bare URLs render on the linktree either inside a category (if their host
matches one) or category-less. `key: url` forces a specific category.

```
https://open.spotify.com/album/abc         # → matches → Releases
https://some-random-site.com/thing         # → no match → rendered uncategorized
sets: https://open.spotify.com/playlist/x  # → forced → Sets & Recordings
```

Categories are defined manually in `tools/link-enricher/src/classify.js`
(commented example included). They are never auto-created from `urls.txt`.

Full docs: [`tools/link-enricher/README.md`](tools/link-enricher/README.md).

## Structure

| Path | What it is |
|---|---|
| `_data/links.yml` | Linktree entries (generated — see above) |
| `_layouts/linktree.html` | Linktree page template |
| `_sass/_linktree.scss` | Linktree styles |
| `assets/img/links/` | Auto-downloaded link thumbnails |
| `tools/link-enricher/` | URL-to-YAML enricher CLI (Node) |
| `_config.yml` | Jekyll build settings |
