# AI Storyboarding & Publishing Suite MVP

Dark-themed writing suite with terminal-style AI chat, character memory, cover art generation, 3D book preview, and export tools.

## Stack
- Next.js 16 + TypeScript
- Prisma + SQLite
- Three.js via `@react-three/fiber`
- jsPDF + JSZip for export

## Setup
1. Install deps:
   - `npm install`
2. Create env:
   - copy `.env.example` to `.env`
3. Generate Prisma client and DB:
   - `npx prisma generate`
   - `npx prisma db push`
4. Run:
   - `npm run dev`

## Command Terminal
- `/expand <paragraph summary>`: generates a 10 chapter outline and persists it.
- `/character <name>`: hybrid lore lookup (known canon vs new custom character prompt).

## Export
- PDF: `/api/export/pdf`
- Interactive E-Book package: `/api/export/ebook`
