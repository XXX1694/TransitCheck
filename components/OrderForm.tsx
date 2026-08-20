"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { SlaClock } from "@/components/SlaClock";
import { COUNTRY_OPTIONS } from "@/lib/lead";
import { AVG_HOURS, MIN_ORDER_DAYS, PRICE_USD, SLA_HOURS } from "@/lib/site";

function parseDeparture(value: string): Date | null {
  const trimmed = value.trim();
  const dotted = trimmed.match(/^(\d{1,2})[.](\d{1,2})[.](\d{2}|\d{4})$/);
  if (dotted) {
    const day = Number(dotted[1]);
    const month = Number(dotted[2]) - 1;
    const yearRaw = Number(dotted[3]);
    const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
    const date = new Date(year, month, day);
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return date;
    }
  }
  return null;
}

function daysUntil(date: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function OrderForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [dates, setDates] = useState("");

  const deadlineNote = useMemo(() => {
    const parsed = parseDeparture(dates);
    if (!parsed) {
      return "";
    }
    const left = daysUntil(parsed);
    if (left < 0) {
      return "Дата вылета уже прошла — укажите будущую, иначе разберём как архивный маршрут.";
    }
    if (left < 2) {
      return `До вылета меньше 48 часов. Отчёт успеем, визу после него — нет. Пишем, берём ли заказ, до оплаты.`;
    }
    if (left < MIN_ORDER_DAYS) {
      return `До вылета ${left} дн. Отчёт за ${SLA_HOURS} ч успеем. Если по нему нужна виза — на подачу уже тесно.`;
    }
    return "";
  }, [dates]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
          passportCountry: data.get("passportCountry"),
          residenceCountry: data.get("residenceCountry"),
          route: data.get("route"),
          travelDates: data.get("travelDates"),
          ticketType: data.get("ticketType"),
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        setError(result.error ?? "Запрос не ушёл. Проверьте сеть и отправьте ещё раз.");
        setPending(false);
        return;
      }

      router.push("/thanks");
    } catch {
      setError("Запрос не ушёл. Проверьте сеть и отправьте ещё раз.");
      setPending(false);
    }
  }

  return (
    <div className="desk-form" id="order">
      <div className="desk-form__head">
        <p className="desk-form__title">Разбор маршрута</p>
        <p className="desk-form__meta">
          ALA <SlaClock />
        </p>
      </div>

      <ul className="margin-list">
        <li>
          <span>срок ответа</span>
          <strong>{SLA_HOURS}ч / ср. {AVG_HOURS}ч</strong>
        </li>
        <li>
          <span>заказ</span>
          <strong>мин. {MIN_ORDER_DAYS} дн. до вылета</strong>
        </li>
      </ul>

      <form
        className="order-form"
        action="/api/lead"
        method="post"
        onSubmit={handleSubmit}
        aria-busy={pending}
      >
        <div className="field__row">
          <div className="field">
            <label htmlFor="passportCountry">Паспорт</label>
            <select
              id="passportCountry"
              name="passportCountry"
              required
              defaultValue="Kazakhstan"
            >
              {COUNTRY_OPTIONS.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.iso} · {country.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="residenceCountry">Живу в</label>
            <select
              id="residenceCountry"
              name="residenceCountry"
              required
              defaultValue="Kazakhstan"
            >
              {COUNTRY_OPTIONS.map((country) => (
                <option key={`res-${country.value}`} value={country.value}>
                  {country.iso} · {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="route">Маршрут</label>
          <input
            id="route"
            name="route"
            type="text"
            placeholder="Впишите аэропорты пересадки — разберём каждое плечо"
            required
            maxLength={200}
            autoComplete="off"
            spellCheck={false}
            aria-describedby="route-hint"
          />
        </div>

        <div className="field">
          <label htmlFor="travelDates">Дата вылета</label>
          <input
            id="travelDates"
            name="travelDates"
            type="text"
            required
            maxLength={120}
            autoComplete="off"
            placeholder="28.04.26"
            value={dates}
            onChange={(event) => setDates(event.target.value)}
            aria-describedby="dates-hint"
          />
        </div>

        <fieldset className="field field--radios">
          <legend>Билеты</legend>
          <div className="radios">
            <label className="radio">
              <input type="radio" name="ticketType" value="one_ticket" required />
              <span>один</span>
            </label>
            <label className="radio">
              <input type="radio" name="ticketType" value="separate_tickets" />
              <span>отдельные</span>
            </label>
            <label className="radio">
              <input type="radio" name="ticketType" value="not_sure" />
              <span>не знаю</span>
            </label>
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="email">Почта</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
          />
        </div>

        {deadlineNote ? (
          <p className="form-warn" role="status">
            {deadlineNote}
          </p>
        ) : null}

        {error ? (
          <p className="form-error" role="alert">
            {error}
          </p>
        ) : null}

        <button className="btn btn--solid btn--full" type="submit" disabled={pending}>
          {pending ? "Отправляем заказ…" : `Заказать разбор — $${PRICE_USD}`}
        </button>
        <p className="form-note">
          Ответ за {SLA_HOURS} ч, в среднем за {AVG_HOURS}. Придёт PDF. Экспресса нет —
          если вылет раньше чем через 48 часов, напишите дату: скажем, берём ли заказ.
        </p>
      </form>
    </div>
  );
}
