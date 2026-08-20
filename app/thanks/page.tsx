import type { Metadata } from "next";
import Link from "next/link";
import { AVG_HOURS, PRICE_USD, SLA_HOURS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Заказ принят",
  description: `Заказ принят. Если маршрут можем разобрать — пришлём ссылку на оплату. PDF — за ${SLA_HOURS} часа.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return (
    <main id="main" className="thanks">
      <div className="frame">
        <div className="thanks__main">
          <p className="eyebrow">Письмо · заказ принят</p>
          <h1 className="display">Заказ принят</h1>
          <p>
            Следующее письмо — ссылка на оплату ${PRICE_USD}, если маршрут нам
            по силам. Если нет — напишем, почему, и платить не нужно. После
            оплаты PDF придёт за {SLA_HOURS} часа, чаще за {AVG_HOURS}.
          </p>
          <p>
            Если письма нет — откройте спам. Первое письмо с нового адреса часто
            падает туда.
          </p>
          <Link className="btn btn--ghost" href="/">
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
