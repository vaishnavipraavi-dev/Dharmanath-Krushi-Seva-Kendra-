import { Link, useLocation } from "react-router-dom";
import { routeHref } from "@/lib/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sprout,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { dict, useLang, type L } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";
import { categories, catName, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

/* ---------- buttons ---------- */
const btnBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";
export const btn = {
  primary: cn(
    btnBase,
    "bg-primary text-primary-foreground shadow-soft hover:bg-forest hover:-translate-y-0.5",
  ),
  gold: cn(btnBase, "bg-gold text-forest hover:brightness-105 hover:-translate-y-0.5"),
  glass: cn(btnBase, "glass text-forest-foreground hover:bg-forest-foreground/20"),
  outline: cn(
    btnBase,
    "border border-forest/20 text-forest hover:bg-forest hover:text-forest-foreground",
  ),
};
export const Arrow = () => (
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
);

/* ---------- motion ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 1, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  light,
  center,
}: {
  eyebrow?: L;
  title: L;
  sub?: L;
  light?: boolean;
  center?: boolean;
}) {
  const { t } = useLang();
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4 inline-flex items-center gap-2",
            light ? "text-mint" : "text-fresh",
          )}
        >
          <span className="h-px w-8 bg-current" /> {t(eyebrow)}
        </p>
      )}
      <h2 className={cn("text-h2 font-bold", light ? "text-forest-foreground" : "text-forest")}>
        {t(title)}
      </h2>
      {sub && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg",
            light ? "text-forest-foreground/75" : "text-muted-foreground",
          )}
        >
          {t(sub)}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- logo ---------- */
export function Logo({ light }: { light?: boolean }) {
  const { lang } = useLang();
  return (
    <Link to="/" className="inline-flex items-center" aria-label={site.nameEn}>
      <img
        src={logo}
        alt={lang === "mr" ? site.nameMr : site.nameEn}
        width={112}
        height={112}
        className={cn(
          "shrink-0 rounded-full bg-white object-contain",
          light ? "h-28 w-28" : "h-16 w-16 sm:h-20 sm:w-20",
        )}
      />
    </Link>
  );
}

function LangSwitch({ light }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex rounded-full p-0.5 text-xs font-semibold",
        light ? "bg-forest-foreground/15" : "bg-secondary",
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "mr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-3 py-1 transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : light
                ? "text-forest-foreground/80"
                : "text-forest/70",
          )}
        >
          {l === "en" ? "EN" : "मराठी"}
        </button>
      ))}
    </div>
  );
}

const nav = [
  { to: "/", label: dict.home },
  { to: "/about", label: dict.about },
  { to: "/products", label: dict.products, dropdown: true },
  { to: "/crop-solutions", label: dict.crops },
  { to: "/gallery", label: dict.gallery },
  { to: "/contact", label: dict.contact },
] as const;

/* ---------- header ---------- */
export function Header() {
  const { t, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState(false);
  const drawer = useRef<HTMLElement>(null);
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const locationKey = location.pathname + location.search;
  useEffect(() => {
    setOpen(false);
    setAcc(false);
  }, [locationKey]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() =>
      drawer.current?.querySelector<HTMLElement>("button")?.focus(),
    );
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const items = drawer.current?.querySelectorAll<HTMLElement>(
        'a[href], button, select, input, [tabindex="0"]',
      );
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      previous?.focus();
    };
  }, [open]);
  const active = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "hidden bg-forest text-forest-foreground/85 transition-all duration-300 xl:block",
          scrolled ? "h-0 overflow-hidden" : "h-9",
        )}
      >
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-mint" />
              {lang === "mr" ? site.locationMr : site.locationEn}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-mint" />
              {site.phone || t(dict.hoursPending)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-mint" />
              {lang === "mr" ? site.hoursMr : site.hoursEn}
            </span>
          </div>
          <LangSwitch light />
        </div>
      </div>
      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "glass-light shadow-soft" : "bg-card/90 backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between transition-all",
            scrolled ? "h-[88px]" : "h-24",
          )}
        >
          <Logo />
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {nav.map((n) =>
              "dropdown" in n ? (
                <div key={n.to} className="group relative">
                  <Link
                    to={n.to}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-fresh",
                      active(n.to) ? "text-fresh" : "text-forest",
                    )}
                  >
                    {t(n.label)}{" "}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-2xl border bg-card p-2 shadow-lift">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to={routeHref("/products", { cat: c.id })}
                          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-secondary"
                        >
                          <img
                            src={c.image}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                            loading="lazy"
                          />
                          <span className="text-sm font-medium text-forest">{t(c.name)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-fresh",
                    active(n.to) ? "text-fresh" : "text-forest",
                  )}
                >
                  {t(n.label)}
                  {active(n.to) && (
                    <motion.span
                      layoutId="navdot"
                      className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-fresh"
                    />
                  )}
                </Link>
              ),
            )}
          </nav>
          <div className="hidden xl:block">
            <Link to="/contact" className={btn.primary}>
              {t(dict.enquire)} <Arrow />
            </Link>
          </div>
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-forest xl:hidden"
            onClick={() => setOpen(true)}
            aria-label={t("Open menu", "मेनू उघडा")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-forest/50 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              ref={drawer}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a[href]")) setOpen(false);
              }}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-ivory xl:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              aria-label={t("Mobile menu", "मोबाइल मेनू")}
            >
              <div className="flex h-24 shrink-0 items-center justify-between border-b px-5">
                <Logo />
                <button
                  className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-forest"
                  onClick={() => setOpen(false)}
                  aria-label={t("Close menu", "मेनू बंद करा")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-4">
                {nav.map((n) => (
                  <div key={n.to} className="border-b border-border/70">
                    <div className="flex items-center">
                      <Link
                        to={n.to}
                        className={cn(
                          "flex-1 py-4 font-display text-lg font-semibold",
                          active(n.to) ? "text-fresh" : "text-forest",
                        )}
                      >
                        {t(n.label)}
                      </Link>
                      {"dropdown" in n && (
                        <button
                          onClick={() => setAcc(!acc)}
                          className="grid h-10 w-10 place-items-center text-forest"
                          aria-label={t("Toggle categories", "उत्पादन श्रेणी दाखवा")}
                          aria-expanded={acc}
                        >
                          <ChevronDown
                            className={cn("h-5 w-5 transition-transform", acc && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>
                    {"dropdown" in n && acc && (
                      <div className="pb-3 pl-3">
                        {categories.map((c) => (
                          <Link
                            key={c.id}
                            to={routeHref("/products", { cat: c.id })}
                            className="block py-2 text-sm text-muted-foreground"
                          >
                            {t(c.name)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="space-y-4 border-t p-5">
                <LangSwitch />
                <Link to="/contact" className={cn(btn.primary, "w-full")}>
                  {t(dict.enquire)} <Arrow />
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- footer ---------- */
export function Footer() {
  const { t, lang } = useLang();
  const socials = Object.entries(site.socials).filter(([, v]) => v);
  return (
    <footer className="relative overflow-hidden bg-forest-rich text-forest-foreground">
      <Sprout
        className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 text-forest-foreground/5"
        aria-hidden
      />
      <div className="container-x relative py-16 md:py-20">
        <div className="mb-14 flex flex-col justify-between gap-6 border-b border-forest-foreground/15 pb-12 md:flex-row md:items-end">
          <h2 className="max-w-xl text-h2 font-bold">
            {t("Rooted in agriculture. Growing with farmers.", "शेतीशी नाळ. शेतकऱ्यांसोबत प्रगती.")}
          </h2>
          <Link to="/contact" className={btn.gold}>
            {t(dict.enquire)} <Arrow />
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-xs text-sm text-forest-foreground/70">
              {t(
                "A local agricultural supply centre offering seeds, fertilizers, crop protection and essential farm inputs.",
                "बियाणे, खते, पीक संरक्षण व आवश्यक कृषी साहित्य पुरवणारे स्थानिक कृषी सेवा केंद्र.",
              )}
            </p>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socials.map(([k, v]) => (
                  <a
                    key={k}
                    href={v}
                    className="text-sm capitalize text-mint"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {k}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="eyebrow mb-5 text-mint">{t("Quick Links", "महत्त्वाचे दुवे")}</h3>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-forest-foreground/75 transition-colors hover:text-gold"
                  >
                    {t(n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-5 text-mint">{t(dict.products)}</h3>
            <ul className="space-y-3 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    to={routeHref("/products", { cat: c.id })}
                    className="text-forest-foreground/75 transition-colors hover:text-gold"
                  >
                    {t(c.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-5 text-mint">{t(dict.contact)}</h3>
            <ul className="space-y-3 text-sm text-forest-foreground/75">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {lang === "mr"
                  ? `${site.addressMr}, ${site.locationMr}`
                  : `${site.addressEn}, ${site.locationEn}`}
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {site.phone || t(dict.hoursPending)}
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {site.email || t(dict.hoursPending)}
              </li>
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                {lang === "mr" ? site.hoursMr : site.hoursEn}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-forest-foreground/15">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-forest-foreground/60 md:flex-row">
          <p>
            © 2026 {lang === "mr" ? site.nameMr : site.nameEn}.{" "}
            {t("All Rights Reserved.", "सर्व हक्क राखीव.")}
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-gold">
              {t("Privacy Policy", "गोपनीयता धोरण")}
            </Link>
            <Link to="/terms" className="hover:text-gold">
              {t("Terms & Conditions", "नियम व अटी")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- floating ---------- */
export function Floating() {
  const [show, setShow] = useState(false);
  const { t } = useLang();
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const wa = waLink(
    t(
      "Hello, I would like to enquire about agricultural products.",
      "नमस्कार, मला कृषी उत्पादनांबद्दल चौकशी करायची आहे.",
    ),
  );
  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-11 w-11 place-items-center rounded-full border bg-card text-forest shadow-soft transition-transform hover:-translate-y-1"
            aria-label={t("Back to top", "वर जा")}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="grid h-14 w-14 place-items-center rounded-full bg-fresh text-primary-foreground shadow-lift transition-transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      )}
    </div>
  );
}

/* ---------- inner page hero ---------- */
export function PageHero({
  image,
  eyebrow,
  title,
  sub,
  crumb,
}: {
  image: string;
  eyebrow: L;
  title: L;
  sub?: L;
  crumb: L;
}) {
  const { t } = useLang();
  return (
    <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-28 md:min-h-[60vh]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-fade-overlay" />
      <div className="container-x relative pb-14 md:pb-20">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-forest-foreground/70"
        >
          <Link to="/" className="hover:text-mint">
            {t(dict.home)}
          </Link>
          <span>/</span>
          <span className="text-mint">{t(crumb)}</span>
        </nav>
        <Reveal>
          <p className="eyebrow mb-4 text-gold">{t(eyebrow)}</p>
          <h1 className="max-w-3xl text-[clamp(2.2rem,5vw,4.2rem)] font-bold text-forest-foreground">
            {t(title)}
          </h1>
          {sub && <p className="mt-5 max-w-xl text-forest-foreground/80 md:text-lg">{t(sub)}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- product card ---------- */
export function ProductCard({ p }: { p: Product }) {
  const { t } = useLang();
  const wa = waLink(t(`Enquiry: ${p.name.en}`, `चौकशी: ${p.name.mr}`));
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border bg-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
      <Link to={`/products/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={t(p.name)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="glass-light absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold text-forest">
          {t(catName(p.category))}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-medium uppercase tracking-wider text-gold">
          {t(dict.sample)}
        </p>
        <h3 className="mt-1 text-lg font-bold text-forest">{t(p.name)}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{t(p.desc)}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to={`/products/${p.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-forest-foreground"
          >
            {t(dict.viewDetails)}
          </Link>
          {wa ? (
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-fresh px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              <MessageCircle className="h-3.5 w-3.5" /> {t(dict.enquireWa)}
            </a>
          ) : (
            <Link
              to={routeHref("/contact", { product: p.slug })}
              className="inline-flex items-center gap-1.5 rounded-full bg-fresh px-4 py-2 text-xs font-semibold text-primary-foreground"
            >
              {t(dict.enquire)}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export function CTASection() {
  const { t } = useLang();
  const wa = waLink(
    t(
      "Hello, I would like to enquire about agricultural products.",
      "नमस्कार, मला कृषी उत्पादनांबद्दल चौकशी करायची आहे.",
    ),
  );
  return (
    <section className="container-x py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-forest-rich px-6 py-16 text-center text-forest-foreground md:px-16 md:py-24">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-fresh/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
        <Reveal className="relative mx-auto max-w-2xl">
          <Sprout className="mx-auto mb-6 h-10 w-10 text-mint" />
          <h2 className="text-h2 font-bold">
            {t("Let's Grow Something Better Together.", "चला, एकत्र समृद्ध शेती घडवूया.")}
          </h2>
          <p className="mt-4 text-forest-foreground/75 md:text-lg">
            {t(
              "Looking for agricultural supplies? Connect with Dharmanath Krushi Seva Kendra.",
              "कृषी साहित्य हवे आहे? धर्मनाथ कृषी सेवा केंद्राशी संपर्क साधा.",
            )}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className={btn.gold}>
              {t("Send Enquiry", "चौकशी पाठवा")} <Arrow />
            </Link>
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" className={btn.glass}>
                <MessageCircle className="h-4 w-4" /> {t("WhatsApp Us", "व्हॉट्सअॅप करा")}
              </a>
            ) : (
              <span className={cn(btn.glass, "cursor-default opacity-70")}>
                {t("WhatsApp — coming soon", "व्हॉट्सअॅप — लवकरच")}
              </span>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
