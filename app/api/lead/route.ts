import { parseLead } from "@/lib/lead";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  let body: unknown;
  try {
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = {
        email: form.get("email"),
        passportCountry: form.get("passportCountry"),
        residenceCountry: form.get("residenceCountry"),
        route: form.get("route"),
        travelDates: form.get("travelDates"),
        ticketType: form.get("ticketType"),
      };
    }
  } catch {
    return jsonError("Запрос не прочитался. Отправьте форму ещё раз.", 400);
  }

  const parsed = parseLead(body);
  if (!parsed.ok) {
    return jsonError(parsed.error, 400);
  }

  const payload = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("TransitCheck lead (LEAD_WEBHOOK_URL unset):", payload);
  } else {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });

      if (!webhookResponse.ok) {
        console.error(
          "Lead webhook failed:",
          webhookResponse.status,
          await webhookResponse.text().catch(() => ""),
        );
        return jsonError("Заказ не дошёл. Отправьте ещё раз через минуту.", 502);
      }
    } catch (error) {
      console.error("Lead webhook error:", error);
      return jsonError("Заказ не дошёл. Отправьте ещё раз через минуту.", 502);
    }
  }

  const wantsJson =
    contentType.includes("application/json") ||
    (request.headers.get("accept") ?? "").includes("application/json");

  if (wantsJson) {
    return Response.json({ ok: true });
  }

  return Response.redirect(new URL("/thanks", request.url), 303);
}

function jsonError(error: string, status: number) {
  return Response.json({ ok: false, error }, { status });
}
