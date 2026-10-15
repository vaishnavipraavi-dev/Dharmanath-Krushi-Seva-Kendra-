import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "mr";
export type L = { en: string; mr: string };

export const dict = {
  home: { en: "Home", mr: "मुख्यपृष्ठ" },
  about: { en: "About Us", mr: "आमच्याबद्दल" },
  products: { en: "Products", mr: "उत्पादने" },
  crops: { en: "Crop Solutions", mr: "पीक उपाय" },
  gallery: { en: "Gallery", mr: "गॅलरी" },
  contact: { en: "Contact Us", mr: "संपर्क" },
  enquire: { en: "Enquire Now", mr: "चौकशी करा" },
  explore: { en: "Explore Products", mr: "उत्पादने पहा" },
  contactTeam: { en: "Contact Our Team", mr: "आमच्याशी संपर्क साधा" },
  viewDetails: { en: "View Details", mr: "तपशील पहा" },
  enquireWa: { en: "Enquire on WhatsApp", mr: "व्हॉट्सअॅपवर चौकशी" },
  viewAll: { en: "View All Products", mr: "सर्व उत्पादने पहा" },
  sample: { en: "Sample product", mr: "नमुना उत्पादन" },
  illustrative: { en: "Illustrative image", mr: "प्रतिकात्मक छायाचित्र" },
  hoursPending: { en: "Contact setup pending", mr: "संपर्क तपशील लवकरच" },
} satisfies Record<string, L>;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dksk-lang");
      if (saved === "mr" || saved === "en") setLangState(saved);
    } catch {
      /* Language switching still works when browser storage is unavailable. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("dksk-lang", l);
    } catch {
      /* Use the current session preference. */
    }
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(Ctx);
  const t = (v: L | string, mr?: string) =>
    typeof v === "string" ? (lang === "mr" && mr ? mr : v) : v[lang];
  return { lang, setLang, t };
}
