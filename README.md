# GitHub -> Cloudflare Upload Folder

This folder now contains two paths:

## 1) Quick Worker upload
- `worker.js`
- `wrangler.toml`
- `assets/`

Use this when you want no-build dashboard upload.

## 2) Real app source (from your actual folders)
- `app-source/`

This is copied from your real project structure (`src`, `prisma`, config files), not a made-up layout.

## Deploy the real app-source on Cloudflare
1. Push this folder to GitHub.
2. In Cloudflare, connect the repo.
3. Set **Root Directory** to: `github-cloudflare-upload/app-source`
4. Build command: `npm run deploy`
5. Deploy.
