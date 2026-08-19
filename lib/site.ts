export const PRICE_USD = 12;
export const PRICE_KZT = 6000;
export const SLA_HOURS = 24;
export const AVG_HOURS = 6;
export const MIN_ORDER_DAYS = 4;
export const DATA_RETENTION_DAYS = 90;

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) {
    return `https://${vercel.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export function formatKzt(value: number): string {
  const digits = new Intl.NumberFormat("ru-RU").format(value).replace(/\u00a0/g, " ");
  return `${digits} ₸`;
}
