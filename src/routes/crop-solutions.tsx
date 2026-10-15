import { routeHref } from "@/lib/navigation";
import { Link, useSearchParams } from "react-router-dom";
import { Leaf, ArrowUpRight } from "lucide-react";
import { PageHero, CTASection, btn, Arrow } from "@/components/site";
import { crops, categories } from "@/lib/catalog";
import { useLang, dict } from "@/lib/i18n";
import img from "@/assets/aerial.jpg";

export default function CropSolutions() {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const crop = searchParams.get("crop");
  const selected = crops.find((c) => c.id === crop) || crops[0]!;
  return (
    <>
      <PageHero
        image={img}
        crumb={dict.crops}
        eyebrow={{ en: "Your crop, your starting point", mr: "तुमच्या पिकापासून सुरुवात" }}
        title={{
          en: "Different Crops. A World of Possibilities.",
          mr: "विविध पिके. नव्या शक्यता.",
        }}
        sub={{
          en: "Explore common input categories for the crops you grow.",
          mr: "तुम्ही घेत असलेल्या पिकांसाठी सामान्य कृषी साहित्य श्रेणी पहा.",
        }}
      />
      <section className="container-x py-16 md:py-24">
        <nav
          aria-label={t("Choose a crop", "पीक निवडा")}
          className="grid grid-cols-2 gap-3 md:grid-cols-5"
        >
          {crops.map((c) => (
            <Link
              key={c.id}
              to={routeHref("/crop-solutions", { crop: c.id })}
              aria-current={selected.id === c.id ? "page" : undefined}
              className={`group relative overflow-hidden rounded-2xl border-2 ${selected.id === c.id ? "border-fresh ring-4 ring-mint" : "border-transparent"}`}
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-fade-overlay" />
              <h2 className="absolute bottom-4 left-4 font-semibold text-white">{t(c.name)}</h2>
            </Link>
          ))}
        </nav>
        <div className="mt-12 grid overflow-hidden rounded-[2rem] border bg-card lg:grid-cols-2">
          <img
            src={selected.image}
            alt={t(selected.name)}
            className="h-full min-h-64 max-h-[560px] w-full object-cover"
          />
          <div className="p-7 md:p-12">
            <p className="eyebrow mb-4 text-fresh">{t("Explore by crop", "पिकानुसार पहा")}</p>
            <h2 className="text-h2 font-bold text-forest">{t(selected.name)}</h2>
            <p className="mt-5 text-muted-foreground">{t(selected.overview)}</p>
            <h3 className="mt-7 font-semibold text-forest">
              {t("Explore related input categories", "संबंधित साहित्य श्रेणी पहा")}
            </h3>
            <div className="mt-4 space-y-2">
              {selected.cats.map((id) => {
                const c = categories.find((x) => x.id === id)!;
                return (
                  <Link
                    key={id}
                    to={routeHref("/products", { cat: id })}
                    className="flex items-center justify-between gap-3 rounded-xl bg-secondary/60 px-4 py-3 text-sm font-medium text-forest transition-colors hover:bg-mint"
                  >
                    <span>{t(c.name)}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
            <Link to="/contact" className={`${btn.primary} mt-7`}>
              {t("Discuss Your Requirement", "तुमच्या गरजेबद्दल बोला")} <Arrow />
            </Link>
          </div>
        </div>
        <p className="mt-6 flex gap-3 rounded-2xl bg-secondary p-5 text-sm text-muted-foreground">
          <Leaf className="mt-1 h-5 w-5 shrink-0 text-fresh" />
          <span>
            {t(
              "Illustrative information only. These categories are not crop-specific product recommendations. Confirm specific crop guidance with a qualified agricultural professional and follow applicable product labels.",
              "ही माहिती केवळ उदाहरणासाठी आहे. या श्रेणी विशिष्ट पिकासाठी उत्पादन शिफारशी नाहीत. पिकाविषयी विशिष्ट मार्गदर्शन पात्र कृषी तज्ज्ञांकडून घ्या आणि संबंधित उत्पादनांच्या लेबलवरील सूचना पाळा.",
            )}
          </span>
        </p>
      </section>
      <CTASection />
    </>
  );
}
