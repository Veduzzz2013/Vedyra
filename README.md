# Vedyra — India's AI Learning Universe

## Project overview
Vedyra is a Next.js 15 App Router AI-powered EdTech SaaS platform for CBSE/NCERT students with Clerk auth, VedAI tools, Complete Book Notes, videos, and a dashboard.

## Database architecture (Neon PostgreSQL)
This project uses **Neon PostgreSQL** with the official **`@neondatabase/serverless`** package for production-grade serverless SQL access on Vercel.

### Install Neon package
```bash
npm install @neondatabase/serverless
```

### Create a Neon database
1. Go to Neon dashboard and create a new project.
2. Create a database and copy the connection string.
3. Put the connection string in `.env.local` as `DATABASE_URL`.

### Environment variables
Use `.env.local` (local) and Vercel env settings (production):
```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GEMINI_API_KEY=
CLOUDINARY_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

### SQL schema
Run the schema from `db.schema.sql` in Neon SQL editor or using migration tooling.

### Reusable DB utility
- `lib/db.ts` validates `DATABASE_URL` once and exports a shared `sql` client.
- Do **not** create a new DB client inside every function.

### Server actions
- `app/actions.ts` includes production-style server actions with try/catch:
  - `getUsers()`
  - `saveChat()`
  - `getBookmarks()`
  - `saveStudyProgress()`

## Where Neon SHOULD be used
Use Neon for:
- User profiles
- AI chat history
- Saved bookmarks
- Study analytics
- Generated document metadata
- Generated image metadata
- Generated PPT metadata
- User progress tracking
- Saved notes metadata
- Dashboard analytics
- URLs of uploaded files

## Where Neon should NOT be used
Do NOT store directly in Neon:
- PDFs binary data
- Video files
- Generated images binary data
- Any large media files

Use **Cloudinary** or **Vercel Blob** for file/media storage, and keep only URL + metadata in Neon.

Correct example:
```json
{
  "title": "Science Notes",
  "pdf_url": "https://..."
}
```

Wrong example:
- Storing entire PDF binary/blob inside a DB row.

## Vercel deployment notes
1. Push repo to GitHub.
2. Import into Vercel.
3. Add all environment variables in Vercel project settings.
4. Deploy.

Neon serverless + Next.js server actions are optimized for Vercel when credentials are configured only as environment variables.

## Safety notes for server actions
- Keep DB access in server-only files (`"use server"` or route handlers).
- Validate and sanitize user inputs before queries.
- Use parameterized queries (template tag SQL in Neon package).
- Log server-side errors; do not expose sensitive internals to client.


## Cloudinary setup (for media files)
Use Cloudinary for storing PDFs/images/video assets and keep only URLs/metadata in Neon.

1. In Cloudinary dashboard, copy your **cloud name**, **API key**, and **API secret**.
2. Add this to `.env.local`:

```env
CLOUDINARY_URL=cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>
```

3. In Vercel, add the same `CLOUDINARY_URL` in Project Settings → Environment Variables.

> Security: never hardcode Cloudinary secrets in source code. Keep them only in environment variables.
