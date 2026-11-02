# Bookish Aspirant

A personal book recommendation and reading journal for **The Silent Reader**. The site is a static Next.js app styled as a vintage literary journal: book covers are the main visual, with paper sheets, bookmarks, page numbers and a few gentle animations.

## Features

- Homepage in order: hero with an opening-book animation, Currently Reading, Recommendations, Categories, Book of the Month, If You Loved This, Reader's Journal, Reading Corner, Reader's Shelf, Wishlist, Instagram, Contact, footer
- Book detail pages and category pages, all generated at build time
- Reading mood selector, favourite quotes, reading-year summary (updated by hand)
- Wishlist saved in the visitor's browser (localStorage), no account needed
- Reduced-motion support, responsive layouts, sitemap and robots.txt
- Hidden content manager at `/admin` (login required), see below
- No database or live external feeds

## Local setup

Requirements: Node.js 18.17 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Useful scripts:

- `npm run build` builds the production site (42 static pages)
- `npm run start` serves the production build locally
- `npm run typecheck` runs the TypeScript checks

## Updating content

All site content lives in one encrypted file, `content/site-content.enc.json`. The pages are built from its decrypted contents.

To change content:

1. Open `/admin` on the site and sign in with the admin username and password from `lib/admin-config.ts`.
2. Edit the sections (site details, books, categories, shelf, journal, quotes, reading year and moods).
3. Click "Download encrypted content". Fix any problems the page reports first.
4. Replace `content/site-content.enc.json` with the downloaded file, commit, and deploy.

The AES key and IV used for encryption are in `lib/admin-config.ts`. Keep them in sync with the file you encrypt with. The login and key are visible in the site's code, so the admin page is a light barrier, not real security. Some text (page numbers, the Instagram preview tiles, navigation labels) is still in the code and must be edited there.

## Deployment (Netlify)

The repository includes `netlify.toml` for the Next.js runtime.

1. Push the project to a Git repository and import it in Netlify.
2. Build command: `npx next build`. Publish directory: `.next` (both are already set in `netlify.toml`).
3. Under Site settings, Environment variables, add:
   - `NEXT_PUBLIC_SITE_URL`: your live address, for example `https://www.yourdomain.com` (used for the sitemap and social previews)
4. Deploy. Check `/sitemap.xml` and `/robots.txt` on the live site.

Any static host that supports Next.js works too. Set the same environment variables there.

## Project layout

- `app/`: routes (home, about, book and category pages), layout, sitemap, robots, icon
- `components/book/`: reusable book pieces (covers, bookmarks, paper sheets, buy links, wishlist button)
- `components/home/`, `components/about/`, `components/layout/`: page sections, header and footer
- `hooks/`: wishlist storage and scroll reveal
- `lib/`: content loading (`lib/content/`), admin settings (`lib/admin-config.ts`) and site settings
- `content/`: the encrypted site content file
- `components/admin/`: the content manager login, editor and section forms

## Affiliate disclosure

The site contains Amazon and Flipkart search links. Review the affiliate disclosure text in the content manager's Site section and make sure it matches the programmes you join.
