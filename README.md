# TransitCheck

Лендинг платного разбора транзитных требований. Человек присылает маршрут и гражданство, за 24 часа получает датированный PDF по каждому плечу. $12 разово.

Стек: Next.js (App Router), TypeScript, Tailwind CSS. Базы, аккаунта и CMS нет.

## Local setup

Нужен Node.js 20+.

```bash
cp .env.example .env.local
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment variables

Скопируйте `.env.example` в `.env.local` или задайте те же ключи на хосте.

### `LEAD_WEBHOOK_URL`

Необязательно. Когда человек отправляет форму, `POST /api/lead` проверяет поля и пересылает JSON на этот URL (Make, n8n, Discord, Google Apps Script).

Если переменная не задана, заказ пишется в лог сервера, ответ всё равно успешный.

Пример:

```json
{
  "email": "traveller@example.com",
  "passportCountry": "Kazakhstan",
  "residenceCountry": "Kazakhstan",
  "route": "ALA → SIN → KUL",
  "travelDates": "28.04.26",
  "ticketType": "separate_tickets",
  "submittedAt": "2026-08-19T16:00:00.000Z"
}
```

`ticketType` — `one_ticket`, `separate_tickets` или `not_sure`.

### `NEXT_PUBLIC_SITE_URL`

Необязательно. Канонический адрес для метаданных, Open Graph и sitemap. На Vercel запасной вариант — production URL проекта.

## Vercel

1. Залейте репозиторий на GitHub.
2. В [Vercel](https://vercel.com) импортируйте репозиторий. Preset: Next.js.
3. Задайте `LEAD_WEBHOOK_URL` в Project Settings → Environment Variables.
4. По желанию задайте `NEXT_PUBLIC_SITE_URL`.
5. Деплой. Vercel собирает App Router, включая `POST /api/lead`.

После деплоя отправьте форму один раз и проверьте, что webhook получил JSON (или смотрите логи функции, если переменная не задана).
