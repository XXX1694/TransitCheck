export const PASSPORT_COUNTRIES = [
  "Kazakhstan",
  "Uzbekistan",
  "Kyrgyzstan",
  "India",
  "Pakistan",
  "Bangladesh",
  "Philippines",
  "Indonesia",
  "Other",
] as const;

export const TICKET_TYPES = [
  "one_ticket",
  "separate_tickets",
  "not_sure",
] as const;

export type PassportCountry = (typeof PASSPORT_COUNTRIES)[number];
export type TicketType = (typeof TICKET_TYPES)[number];

export type LeadPayload = {
  email: string;
  passportCountry: PassportCountry;
  route: string;
  travelDates: string;
  ticketType: TicketType;
};

export type LeadParseResult =
  | { ok: true; data: LeadPayload }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isPassportCountry(value: string): value is PassportCountry {
  return (PASSPORT_COUNTRIES as readonly string[]).includes(value);
}

function isTicketType(value: string): value is TicketType {
  return (TICKET_TYPES as readonly string[]).includes(value);
}

export function parseLead(body: unknown): LeadParseResult {
  const record = asRecord(body);
  if (!record) {
    return { ok: false, error: "Send a JSON object." };
  }

  const email = readString(record.email);
  const passportCountry = readString(record.passportCountry);
  const route = readString(record.route);
  const travelDates = readString(record.travelDates);
  const ticketType = readString(record.ticketType);

  if (!email) {
    return { ok: false, error: "Email address is required." };
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (!passportCountry || !isPassportCountry(passportCountry)) {
    return { ok: false, error: "Select a passport country." };
  }
  if (!route) {
    return { ok: false, error: "Route is required." };
  }
  if (route.length > 200) {
    return { ok: false, error: "Route is too long." };
  }
  if (travelDates.length > 120) {
    return { ok: false, error: "Travel dates are too long." };
  }
  if (!ticketType || !isTicketType(ticketType)) {
    return {
      ok: false,
      error: "Say whether the flights are on one ticket or separate bookings.",
    };
  }

  return {
    ok: true,
    data: {
      email,
      passportCountry,
      route,
      travelDates,
      ticketType,
    },
  };
}
