import type { Metadata } from "next";
import Link from "next/link";
import { ReportPages } from "@/components/ReportPages";
import { SAMPLE_ID, SAMPLE_ROUTE } from "@/lib/sample";

export const metadata: Metadata = {
  title: `Пример отчёта ${SAMPLE_ID}`,
  description: `Полный пример разбора ${SAMPLE_ROUTE.display} для паспорта KAZ — страницы PDF в потоке и файл для скачивания.`,
};

export default function PrimerPage() {
  return (
    <main id="main" className="primer-page">
      <div className="frame">
        <div className="section__main">
          <p className="eyebrow">Файл · {SAMPLE_ID}</p>
          <h1 className="display">Пример отчёта</h1>
          <p>
            Это тот же документ, что встроен на главной: две страницы, читаются
            без клика. Кнопка ниже сохраняет полный файл.
          </p>
          <ReportPages />
          <p>
            <Link className="btn btn--ghost" href="/#order">
              Заказать
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
