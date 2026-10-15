import { useSearchParams } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { PageHero, btn } from "@/components/site";
import { categories, products } from "@/lib/catalog";
import { useLang, dict } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";
import img from "@/assets/farmer.jpg";

const empty = { name: "", mobile: "", village: "", category: "", requirement: "", message: "" };
export default function Contact() {
  const { t, lang } = useLang();
  const [searchParams] = useSearchParams();
  const product = searchParams.get("product");
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"" | "pending" | "opened" | "downloaded">("");
  const selected = products.find((p) => p.slug === product);
  useEffect(() => {
    setForm((f) => ({
      ...f,
      category: selected?.category || "",
      requirement: selected ? selected.name[lang] : "",
    }));
  }, [selected, lang]);
  const update = (key: keyof typeof empty, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
    setStatus("");
  };
  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2)
      next["name"] = t(
        "Enter your full name (at least 2 characters).",
        "पूर्ण नाव लिहा (किमान २ अक्षरे).",
      );
    if (!/^(?:\+?91[\s-]?)?[6-9]\d{9}$/.test(form.mobile.replace(/[\s()-]/g, "")))
      next["mobile"] = t(
        "Enter a valid 10-digit Indian mobile number.",
        "वैध १० अंकी भारतीय मोबाइल क्रमांक लिहा.",
      );
    if (!form.village.trim())
      next["village"] = t("Enter your village or location.", "तुमचे गाव किंवा ठिकाण लिहा.");
    if (!categories.some((c) => c.id === form.category))
      next["category"] = t("Select a product category.", "उत्पादन श्रेणी निवडा.");
    if (form.requirement.trim().length < 3)
      next["requirement"] = t(
        "Describe the product you need.",
        "तुम्हाला हवे असलेले उत्पादन लिहा.",
      );
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(first)?.focus();
    return !first;
  };
  const message = () =>
    [
      t("Agricultural product enquiry", "कृषी उत्पादन चौकशी"),
      `${t("Name", "नाव")}: ${form.name.trim()}`,
      `${t("Mobile", "मोबाइल")}: ${form.mobile}`,
      `${t("Village", "गाव")}: ${form.village.trim()}`,
      `${t("Category", "श्रेणी")}: ${t(categories.find((c) => c.id === form.category)!.name)}`,
      `${t("Requirement", "गरज")}: ${form.requirement.trim()}`,
      `${t("Message", "संदेश")}: ${form.message.trim()}`,
    ].join("\n");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const url = waLink(message());
    if (!url) {
      setStatus("pending");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("opened");
  };
  const download = () => {
    if (!validate()) return;
    const url = URL.createObjectURL(new Blob([message()], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "dharmanath-enquiry.txt";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("downloaded");
  };
  const label = (id: keyof typeof empty, text: string, required = true) => (
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-forest">
      {text}
      {required && (
        <span className="ml-1 text-fresh" aria-hidden>
          *
        </span>
      )}
    </label>
  );
  const error = (id: string) =>
    errors[id] ? (
      <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
        {errors[id]}
      </p>
    ) : null;
  const attrs = (id: keyof typeof empty) => ({
    id,
    name: id,
    value: form[id],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(id, e.target.value),
    "aria-invalid": !!errors[id],
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
    className: "field",
  });
  return (
    <>
      <PageHero
        image={img}
        crumb={dict.contact}
        eyebrow={{ en: "We are here to connect", mr: "चला, संवाद साधूया" }}
        title={{ en: "Let's Connect and Grow Together.", mr: "चला, एकत्र समृद्ध शेती घडवूया." }}
        sub={{
          en: "Tell us what your farm needs. Start with a simple product enquiry.",
          mr: "तुमच्या शेतीच्या गरजा आम्हाला सांगा. उत्पादनांच्या चौकशीपासून सुरुवात करा.",
        }}
      />
      <section className="container-x grid items-start gap-10 py-16 md:py-24 lg:grid-cols-[0.85fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow text-fresh">{t("Stay in touch", "संपर्कात राहूया")}</p>
          <h2 className="mt-4 text-h2 font-bold text-forest">
            {t(
              "A Local Place for Your Farming Needs.",
              "तुमच्या शेतीच्या गरजांसाठी स्थानिक केंद्र.",
            )}
          </h2>
          <p className="mb-8 mt-5 text-muted-foreground">
            {t(
              "Share your crop, the product you are looking for and your village. Our team can confirm the details once contact setup is complete.",
              "तुमचे पीक, हवे असलेले उत्पादन आणि गाव सांगा. संपर्क तपशील उपलब्ध झाल्यावर आमची टीम माहिती निश्चित करू शकेल.",
            )}
          </p>
          <div className="space-y-5">
            {[
              {
                icon: MapPin,
                label: t("Visit us", "आमचा पत्ता"),
                value: lang === "mr" ? site.locationMr : site.locationEn,
                sub: lang === "mr" ? site.addressMr : site.addressEn,
                href: "",
              },
              {
                icon: Phone,
                label: t("Call our team", "आम्हाला फोन करा"),
                value: site.phone || t(dict.hoursPending),
                sub: "",
                href: site.phone ? `tel:${site.phone}` : "",
              },
              {
                icon: Mail,
                label: t("Write to us", "ईमेल करा"),
                value: site.email || t(dict.hoursPending),
                sub: "",
                href: site.email ? `mailto:${site.email}` : "",
              },
              {
                icon: Clock,
                label: t("Business hours", "कामकाजाची वेळ"),
                value: lang === "mr" ? site.hoursMr : site.hoursEn,
                sub: "",
                href: "",
              },
            ].map((x) => (
              <div key={x.label} className="flex gap-4 border-b pb-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-fresh">
                  <x.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-forest">{x.label}</h3>
                  {x.href ? (
                    <a className="mt-1 block text-sm text-fresh" href={x.href}>
                      {x.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{x.value}</p>
                  )}
                  {x.sub && <p className="text-xs text-muted-foreground">{x.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border bg-card p-6 shadow-soft md:p-10">
          <h2 className="text-2xl font-bold text-forest">
            {t("What Can We Help You Find?", "तुम्हाला काय हवे आहे?")}
          </h2>
          <p className="mb-7 mt-3 text-sm text-muted-foreground">
            {t("Fields marked * are required.", "* चिन्ह असलेली माहिती आवश्यक आहे.")}
          </p>
          <form noValidate onSubmit={submit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                {label("name", t("Full name", "पूर्ण नाव"))}
                <input {...attrs("name")} autoComplete="name" maxLength={100} required />
                {error("name")}
              </div>
              <div>
                {label("mobile", t("Mobile number", "मोबाइल क्रमांक"))}
                <input
                  {...attrs("mobile")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={20}
                  required
                />
                {error("mobile")}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                {label("village", t("Village / location", "गाव / ठिकाण"))}
                <input
                  {...attrs("village")}
                  autoComplete="address-level2"
                  maxLength={120}
                  required
                />
                {error("village")}
              </div>
              <div>
                {label("category", t("Product category", "उत्पादन श्रेणी"))}
                <select {...attrs("category")} required>
                  <option value="">{t("Choose a category", "श्रेणी निवडा")}</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {t(c.name)}
                    </option>
                  ))}
                </select>
                {error("category")}
              </div>
            </div>
            <div>
              {label("requirement", t("Product requirement", "उत्पादनाची गरज"))}
              <input
                {...attrs("requirement")}
                placeholder={t("Product, quantity or crop…", "उत्पादन, प्रमाण किंवा पीक…")}
                maxLength={300}
                required
              />
              {error("requirement")}
            </div>
            <div>
              {label("message", t("Additional message", "अतिरिक्त संदेश"), false)}
              <textarea {...attrs("message")} rows={4} maxLength={2000} />
            </div>
            <div className="rounded-xl bg-secondary p-4 text-xs text-muted-foreground">
              {waLink("")
                ? t(
                    "Sending opens WhatsApp with your enquiry. Review the message there before sending. This website does not store enquiries.",
                    "चौकशीसह व्हॉट्सअॅप उघडेल. संदेश पाठवण्यापूर्वी तिथे तपासा. ही वेबसाइट चौकशी साठवत नाही.",
                  )
                : t(
                    "WhatsApp contact setup is pending. Your enquiry is not stored or sent by this website. You can download a copy for your records.",
                    "व्हॉट्सअॅप संपर्क तपशील लवकरच उपलब्ध होतील. ही वेबसाइट तुमची चौकशी साठवत किंवा पाठवत नाही. तुम्ही तुमच्या नोंदीसाठी प्रत डाउनलोड करू शकता.",
                  )}
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="submit" className={btn.primary}>
                <Send className="h-4 w-4" />
                {t("Send Enquiry", "चौकशी पाठवा")}
              </button>
              <button type="button" onClick={download} className={btn.outline}>
                <Download className="h-4 w-4" />
                {t("Save a Copy", "प्रत जतन करा")}
              </button>
            </div>
            <div role="status" aria-live="polite">
              {status && (
                <p
                  className={`rounded-xl p-4 text-sm ${status === "pending" ? "bg-amber-50 text-amber-900" : "bg-secondary text-forest"}`}
                >
                  {status === "pending"
                    ? t(
                        "Your enquiry has not been sent. The business WhatsApp number is not configured yet. Use Save a Copy to keep your enquiry.",
                        "तुमची चौकशी पाठवलेली नाही. व्यवसायाचा व्हॉट्सअॅप क्रमांक अद्याप जोडलेला नाही. चौकशी जतन करण्यासाठी ‘प्रत जतन करा’ वापरा.",
                      )
                    : status === "downloaded"
                      ? t(
                          "Your enquiry copy has been downloaded. It has not been sent to the business.",
                          "तुमच्या चौकशीची प्रत डाउनलोड झाली आहे. ती व्यवसायाला पाठवलेली नाही.",
                        )
                      : t(
                          "WhatsApp was requested in a new tab. Complete sending there; this website cannot confirm delivery.",
                          "नवीन टॅबमध्ये व्हॉट्सअॅप उघडण्याची विनंती केली आहे. तिथून संदेश पाठवा; ही वेबसाइट पोहोचल्याची खात्री देऊ शकत नाही.",
                        )}
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {t(
                "When configured, sending opens WhatsApp with your details. Share only the information needed for your enquiry.",
                "क्रमांक जोडल्यानंतर, संदेश पाठवण्यासाठी तुमच्या माहितीसह व्हॉट्सअॅप उघडेल. चौकशीसाठी आवश्यक तेवढीच माहिती द्या.",
              )}
            </p>
          </form>
        </div>
      </section>
      <section className="container-x pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border bg-secondary p-8 md:p-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(#b8cfc0 1px,transparent 1px),linear-gradient(90deg,#b8cfc0 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative mx-auto max-w-xl rounded-2xl bg-card/95 p-8 text-center">
            <MapPin className="mx-auto mb-4 h-9 w-9 text-fresh" />
            <h2 className="text-2xl font-bold text-forest">
              {t("Find Us in Karjat", "कर्जत येथे भेट द्या")}
            </h2>
            <p className="mb-6 mt-3 text-sm text-muted-foreground">
              {t(
                "Karjat, Ahilyanagar, Maharashtra. The exact store address and map pin will be added after confirmation.",
                "कर्जत, अहिल्यानगर, महाराष्ट्र. दुकानाचा अचूक पत्ता आणि नकाशावरील ठिकाण निश्चितीनंतर जोडले जाईल.",
              )}
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Karjat%2C+Ahilyanagar%2C+Maharashtra"
              target="_blank"
              rel="noreferrer"
              className={btn.outline}
            >
              {t("Explore the Karjat Area", "कर्जत परिसर पहा")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
