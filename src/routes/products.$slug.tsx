import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MessageCircle, Package, Sprout } from "lucide-react";
import { PageHero, ProductCard, btn, Arrow } from "@/components/site";
import { products, catName } from "@/lib/catalog";
import { dict, useLang } from "@/lib/i18n";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name.en ?? "Product"} — Dharmanath Krushi Seva Kendra` },
      { name: "description", content: loaderData?.desc.en ?? "Product details" },
    ],
  }),
  component: Detail,
});
function Detail() {
  const p = Route.useLoaderData();
  const { t } = useLang();
  const wa = waLink(
    t(
      `Hello, I would like to enquire about ${p.name.en}.`,
      `नमस्कार, मला ${p.name.mr} याबद्दल चौकशी करायची आहे.`,
    ),
  );
  const related = products
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);
  return (
    <>
      <PageHero
        image={p.image}
        crumb={p.name}
        eyebrow={catName(p.category)}
        title={p.name}
        sub={p.desc}
      />
      <section className="container-x grid gap-12 py-16 md:py-24 lg:grid-cols-2">
        <div className="relative">
          <img
            src={p.image}
            alt={t(p.name)}
            className="aspect-square w-full rounded-[2rem] object-cover"
          />
          <span className="absolute bottom-5 left-5 rounded-full bg-card/90 px-4 py-2 text-xs text-forest">
            {t(dict.illustrative)}
          </span>
        </div>
        <div className="self-center">
          <span className="eyebrow text-fresh">{t(dict.sample)}</span>
          <h2 className="mt-4 text-h2 font-bold text-forest">{t(p.name)}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{t(p.desc)}</p>
          <div className="my-7 space-y-4 rounded-2xl bg-secondary/60 p-6">
            <p className="flex gap-3 text-sm text-forest">
              <Package className="h-5 w-5 shrink-0 text-fresh" />
              {t(
                "Brand, pack size, price and stock will be confirmed by our team.",
                "ब्रँड, पॅकचा आकार, किंमत व साठा आमची टीम निश्चित करेल.",
              )}
            </p>
            <p className="flex gap-3 text-sm text-forest">
              <Check className="h-5 w-5 shrink-0 text-fresh" />
              {t(
                "This is a sample product type, not a confirmed inventory listing.",
                "हा नमुना उत्पादन प्रकार आहे; निश्चित उपलब्ध साठ्याची नोंद नाही.",
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" search={{ product: p.slug }} className={btn.primary}>
              {t(dict.enquire)} <Arrow />
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noreferrer" className={btn.outline}>
                <MessageCircle className="h-4 w-4" />
                {t(dict.enquireWa)}
              </a>
            )}
          </div>
          <p className="mt-7 flex gap-2 text-xs text-muted-foreground">
            <Sprout className="h-4 w-4 shrink-0" />
            {t(
              "Always follow the product label and consult a qualified agricultural professional for crop-specific use.",
              "नेहमी उत्पादनाच्या लेबलवरील सूचना पाळा आणि पिकानुसार वापरासाठी पात्र कृषी तज्ज्ञांचा सल्ला घ्या.",
            )}
          </p>
          <Link
            to="/products"
            search={{ cat: p.category }}
            className="mt-6 inline-flex text-sm font-semibold text-fresh"
          >
            {t("Browse this category →", "या श्रेणीतील उत्पादने पहा →")}
          </Link>
        </div>
      </section>
      <section className="bg-secondary/40 py-16">
        <div className="container-x">
          <h2 className="mb-8 text-h2 font-bold text-forest">
            {t("Keep Exploring", "आणखी उत्पादने पहा")}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((x) => (
              <ProductCard key={x.slug} p={x} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
