import { Link } from "react-router-dom";
import { Leaf, MapPin, Sprout, Wheat } from "lucide-react";
import { PageHero, CTASection, Reveal, SectionHeading, btn, Arrow } from "@/components/site";
import { useLang } from "@/lib/i18n";
import aerial from "@/assets/aerial.jpg";
import farmer from "@/assets/farmer.jpg";

export default function About() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        image={aerial}
        crumb={{ en: "About Us", mr: "आमच्याबद्दल" }}
        eyebrow={{ en: "Our story", mr: "आमची ओळख" }}
        title={{
          en: "Rooted in Agriculture. Growing With You.",
          mr: "शेतीशी नाळ. तुमच्यासोबत प्रगती.",
        }}
        sub={{
          en: "A local connection between farmers and the inputs their farms need.",
          mr: "शेतकरी आणि शेतीसाठी आवश्यक साहित्य यांना जोडणारे स्थानिक केंद्र.",
        }}
      />
      <section className="container-x grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-5 text-fresh">
            {t("Dharmanath Krushi Seva Kendra", "धर्मनाथ कृषी सेवा केंद्र")}
          </p>
          <h2 className="text-h2 font-bold text-forest">
            {t(
              "Behind Every Field Is a Farmer's Hope.",
              "प्रत्येक शेतात रुजते, शेतकऱ्याचे स्वप्न.",
            )}
          </h2>
          <p className="mt-6 text-muted-foreground">
            {t(
              "Agriculture is part of everyday life in our community. Dharmanath Krushi Seva Kendra brings together essential input categories so farmers can explore their requirements in one local place.",
              "शेती हा आपल्या परिसरातील जीवनाचा अविभाज्य भाग आहे. धर्मनाथ कृषी सेवा केंद्रात शेतकऱ्यांना आवश्यक उत्पादन श्रेणींची माहिती एकाच ठिकाणी मिळते.",
            )}
          </p>
          <p className="mt-4 text-muted-foreground">
            {t(
              "From seeds and fertilizers to crop protection and other supplies, our focus is a straightforward, farmer-friendly experience. Browse the catalogue, share your needs and connect with our team about availability.",
              "बियाणे व खतांपासून पीक संरक्षण आणि इतर साहित्यापर्यंत, आमचे लक्ष शेतकऱ्यांना सोयीस्कर अनुभव देण्यावर आहे. उत्पादन सूची पहा, तुमच्या गरजा सांगा आणि उपलब्धतेबद्दल आमच्याशी संपर्क साधा.",
            )}
          </p>
          <p className="my-7 flex items-center gap-2 text-sm font-semibold text-forest">
            <MapPin className="h-5 w-5 text-fresh" />
            {t("Karjat, Ahilyanagar, Maharashtra", "कर्जत, अहिल्यानगर, महाराष्ट्र")}
          </p>
          <Link to="/products" className={btn.outline}>
            {t("Explore the Catalogue", "उत्पादन सूची पहा")} <Arrow />
          </Link>
        </Reveal>
        <Reveal className="relative">
          <img
            src={farmer}
            alt={t(
              "Farmer checking crops in a green field",
              "हिरव्यागार शेतात पिकांची पाहणी करणारे शेतकरी",
            )}
            loading="lazy"
            className="aspect-[4/5] max-h-[620px] w-full rounded-[2rem] object-cover"
          />
          <p className="absolute bottom-5 left-5 rounded-full bg-forest/70 px-4 py-2 text-xs text-white">
            {t("Illustrative farming photography", "प्रतिकात्मक शेती छायाचित्र")}
          </p>
        </Reveal>
      </section>
      <section className="bg-secondary/60 py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow={{ en: "What guides us", mr: "आमची मूल्ये" }}
            title={{ en: "A Shared Commitment to Agriculture.", mr: "शेतीसाठी एकत्रित बांधिलकी." }}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sprout,
                title: t("Our purpose", "आमचा उद्देश"),
                body: t(
                  "Make agricultural input categories accessible through a convenient local supply centre.",
                  "सोयीस्कर स्थानिक केंद्रातून आवश्यक कृषी उत्पादन श्रेणी शेतकऱ्यांपर्यंत पोहोचवणे.",
                ),
              },
              {
                icon: Leaf,
                title: t("Our approach", "आमची भूमिका"),
                body: t(
                  "Keep product information clear and help farmers make informed enquiries about their needs.",
                  "उत्पादनांची माहिती स्पष्ट ठेवणे आणि शेतकऱ्यांना त्यांच्या गरजांनुसार चौकशी करण्यास मदत करणे.",
                ),
              },
              {
                icon: Wheat,
                title: t("Our commitment", "आमची बांधिलकी"),
                body: t(
                  "Put farmers at the centre of a welcoming, practical and locally relevant experience.",
                  "शेतकऱ्यांना केंद्रस्थानी ठेवून सहज, उपयोगी व स्थानिक गरजांना अनुरूप अनुभव देणे.",
                ),
              },
            ].map((x) => (
              <Reveal key={x.title} className="rounded-3xl border bg-card p-8">
                <x.icon className="mb-6 h-8 w-8 text-fresh" />
                <h3 className="text-xl font-bold text-forest">{x.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground">{x.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
