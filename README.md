# TransitCheck

Landing page for TransitCheck — a $12 human route check for travellers whose passports face heavy visa requirements. Send a route and passport; get a dated PDF verdict within 24 hours.

Stack: Next.js (App Router), TypeScript, Tailwind CSS. No database, auth, or CMS.

## Local setup

Requires Node.js 20+.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment variables

Copy `.env.example` to `.env.local` (local) or set the same keys in the host.

### `LEAD_WEBHOOK_URL`

Optional. When a traveller submits the order form, `POST /api/lead` validates the payload and forwards JSON to this URL. Any webhook works — Make, n8n, Discord, Google Apps Script, and so on.

If the variable is unset, the handler logs the lead to the server console and still returns success.

Example payload:

```json
{
  "email": "traveller@example.com",
  "passportCountry": "Kazakhstan",
  "route": "ALA → DXB → BKK",
  "travelDates": "October 2026",
  "ticketType": "one_ticket",
  "submittedAt": "2026-08-19T16:00:00.000Z"
}
```

`ticketType` is one of `one_ticket`, `separate_tickets`, or `not_sure`.

### `NEXT_PUBLIC_SITE_URL`

Optional. Canonical origin used for metadata, Open Graph URLs, and the sitemap. On Vercel this falls back to the project production URL.

## Vercel deployment

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), import the GitHub repo. Framework preset: Next.js.
3. Set `LEAD_WEBHOOK_URL` in Project Settings → Environment Variables (Production, and Preview if you want test leads).
4. Optionally set `NEXT_PUBLIC_SITE_URL` to `https://your-domain.com`.
5. Deploy. Vercel runs `next build` and serves the App Router, including `POST /api/lead`.

After deploy, submit the form once and confirm the webhook received the JSON (or check function logs if the env var is unset).
