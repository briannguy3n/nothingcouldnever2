# link-enricher

Turns a list of URLs into populated linktree entries for the Jekyll site.
You paste URLs into `urls.txt`, run one command, and get real titles, real
artwork, and ready-to-serve YAML written straight into the site.

## Prerequisites

- Node 20 or newer (`node --version`). If you don't have it: `brew install node`.
- You run commands from the repo root, not from this folder.

First time only:

```
npm --prefix tools/link-enricher install
```

## How to add, update, or remove links

1. **Edit `tools/link-enricher/urls.txt`** — one URL per line. See
   [URL syntax](#urlstxt-syntax) below for bare URLs vs category overrides.
   - Blank lines and lines starting with `#` are ignored.
   - `urls.txt` is the **source of truth**. To remove a link, delete its line.
   - Card order within a section = line order in `urls.txt`. Section order is
     fixed (see [Section order](#section-order)).

2. **Run the enricher:**

   ```
   npm --prefix tools/link-enricher run enrich
   ```

   The script walks each URL, fetches metadata, downloads the thumbnail, and
   writes `_data/links.yml` plus files under `assets/img/links/`.

3. **Review and commit:**

   ```
   git status
   git diff _data/links.yml
   git add _data/links.yml assets/img/links/ tools/link-enricher/urls.txt
   git commit -m "update linktree"
   git push
   ```

   GitHub Pages rebuilds automatically after push.

4. **Preview locally (optional):**

   ```
   bundle exec jekyll serve --livereload
   open http://localhost:4000/links
   ```

## Defining categories

**Categories are not created automatically.** The `BUILTIN` array in
`src/classify.js` starts empty — add every category you want on the page there.

Each entry needs:

- `keys` — lowercase aliases you can use in `urls.txt` as `key: url`
- `hosts` — URL hosts auto-classified into this section for bare URLs (`[]` if
  you only want key-based routing)
- `category` — display name on the page
- `color_key` — slug for SCSS (add `.linktree-thumb--<key>` in
  `_sass/_linktree.scss` if you want a custom thumbnail color)
- `order` — render order on the page, 0 first

There's a commented `Releases` example at the top of the file — copy, uncomment,
edit.

## urls.txt syntax

```
# Bare URL — dropped into a category if its host matches, otherwise rendered
# on the linktree without a category heading.
https://open.spotify.com/album/abc123

# Key override — force a specific category. Unknown keys → error.
sets: https://open.spotify.com/playlist/my-dj-mix
```

## Section order

Uncategorized links (bare URLs whose host doesn't match any BUILTIN entry)
render first with no section heading. Categorized sections then render in the
order of each category's `order` field in `src/classify.js`.

## What the script does, end to end

For each URL in `urls.txt`:

1. **Classify** the host → one of four categories (see table below).
2. **Fetch metadata** — tries the provider's oEmbed endpoint first (Spotify,
   SoundCloud, YouTube, Vimeo, Bandcamp). Falls back to Open Graph scraping
   for Apple Music, Mixcloud, and any other URL.
3. **Download the thumbnail** into an in-memory buffer.
4. If any URL fails to yield both a title and an image → **abort before
   writing anything**. `_data/links.yml` and `assets/img/links/` are never
   partially updated.

When all URLs succeed, the script writes images to `assets/img/links/` and
rebuilds `_data/links.yml` from scratch.

## Host → category mapping

Used only when a URL has **no** `key:` prefix:

| URL host | Category |
|---|---|
| `open.spotify.com`, `music.apple.com`, `itunes.apple.com`, `bandcamp.com` | Releases |
| `soundcloud.com`, `mixcloud.com` | Sets & Recordings |
| `youtube.com`, `youtu.be`, `vimeo.com` | Video |
| anything else | Tour / Shows |

To force a different section for a specific URL, use the `key: url` syntax
above — no code changes needed.

## Troubleshooting

**`No artwork found for <url>`**
The provider has no oEmbed endpoint and the page has no `og:image`. Try:
- A different canonical URL (e.g., Apple Music album page instead of a
  song deep-link, Bandcamp track page instead of embed URL).
- If it's a generic page you control, add an `og:image` meta tag.
- Remove the URL from `urls.txt` if nothing helps.

**`Image fetch failed (4xx/5xx)`**
The metadata step succeeded but the image URL is dead. Retry — this usually
clears on its own. If persistent, the provider rotated the thumbnail URL.

**`fetch failed` / network errors**
Transient. Retry. If you're behind a corporate HTTP proxy, set `HTTPS_PROXY`
in your shell — the script picks it up automatically via `src/proxy.js`.

**The page still shows old art after I re-ran the enricher**
GitHub Pages and browser caches. Hard refresh (Cmd+Shift+R). If the image
filename changed, old files may linger in `assets/img/links/` — those are
harmless, or you can `git clean` untracked junk in that folder.

## Files in this tool

```
tools/link-enricher/
├── enrich.js              # CLI entry point
├── urls.txt               # your input — versioned
├── package.json
├── README.md              # you are here
└── src/
    ├── parse-urls.js      # urls.txt → {url, overrideKey}
    ├── classify.js        # host/key → built-in category
    ├── fetch-metadata.js  # oEmbed + Open Graph fallback
    ├── download-image.js  # thumbnail → in-memory buffer
    ├── emit-yaml.js       # grouped YAML writer (built-in order)
    └── proxy.js           # honor HTTPS_PROXY env var
```

## What this tool does NOT do

- It does not delete old images from `assets/img/links/` when a link is
  removed from `urls.txt`. They become unreferenced but stay committed.
  Run `git clean -n assets/img/links/` to see orphans, `git clean -f` to
  remove them (careful — destructive).
- It does not preserve manual edits to `_data/links.yml`. The file is
  overwritten on every successful run. `urls.txt` is the source of truth.
- It does not run on GitHub Pages. It runs on your machine; you commit the
  outputs.
