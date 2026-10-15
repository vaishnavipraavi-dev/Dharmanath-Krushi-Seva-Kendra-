import { routeHref } from "@/lib/navigation";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Leaf,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Wheat,
} from "lucide-react";
import { Arrow, btn, CTASection, ProductCard, Reveal, SectionHeading } from "@/components/site";
import { categories, crops, products } from "@/lib/catalog";
import { dict, useLang } from "@/lib/i18n";
import hero from "@/assets/hero.jpg";
import farmer from "@/assets/farmer.jpg";
import aerial from "@/assets/aerial.jpg";

export default function Home() {
  const { t } = useLang();
  const strengths = [
    {
      icon: Wheat,
      title: t("Essential farming supplies", "आवश्यक कृषी साहित्य"),
      body: t(
        "Seeds, nutrition and farm inputs in one place.",
        "बियाणे, पोषण आणि कृषी साहित्य एकाच ठिकाणी.",
      ),
    },
    {
      icon: ShieldCheck,
      title: t("Quality-focused selection", "गुणवत्तेला प्राधान्य"),
      body: t(
        "Product categories selected around farming needs.",
        "शेतीच्या गरजांवर आधारित उत्पादन श्रेणी.",
      ),
    },
    {
      icon: MessageCircle,
      title: t("Easy product enquiries", "उत्पादनांची सोपी चौकशी"),
      body: t(
        "Tell us your crop, category and requirements.",
        "तुमचे पीक, उत्पादन श्रेणी आणि गरजा सांगा.",
      ),
    },
    {
      icon: Sprout,
      title: t("Farmer-friendly experience", "शेतकऱ्यांसाठी सोयीस्कर सेवा"),
      body: t(
        "Clear information and a straightforward next step.",
        "स्पष्ट माहिती आणि सहज संपर्क.",
      ),
    },
  ];
  return (
    <>
      <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-forest text-forest-foreground md:min-h-[760px]">
        <img
          src={hero}
          alt={t(
            "Lush green farmland in warm morning light",
            "सकाळच्या कोवळ्या उन्हातील हिरवीगार शेती",
          )}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-x relative py-20 md:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.6fr_0.65fr]">
            <Reveal>
              <p className="eyebrow mb-7 flex items-center gap-3 text-mint">
                <span className="h-px w-9 bg-gold" />
                {t("Rooted in trust. Growing together.", "विश्वासाची मुळे. समृद्धीची वाटचाल.")}
              </p>
              <h1 className="max-w-3xl text-display font-semibold leading-[1.08]">
                {t("Growing Better Farms.", "समृद्ध शेतीसाठी,")}
                <br />
                <span className="text-mint">
                  {t("Building Brighter Futures.", "विश्वासाची साथ.")}
                </span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                {t(
                  "Quality seeds, essential nutrition and crop protection. Everything you need for the season ahead, closer to home.",
                  "दर्जेदार बियाणे, खते, पीक संरक्षण उत्पादने आणि शेतीसाठी आवश्यक कृषी साहित्य — तुमच्या जवळच.",
                )}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link to="/products" className={btn.gold}>
                  {t(dict.explore)} <Arrow />
                </Link>
                <Link to="/contact" className={btn.glass}>
                  {t(dict.contactTeam)} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-10 flex items-center gap-2 text-xs tracking-wide text-white/65">
                <MapPin className="h-4 w-4 text-gold" />
                {t("Karjat, Ahilyanagar · Maharashtra", "कर्जत, अहिल्यानगर · महाराष्ट्र")}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="hidden self-end pb-5 lg:block">
              <div className="glass rounded-[1.75rem] p-7">
                <div className="mb-9 flex items-center justify-between">
                  <Sprout className="h-9 w-9 text-mint" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/65">
                    {t("Farmer first", "शेतकरी प्रथम")}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold leading-snug">
                  {t(
                    "From the first seed to a new season.",
                    "पहिल्या बियाण्यापासून नव्या हंगामापर्यंत.",
                  )}
                </h2>
                <div className="mt-6 space-y-3 border-t border-white/20 pt-6">
                  {[
                    t("Seeds & sowing essentials", "बियाणे व पेरणी साहित्य"),
                    t("Plant nutrition", "पीक पोषण"),
                    t("Crop protection", "पीक संरक्षण"),
                  ].map((x) => (
                    <p key={x} className="flex items-center gap-3 text-sm text-white/80">
                      <Check className="h-4 w-4 text-gold" />
                      {x}
                    </p>
                  ))}
                </div>
                <Link
                  to="/products"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-mint"
                >
                  {t("Discover the range", "उत्पादने जाणून घ्या")}{" "}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
          <a
            href="#our-roots"
            className="mt-12 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/70"
          >
            <ArrowDown className="h-4 w-4" />
            {t("Discover Dharmanath", "धर्मनाथ जाणून घ्या")}
          </a>
        </div>
        <span className="absolute bottom-5 right-6 text-[10px] text-white/55">
          {t(dict.illustrative)}
        </span>
      </section>
      <section className="border-b bg-card">
        <div className="container-x grid gap-6 py-8 md:grid-cols-3">
          {[
            {
              icon: PackageCheck,
              title: t("Quality agricultural inputs", "दर्जेदार कृषी साहित्य"),
              desc: t("Essentials for your growing season", "तुमच्या हंगामासाठी आवश्यक उत्पादने"),
            },
            {
              icon: Sprout,
              title: t("Rooted in our community", "आपल्या मातीशी नाते"),
              desc: t("A local centre for farming needs", "शेतीच्या गरजांसाठी स्थानिक केंद्र"),
            },
            {
              icon: MessageCircle,
              title: t("A conversation away", "सहज चौकशी, सोपा संपर्क"),
              desc: t("Share your product requirements", "तुमच्या उत्पादन गरजा आम्हाला सांगा"),
            },
          ].map((x) => (
            <div key={x.title} className="flex items-center gap-4 md:border-r md:last:border-0">
              <x.icon className="h-8 w-8 shrink-0 text-fresh" />
              <div>
                <h2 className="text-sm font-bold text-forest">{x.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{x.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        id="our-roots"
        className="container-x grid scroll-mt-24 items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20"
      >
        <Reveal className="relative pb-7 pr-7">
          <img
            src={farmer}
            alt={t("Farmer inspecting healthy crops", "निरोगी पिकांची पाहणी करणारे शेतकरी")}
            loading="lazy"
            className="aspect-square w-full rounded-[2rem] object-cover"
          />
          <div className="absolute bottom-0 right-0 max-w-[220px] rounded-2xl border bg-card p-6 shadow-soft">
            <Leaf className="mb-3 h-7 w-7 text-fresh" />
            <p className="font-display text-lg font-semibold text-forest">
              {t(
                "Good farming begins with the right inputs.",
                "योग्य साहित्याने समृद्ध शेतीची सुरुवात.",
              )}
            </p>
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading
            eyebrow={{ en: "Our roots, your growth", mr: "आपली माती, आपली प्रगती" }}
            title={{
              en: "Your Farming Journey, Our Commitment.",
              mr: "तुमच्या शेतीच्या प्रवासात, आमची साथ.",
            }}
          />
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {t(
              "At Dharmanath Krushi Seva Kendra, we bring essential agricultural inputs closer to the people who grow our future. Our local supply centre in Karjat connects farmers with seeds, fertilizers, crop protection and everyday farm essentials.",
              "धर्मनाथ कृषी सेवा केंद्रात आम्ही शेतीसाठी आवश्यक साहित्य शेतकऱ्यांपर्यंत पोहोचवण्यासाठी प्रयत्नशील आहोत. कर्जत येथील आमच्या केंद्रात बियाणे, खते, पीक संरक्षण आणि दैनंदिन कृषी साहित्याबद्दल चौकशी करा.",
            )}
          </p>
          <div className="my-7 flex items-center gap-3 border-y py-5 text-sm font-medium text-forest">
            <Wheat className="h-5 w-5 text-fresh" />
            {t(
              "Local understanding. A farmer-focused approach.",
              "स्थानिक गरजांची जाण. शेतकरी केंद्रस्थानी.",
            )}
          </div>
          <Link to="/about" className={btn.outline}>
            {t("Discover Our Story", "आमची ओळख जाणून घ्या")} <Arrow />
          </Link>
        </Reveal>
      </section>
      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={{ en: "Made for your growing season", mr: "तुमच्या शेतीच्या हंगामासाठी" }}
              title={{ en: "Everything Your Farm Needs.", mr: "तुमच्या शेतीसाठी सर्व काही." }}
              sub={{
                en: "From sowing to soil care, explore the essentials.",
                mr: "पेरणीपासून मातीच्या निगेपर्यंत, आवश्यक साहित्य पहा.",
              }}
            />
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-forest"
            >
              {t(dict.viewAll)} <Arrow />
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((c, i) => (
              <Link
                key={c.id}
                to={routeHref("/products", { cat: c.id })}
                className={`group relative isolate overflow-hidden rounded-3xl bg-forest ${i === 0 ? "category-feature" : ""}`}
              >
                <img
                  src={c.image}
                  alt={t(c.name)}
                  loading="lazy"
                  className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-fade-overlay" />
                <div className="flex h-full flex-col justify-end p-6">
                  <span className="mb-auto text-xs font-medium text-white/65">0{i + 1}</span>
                  <div className="mt-12 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="max-w-xs text-xl font-semibold text-white">{t(c.name)}</h3>
                      <p className="mt-3 max-w-xs text-sm text-white/75">{t(c.desc)}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/40 text-white transition-colors group-hover:bg-white group-hover:text-forest">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x py-20 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={{ en: "Explore the essentials", mr: "आवश्यक उत्पादने" }}
            title={{ en: "Small Inputs. Big Possibilities.", mr: "योग्य निवड. नव्या शक्यता." }}
            sub={{
              en: "Sample product types. Confirm availability with our team.",
              mr: "नमुना उत्पादन प्रकार. उपलब्धतेसाठी आमच्याशी संपर्क साधा.",
            }}
          />
          <Link to="/products" className={btn.outline}>
            {t(dict.viewAll)} <Arrow />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((_, i) => [0, 2, 4].includes(i))
            .map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
        </div>
      </section>
      <section className="bg-forest-rich py-20 text-white md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            light
            eyebrow={{ en: "The Dharmanath approach", mr: "धर्मनाथची वाटचाल" }}
            title={{
              en: "Committed to Every Growing Season.",
              mr: "प्रत्येक हंगामात, तुमच्या सोबत.",
            }}
            sub={{
              en: "A familiar local place for the essentials that keep your farm moving forward.",
              mr: "शेतीच्या आवश्यक गरजांसाठी तुमच्या परिसरातील विश्वासाचे केंद्र.",
            }}
          />
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {strengths.map((x) => (
              <Reveal key={x.title} className="border-t border-white/20 pt-6">
                <x.icon className="mb-4 h-6 w-6 text-gold" />
                <h3 className="text-base font-semibold">{x.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{x.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x py-20 md:py-28">
        <SectionHeading
          center
          eyebrow={{ en: "Different crops. Shared care.", mr: "वेगवेगळी पिके. समान काळजी." }}
          title={{ en: "What Are You Growing?", mr: "तुमचे पीक कोणते?" }}
          sub={{
            en: "Explore input categories for your crop, then talk to our team.",
            mr: "तुमच्या पिकासाठी साहित्याच्या श्रेणी पहा आणि आमच्याशी संपर्क साधा.",
          }}
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {crops.map((c) => (
            <Link
              key={c.id}
              to={routeHref("/crop-solutions", { crop: c.id })}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={c.image}
                alt={t(c.name)}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-fade-overlay" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
                <h3 className="font-semibold">{t(c.name)}</h3>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-forest text-white">
        <img
          src={aerial}
          alt={t("Aerial view of green agricultural fields", "हिरव्यागार शेतांचे विहंगम दृश्य")}
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-forest/65" />
        <Reveal className="container-x py-20 text-center">
          <Wheat className="mx-auto mb-5 h-9 w-9 text-gold" />
          <h2 className="mx-auto max-w-3xl text-h2 font-semibold">
            {t(
              "Every Healthy Harvest Begins With the Right Foundation.",
              "निरोगी पिकाचा पाया, योग्य सुरुवातीत.",
            )}
          </h2>
          <Link to="/products" className={`${btn.gold} mt-8`}>
            {t(dict.explore)} <Arrow />
          </Link>
        </Reveal>
      </section>
      <section className="container-x py-20 md:pt-28">
        <SectionHeading
          center
          eyebrow={{ en: "A simpler way to connect", mr: "संपर्काचा सोपा मार्ग" }}
          title={{ en: "Your Next Season Starts Here.", mr: "तुमचा पुढचा हंगाम इथून सुरू होतो." }}
        />
        <div className="mt-12 grid gap-9 md:grid-cols-3">
          {[
            [
              t("Explore products", "उत्पादने पहा"),
              t(
                "Browse the catalogue by category or crop.",
                "उत्पादन श्रेणी किंवा पिकानुसार सूची पहा.",
              ),
            ],
            [
              t("Share your requirement", "तुमची गरज सांगा"),
              t(
                "Tell us what you need and where you farm.",
                "तुम्हाला काय हवे आहे आणि तुमचे गाव सांगा.",
              ),
            ],
            [
              t("Connect with our team", "आमच्या टीमशी संपर्क साधा"),
              t(
                "Confirm product details and local availability.",
                "उत्पादनांचे तपशील व स्थानिक उपलब्धता जाणून घ्या.",
              ),
            ],
          ].map(([title, desc], i) => (
            <Reveal key={title} className="border-t pt-6">
              <span className="font-display text-4xl font-light text-fresh/50">0{i + 1}</span>
              <h3 className="mt-5 text-lg font-bold text-forest">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
