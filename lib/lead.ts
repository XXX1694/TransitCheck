export const COUNTRY_OPTIONS = [
  { value: "Kazakhstan", iso: "KAZ", label: "Казахстан" },
  { value: "Uzbekistan", iso: "UZB", label: "Узбекистан" },
  { value: "Kyrgyzstan", iso: "KGZ", label: "Кыргызстан" },
  { value: "Tajikistan", iso: "TJK", label: "Таджикистан" },
  { value: "Turkmenistan", iso: "TKM", label: "Туркменистан" },
  { value: "Russia", iso: "RUS", label: "Россия" },
  { value: "India", iso: "IND", label: "Индия" },
  { value: "Pakistan", iso: "PAK", label: "Пакистан" },
  { value: "Bangladesh", iso: "BGD", label: "Бангладеш" },
  { value: "Philippines", iso: "PHL", label: "Филиппины" },
  { value: "Indonesia", iso: "IDN", label: "Индонезия" },
  { value: "Other", iso: "XXX", label: "Другая" },
] as const;

export const PASSPORT_COUNTRIES = COUNTRY_OPTIONS.map((item) => item.value);

export const TICKET_TYPES = [
  "one_ticket",
  "separate_tickets",
  "not_sure",
] as const;

export type PassportCountry = (typeof COUNTRY_OPTIONS)[number]["value"];
export type TicketType = (typeof TICKET_TYPES)[number];

export type LeadPayload = {
  email: string;
  passportCountry: PassportCountry;
  residenceCountry: PassportCountry;
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
    return { ok: false, error: "Пришлите поля формы обычным запросом." };
  }

  const email = readString(record.email);
  const passportCountry = readString(record.passportCountry);
  const residenceCountry = readString(record.residenceCountry);
  const route = readString(record.route);
  const travelDates = readString(record.travelDates);
  const ticketType = readString(record.ticketType);

  if (!email) {
    return { ok: false, error: "Укажите почту — на неё придёт PDF." };
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return {
      ok: false,
      error: "В почте нет «@» или домена — проверьте адрес.",
    };
  }
  if (!passportCountry || !isPassportCountry(passportCountry)) {
    return { ok: false, error: "Выберите гражданство из списка." };
  }
  if (!residenceCountry || !isPassportCountry(residenceCountry)) {
    return { ok: false, error: "Выберите страну проживания из списка." };
  }
  if (!route) {
    return {
      ok: false,
      error: "Впишите аэропорты пересадки — разберём каждое плечо.",
    };
  }
  if (route.length > 200) {
    return {
      ok: false,
      error: "Маршрут длиннее 200 знаков — оставьте коды аэропортов и даты.",
    };
  }
  if (!travelDates) {
    return {
      ok: false,
      error: "Укажите дату вылета — от неё считается срок в 4 дня.",
    };
  }
  if (travelDates.length > 120) {
    return { ok: false, error: "Дата вылета длиннее 120 знаков — сократите." };
  }
  if (!ticketType || !isTicketType(ticketType)) {
    return {
      ok: false,
      error: "Отметьте билеты: один, отдельные или «не знаю».",
    };
  }

  return {
    ok: true,
    data: {
      email,
      passportCountry,
      residenceCountry,
      route,
      travelDates,
      ticketType,
    },
  };
}
