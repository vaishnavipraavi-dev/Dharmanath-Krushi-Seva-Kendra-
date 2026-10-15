import { Link } from "react-router-dom";
import { useLang } from "@/lib/i18n";
import { btn } from "@/components/site";

export function NotFound() {
  const { t } = useLang();
  return (
    <section className="container-x py-24 text-center md:py-32">
      <p className="eyebrow mb-5 text-fresh">404</p>
      <h1 className="text-h2 font-bold text-forest">{t("Page not found", "पान सापडले नाही")}</h1>
      <p className="mx-auto mb-8 mt-5 max-w-md text-muted-foreground">
        {t(
          "This page or product is unavailable. Explore the catalogue or return to our homepage.",
          "हे पान किंवा उत्पादन उपलब्ध नाही. उत्पादन सूची पहा किंवा मुख्यपृष्ठावर परत जा.",
        )}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className={btn.primary}>
          {t("Go home", "मुख्यपृष्ठावर जा")}
        </Link>
        <Link to="/products" className={btn.outline}>
          {t("Explore Products", "उत्पादने पहा")}
        </Link>
      </div>
    </section>
  );
}
