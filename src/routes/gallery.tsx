import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { PageHero, CTASection, btn } from "@/components/site";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { gallery, galleryCats, type GalleryCat } from "@/lib/catalog";
import { dict, useLang } from "@/lib/i18n";
import img from "@/assets/aerial.jpg";

const captionsMr = [
  "सूर्योदयाच्या वेळी हिरवीगार शेती",
  "पिकांच्या पानांची पाहणी करणारे शेतकरी",
  "विविध पिकांचे बियाणे",
  "कृषी साहित्य दुकानाचे आतील दृश्य",
  "डाळिंबाची बाग",
  "हातातील दाणेदार खत",
  "कापसाच्या शेतात फवारणी करणारे शेतकरी",
  "शेतांचे विहंगम दृश्य",
  "टोमॅटो व वांग्याची रोपे",
  "शेंगांसह कडधान्य पिके",
  "गहू व ज्वारीचे शेत",
  "उसाच्या रांगा",
];
export default function Gallery() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<GalleryCat | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const list = gallery.filter((g) => filter === "all" || g.cat === filter);
  const active = index === null ? undefined : list[index];
  const caption = (g: (typeof gallery)[number]) =>
    lang === "mr" ? captionsMr[gallery.indexOf(g)] : g.alt;
  const move = (delta: number) =>
    setIndex((i) => (i === null ? null : (i + delta + list.length) % list.length));
  return (
    <>
      <PageHero
        image={img}
        crumb={dict.gallery}
        eyebrow={{ en: "Life in the fields", mr: "शेतीची एक झलक" }}
        title={{
          en: "The Beauty Behind Every Growing Season.",
          mr: "प्रत्येक हंगामातील निसर्गाचे सौंदर्य.",
        }}
        sub={{
          en: "A visual celebration of the land, the people and the work that brings it to life.",
          mr: "माती, माणसे आणि शेतीला समृद्ध करणाऱ्या कष्टांचा चित्रमय प्रवास.",
        }}
      />
      <section className="container-x py-16 md:py-24">
        <div className="mb-9 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={filter === "all" ? btn.primary : btn.outline}
          >
            {t("All Images", "सर्व छायाचित्रे")}
          </button>
          {galleryCats.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              aria-pressed={filter === c.id}
              className={filter === c.id ? btn.primary : btn.outline}
            >
              {t(c.name)}
            </button>
          ))}
        </div>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t(
            "Illustrative photography. Actual store, products and activity images will be added after confirmation.",
            "ही छायाचित्रे प्रतिकात्मक आहेत. प्रत्यक्ष दुकान, उत्पादने आणि उपक्रमांचे फोटो निश्चितीनंतर जोडले जातील.",
          )}
        </p>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {list.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setIndex(i)}
              aria-label={t(`Enlarge: ${g.alt}`, `मोठे पहा: ${caption(g)}`)}
              className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-secondary text-left"
            >
              <img
                src={g.src}
                alt={caption(g)}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
              />
              <div className="absolute inset-0 bg-fade-overlay opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-sm font-medium text-white">
                {caption(g)}
                <Expand className="h-5 w-5 shrink-0" />
              </span>
            </button>
          ))}
        </div>
      </section>
      <Dialog
        open={index !== null}
        onOpenChange={(open) => {
          if (!open) setIndex(null);
        }}
      >
        <DialogContent
          className="w-[calc(100%-2rem)] max-w-5xl rounded-2xl border-white/20 bg-forest p-4 text-white md:p-6"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              move(1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              move(-1);
            }
          }}
        >
          <DialogTitle className="pr-8 leading-relaxed">
            {active ? caption(active) : t(dict.gallery)}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {t(
              "Illustrative image · Use arrow keys to browse, Escape to close.",
              "प्रतिकात्मक छायाचित्र · पाहण्यासाठी बाणांची बटणे, बंद करण्यासाठी Escape वापरा.",
            )}
          </DialogDescription>
          {active && (
            <img
              src={active.src}
              alt={caption(active)}
              className="max-h-[65vh] w-full rounded-lg object-contain"
            />
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={() => move(-1)}
              aria-label={t("Previous image", "मागील छायाचित्र")}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm text-white/70">
              {index === null ? 0 : index + 1} / {list.length}
            </span>
            <button
              onClick={() => move(1)}
              aria-label={t("Next image", "पुढील छायाचित्र")}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30"
            >
              <ChevronRight />
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <CTASection />
    </>
  );
}
