import { routeHref } from "@/lib/navigation";
import { Link, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { PageHero, ProductCard, btn } from "@/components/site";
import { products, categories } from "@/lib/catalog";
import { dict, useLang } from "@/lib/i18n";
import hero from "@/assets/seeds.jpg";

export default function Products() {
  const [searchParams] = useSearchParams();
  const requestedCategory = searchParams.get("cat");
  const cat = categories.some((c) => c.id === requestedCategory) ? requestedCategory : null;
  const { t } = useLang();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const list = products.filter(
    (p) =>
      (!cat || p.category === cat) &&
      `${p.name.en} ${p.name.mr} ${p.desc.en} ${p.desc.mr}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  if (sort !== "default")
    list.sort((a, b) =>
      sort === "az" ? t(a.name).localeCompare(t(b.name)) : t(b.name).localeCompare(t(a.name)),
    );
  return (
    <>
      <PageHero
        image={hero}
        crumb={dict.products}
        eyebrow={{ en: "The agricultural catalogue", mr: "कृषी उत्पादन सूची" }}
        title={{
          en: "Good Things Start With the Right Inputs.",
          mr: "योग्य साहित्याने चांगली सुरुवात.",
        }}
        sub={{
          en: "Explore essential product types for your farm. Ask our team about current stock and details.",
          mr: "तुमच्या शेतीसाठी आवश्यक उत्पादन प्रकार पहा. सध्याचा साठा आणि तपशिलांसाठी आमच्याशी संपर्क साधा.",
        }}
      />
      <section className="container-x py-16 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
            <span className="sr-only">{t("Search products", "उत्पादने शोधा")}</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                "Search seeds, fertilizers and more…",
                "बियाणे, खते आणि इतर उत्पादने शोधा…",
              )}
              className="field pl-12"
            />
          </label>
          <label className="flex items-center gap-3">
            <SlidersHorizontal className="h-5 w-5 text-fresh" />
            <span className="sr-only">{t("Sort products", "उत्पादनांचा क्रम")}</span>
            <select
              className="field md:w-52"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">{t("Featured order", "निवडक क्रम")}</option>
              <option value="az">{t("Name: A to Z", "नाव: चढता क्रम")}</option>
              <option value="za">{t("Name: Z to A", "नाव: उतरता क्रम")}</option>
            </select>
          </label>
        </div>
        <nav
          aria-label={t("Product categories", "उत्पादन श्रेणी")}
          className="mb-8 flex flex-wrap gap-2"
        >
          <Link
            to={routeHref("/products", { cat: undefined })}
            className={cat ? btn.outline : btn.primary}
          >
            {t("All Products", "सर्व उत्पादने")}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={routeHref("/products", { cat: c.id })}
              aria-current={cat === c.id ? "page" : undefined}
              className={cat === c.id ? btn.primary : btn.outline}
            >
              {t(c.name)}
            </Link>
          ))}
        </nav>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
          <p className="text-sm font-medium text-forest">
            {t(`${list.length} products to explore`, `पाहण्यासाठी ${list.length} उत्पादने`)}
          </p>
          <p className="text-xs text-muted-foreground">
            {t(
              "Sample catalogue · Availability to be confirmed",
              "नमुना सूची · उपलब्धता निश्चित करावी",
            )}
          </p>
        </div>
        {list.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border bg-card px-6 py-20 text-center">
            <Search className="mx-auto mb-5 h-9 w-9 text-fresh" />
            <h2 className="text-2xl font-bold text-forest">
              {t("No products found", "उत्पादने सापडली नाहीत")}
            </h2>
            <p className="mb-6 mt-3 text-muted-foreground">
              {t(
                "Try another search or browse all categories.",
                "दुसरा शब्द शोधा किंवा सर्व श्रेणी पहा.",
              )}
            </p>
            <Link
              to={routeHref("/products", { cat: undefined })}
              onClick={() => setQuery("")}
              className={btn.outline}
            >
              <X className="h-4 w-4" />
              {t("Clear filters", "फिल्टर काढा")}
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
