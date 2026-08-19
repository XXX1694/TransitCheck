"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { PASSPORT_COUNTRIES } from "@/lib/lead";

export function OrderForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

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
        setError(result.error ?? "Could not send the route. Try again.");
        setPending(false);
        return;
      }

      router.push("/thanks");
    } catch {
      setError("Could not send the route. Try again.");
      setPending(false);
    }
  }

  return (
    <form
      className="order-form"
      action="/api/lead"
      method="post"
      onSubmit={handleSubmit}
      aria-busy={pending}
    >
      <div className="field">
        <label htmlFor="route">Route</label>
        <input
          id="route"
          name="route"
          type="text"
          placeholder="ALA → DXB → BKK"
          required
          maxLength={200}
          autoComplete="off"
          spellCheck={false}
          aria-describedby="route-hint"
        />
        <p className="field__hint" id="route-hint">
          Cities or airport codes, in order. Include every layover.
        </p>
      </div>

      <div className="field">
        <label htmlFor="passportCountry">Passport country</label>
        <select
          id="passportCountry"
          name="passportCountry"
          required
          defaultValue=""
          aria-describedby="passport-hint"
        >
          <option value="" disabled>
            Select a country
          </option>
          {PASSPORT_COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <p className="field__hint" id="passport-hint">
          If you pick Other, we&apos;ll say whether we can check it before you
          pay.
        </p>
      </div>

      <div className="field">
        <label htmlFor="travelDates">
          Approximate travel dates{" "}
          <span className="field__optional">(optional)</span>
        </label>
        <input
          id="travelDates"
          name="travelDates"
          type="text"
          maxLength={120}
          autoComplete="off"
          placeholder="12–18 October"
          aria-describedby="dates-hint"
        />
        <p className="field__hint" id="dates-hint">
          Month is enough. Rules can depend on when you fly.
        </p>
      </div>

      <fieldset className="field field--radios" aria-describedby="ticket-hint">
        <legend>Tickets</legend>
        <p className="field__hint" id="ticket-hint">
          Separate bookings often mean you clear immigration to re-check bags.
        </p>
        <div className="radios" role="presentation">
          <label className="radio">
            <input type="radio" name="ticketType" value="one_ticket" required />
            <span>
              <strong>One ticket</strong>
              Through-checked bags
            </span>
          </label>
          <label className="radio">
            <input type="radio" name="ticketType" value="separate_tickets" />
            <span>
              <strong>Separate tickets</strong>
              Collect and re-check
            </span>
          </label>
          <label className="radio">
            <input type="radio" name="ticketType" value="not_sure" />
            <span>
              <strong>Not sure</strong>
              We&apos;ll treat it as the safer case
            </span>
          </label>
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={254}
          aria-describedby="email-hint"
        />
        <p className="field__hint" id="email-hint">
          Payment link and the PDF both go here. Check spam if it&apos;s a new
          sender.
        </p>
      </div>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="btn btn--solid" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send my route"}
      </button>
      <p className="form-note">
        No charge yet. We email a payment link if we can check the route. Full
        refund if we can&apos;t send an answer.
      </p>
    </form>
  );
}
