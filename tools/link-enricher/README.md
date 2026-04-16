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

## urls.txt syntax

Three line shapes:

```
# 1. comment — ignored
# 2. bare URL — auto-classified by host
https://open.spotify.com/album/abc123

# 3. key override — force a category, built-in or custom
sets: https://open.spotify.com/playlist/my-dj-mix
Merch: https://shop.example.com/tee
```

**Bare URL** → host-based classification (see [mapping](#host--category-mapping)).

**`key: url`** → the key wins over the host. Everything before the first colon is
the category key; the rest must parse as a valid URL. Keys are case-insensitive
for built-ins; for custom categories, the capitalization you use is the display
name that appears on the linktree (`Merch` renders as "Merch").

**Built-in keys:**

| Key (any of) | Section |
|---|---|
| `releases`, `release` | Releases |
| `sets`, `set`, `recordings`, `mixes`, `mix` | Sets & Recordings |
| `shows`, `show`, `tour`, `tours` | Tour / Shows |
| `video`, `videos` | Video |

Anything else becomes a **custom section** with the exact display name you wrote.

## Section order

On the page, sections always render in this order:

1. Built-ins in canonical order: **Releases → Sets & Recordings → Tour / Shows → Video**.
2. Custom sections append after, in the order they **first appear** in `urls.txt`.

So if `urls.txt` contains `Merch: ...` then `Press: ...`, Merch comes before Press
in the rendered page — but both always come after the four built-ins, even if
those built-ins have zero entries.

If you want a different section order, reorder `BUILTIN` in `src/classify.js`
(built-ins) or reorder the first occurrence of each custom key in `urls.txt`
(customs).

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
    ├── classify.js        # host/key → category, custom section support
    ├── fetch-metadata.js  # oEmbed + Open Graph fallback
    ├── download-image.js  # thumbnail → in-memory buffer
    ├── emit-yaml.js       # grouped YAML writer (built-ins, then customs)
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
