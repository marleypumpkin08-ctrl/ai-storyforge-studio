# GitHub → Cloudflare bundle

This folder is kept in sync with the main app in the parent directory (`ai story` project root).

## Contents

### 1) Quick Worker (no OpenNext build)

- `worker.js` — minimal Worker shell for dashboard “upload” flows
- `wrangler.toml` — Worker name + entry
- `assets/` — reference images / placeholders

### 2) Full Next.js app (`app-source/`)

Mirrored from the real repo:

- `src/`, `prisma/`, `public/`
- `package.json`, lockfile, `next.config.ts`, `open-next.config.ts`, `wrangler.jsonc`, `tsconfig.json`, ESLint/Vitest configs, `.env.example`, root `README.md`

### 3) CI deploy (optional)

- `.github/workflows/deploy-cloudflare.yml` — runs **`npm run deploy`** (OpenNext + Wrangler) on **Ubuntu** (avoids Windows symlink issues with Prisma/OpenNext)

Add repo secrets: **`CLOUDFLARE_API_TOKEN`**, optionally **`CLOUDFLARE_ACCOUNT_ID`**.

## Cloudflare Dashboard

- **Root directory:** `app-source` (if this repo only contains `github-cloudflare-upload` as root, use `app-source` inside it; if the whole monorepo is the repo, set root to `github-cloudflare-upload/app-source`).
- **Build command:** `npm ci && npx prisma generate && npm run deploy` (or rely on GitHub Actions instead).

## Refreshing this folder

Re-copy from the parent project whenever UI or backend changes; `app-source` should match the main tree.
