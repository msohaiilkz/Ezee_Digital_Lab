# Ezee Technologies Digital Labs Website

Production-ready Next.js App Router source for `digitallabs.ezeetechnologies.com`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- CMS-ready typed content objects
- API routes for contact, audit, consultation, newsletter, service inquiry, and case study inquiry forms

## Run

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` before connecting email or CRM delivery.

## Form Integration

All form routes validate submissions and return success without credentials. To connect a CRM or email workflow, set:

- `LEAD_WEBHOOK_URL`
- `CRM_API_KEY`
- `INTERNAL_LEAD_EMAIL`

The integration point is centralized in `src/lib/leads.ts`.
