export const SAMPLE_ID = "TC-2026-0412";
export const SAMPLE_CHECKED_AT = "12.04.2026 14:32 ALMT";
export const SAMPLE_FILE = "/primer/TC-2026-0412-ALA-SIN-KUL.html";

export const SAMPLE_ROUTE = {
  codes: "ALA > SIN > KUL",
  display: "ALA→SIN→KUL",
  passport: "KAZ",
  residence: "KAZ",
  tickets: "отдельные билеты",
  layover: "SIN 9ч",
} as const;

export type StampTone = "red" | "amber" | "green" | "blue";

export type FlightStub = {
  kind: "flight";
  from: string;
  to: string;
  date: string;
  flight: string;
};

export type LayoverStub = {
  kind: "layover";
  code: string;
  duration: string;
  note: string;
  stamp: {
    tone: StampTone;
    kicker: string;
    line: string;
  };
};

export type RouteStub = FlightStub | LayoverStub;

export const SAMPLE_STUBS: RouteStub[] = [
  {
    kind: "flight",
    from: "ALA",
    to: "SIN",
    date: "28.04.26",
    flight: "KC 129",
  },
  {
    kind: "layover",
    code: "SIN",
    duration: "9ч",
    note: "отд. билеты",
    stamp: {
      tone: "red",
      kicker: "ВИЗА",
      line: "НУЖНА",
    },
  },
  {
    kind: "flight",
    from: "SIN",
    to: "KUL",
    date: "29.04.26",
    flight: "MH 609",
  },
];

export const SAMPLE_LEGS = [
  {
    code: "ALA→SIN",
    title: "Вылет из Алматы",
    tone: "green" as StampTone,
    verdict: "Посадка по паспорту KAZ",
    body: "Для этого плеча отдельный документ не нужен. Риск на стойке в ALA — не вылет в Малайзию, а допуск в Сингапур на следующем плече.",
  },
  {
    code: "SIN 9ч",
    title: "Стыковка в Чанги",
    tone: "red" as StampTone,
    verdict: "Виза Сингапура — если выходите из транзитной зоны",
    body: "На отдельных билетах багаж забираете и сдаёте снова: это вход в Сингапур. Безвизовый транзит 96 часов (VFTF) для паспорта KAZ действует только при действующей визе или ВНЖ Австралии, Канады, Германии, Японии, Новой Зеландии, Швейцарии, Великобритании или США. Иначе виза ICA до вылета из Алматы. На одном билете без выхода из зоны — транзитная виза не нужна.",
  },
  {
    code: "SIN→KUL",
    title: "Прилёт в Куала-Лумпур",
    tone: "green" as StampTone,
    verdict: "Краткий въезд без визы",
    body: "Конечная страна здесь не ловушка. Паспорт KAZ на короткий визит в Малайзию проходит без предварительной визы — при сроке паспорта и обратном билете. Это не отменяет правило Сингапура на стыковке.",
  },
] as const;

export const SAMPLE_CONDITIONS = [
  {
    label: "Без выхода из терминала",
    value: "Виза не нужна, если билет один и вы не покидаете транзитную зону Чанги.",
  },
  {
    label: "Смена терминала",
    value: "В Чанги indoor-переход обычно airside. Если агент пишет landside — считаем как вход.",
  },
  {
    label: "Смена аэропорта",
    value: "На этом маршруте нет. Если бы это был DXB↔DWC или IST↔SAW — это всегда вход в страну.",
  },
  {
    label: "Отдельные билеты",
    value: "Да. Багаж не сквозной — выход к ленте, паспортный контроль, новая регистрация.",
  },
  {
    label: "Получение багажа",
    value: "Да, на стыковке в SIN. Это и есть причина красного штампа.",
  },
] as const;

export const SAMPLE_SOURCES = [
  {
    id: "S1",
    title: "ICA Singapore — Visa-Free Transit Facility",
    href: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa-free-transit-facility",
    note: "VFTF 96 ч для граждан СНГ только при визе/ВНЖ AU, CA, DE, JP, NZ, CH, UK, US.",
    checked: "12.04.2026 14:18",
  },
  {
    id: "S2",
    title: "ICA Singapore — Visa requirements",
    href: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa-requirements",
    note: "Паспорт Kazakhstan — визовая национальность для въезда, не для airside-транзита.",
    checked: "12.04.2026 14:21",
  },
  {
    id: "S3",
    title: "Immigration Department of Malaysia",
    href: "https://www.imi.gov.my/",
    note: "Конечная точка маршрута. Короткий визит — по текущим правилам без предварительной визы.",
    checked: "12.04.2026 14:26",
  },
  {
    id: "S4",
    title: "IATA Travel Centre",
    href: "https://www.iatatravelcentre.com/",
    note: "Сверка с тем, что видит перевозчик. Не заменяет текст ICA.",
    checked: "12.04.2026 14:29",
  },
] as const;
