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
    >
      <div className="field">
        <label htmlFor="email">Email address</label>
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

      <div className="field">
        <label htmlFor="passportCountry">Passport country</label>
        <select id="passportCountry" name="passportCountry" required defaultValue="">
          <option value="" disabled>
            Select a country
          </option>
          {PASSPORT_COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

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
        />
      </div>

      <div className="field">
        <label htmlFor="travelDates">Approximate travel dates</label>
        <input
          id="travelDates"
          name="travelDates"
          type="text"
          maxLength={120}
          autoComplete="off"
        />
      </div>

      <fieldset className="field field--radios">
        <legend>Are your flights on one ticket or separate bookings?</legend>
        <label className="radio">
          <input type="radio" name="ticketType" value="one_ticket" required />
          <span>One ticket</span>
        </label>
        <label className="radio">
          <input type="radio" name="ticketType" value="separate_tickets" />
          <span>Separate tickets</span>
        </label>
        <label className="radio">
          <input type="radio" name="ticketType" value="not_sure" />
          <span>Not sure</span>
        </label>
      </fieldset>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="btn btn--solid" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send my route"}
      </button>
    </form>
  );
}
