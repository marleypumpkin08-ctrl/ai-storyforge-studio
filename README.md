# GitHub -> Cloudflare Upload Folder

This folder is ready to push to GitHub and connect to Cloudflare Workers.

## Files
- `worker.js` - worker entrypoint
- `wrangler.toml` - worker config

## Quick steps
1. Upload this folder contents to a GitHub repo.
2. In Cloudflare dashboard, create/import a Worker from GitHub.
3. Set root directory to this folder if your repo includes other files.
4. Deploy.

## Verify
- Open your worker URL.
- Check health endpoint: `/api/health`
