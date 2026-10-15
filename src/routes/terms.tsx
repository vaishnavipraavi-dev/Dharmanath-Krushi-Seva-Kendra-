import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site";
import { useLang } from "@/lib/i18n";
import img from "@/assets/aerial.jpg";
export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Dharmanath Krushi Seva Kendra" },
      {
        name: "description",
        content: "Information about sample products, enquiries and website use.",
      },
    ],
  }),
  component: Terms,
});
function Terms() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        image={img}
        crumb={{ en: "Terms", mr: "नियम व अटी" }}
        eyebrow={{ en: "Website information", mr: "वेबसाइट माहिती" }}
        title={{ en: "A Clear Starting Point.", mr: "स्पष्ट माहितीतून सुरुवात." }}
      />
      <article className="container-x py-16">
        <div className="mx-auto max-w-3xl space-y-9">
          {[
            [
              t("Presentation website", "सादरीकरण वेबसाइट"),
              t(
                "This website is a frontend prototype for exploring agricultural product categories and preparing enquiries. It does not provide online checkout, payment, confirmed stock or order placement.",
                "ही वेबसाइट कृषी उत्पादन श्रेणी पाहण्यासाठी आणि चौकशी तयार करण्यासाठी बनवलेला नमुना आहे. येथे ऑनलाइन खरेदी, पैसे भरणे, निश्चित साठा किंवा ऑर्डर देण्याची सुविधा नाही.",
              ),
            ],
            [
              t("Sample products and photographs", "नमुना उत्पादने आणि छायाचित्रे"),
              t(
                "Product listings show illustrative product types. Images are representative and do not confirm specific brands, packaging, stock, store appearance or business activities. Confirm price, pack size and availability directly with the business.",
                "उत्पादन सूचीतील प्रकार उदाहरणासाठी आहेत. छायाचित्रे प्रतिकात्मक आहेत; त्यावरून विशिष्ट ब्रँड, पॅकिंग, साठा, दुकान किंवा उपक्रमांची खात्री होत नाही. किंमत, पॅकचा आकार आणि उपलब्धता व्यवसायाकडून निश्चित करा.",
              ),
            ],
            [
              t("Agricultural information", "कृषी माहिती"),
              t(
                "Crop pages offer general educational context, not personalized agronomic advice or dosage instructions. Consult qualified agricultural professionals and follow approved product labels for your crop and conditions.",
                "पिकांची पाने सामान्य शैक्षणिक माहिती देतात; वैयक्तिक कृषी सल्ला किंवा मात्रेच्या सूचना नाहीत. तुमच्या पिकासाठी आणि परिस्थितीसाठी पात्र कृषी तज्ज्ञांचा सल्ला घ्या व मान्य उत्पादन लेबलवरील सूचना पाळा.",
              ),
            ],
            [
              t("Enquiries", "चौकशी"),
              t(
                "Preparing or downloading an enquiry does not submit it or create an order. Once configured, WhatsApp lets you send the prepared message yourself. Contact setup must be completed before the business can receive messages through that link.",
                "चौकशी तयार किंवा डाउनलोड केल्याने ती पाठवली जात नाही आणि ऑर्डर तयार होत नाही. क्रमांक जोडल्यानंतर तयार संदेश तुम्ही व्हॉट्सअॅपमधून पाठवू शकता. त्या दुव्याने संदेश मिळण्यासाठी व्यवसायाचे संपर्क तपशील पूर्ण असणे आवश्यक आहे.",
              ),
            ],
            [
              t("Final business details", "अंतिम व्यवसाय तपशील"),
              t(
                "The business should review these prototype terms and supply verified contact, product and operating details before public launch.",
                "सार्वजनिक प्रकाशनापूर्वी व्यवसायाने या नमुना अटींचा आढावा घेऊन सत्यापित संपर्क, उत्पादने आणि कामकाजाचे तपशील द्यावेत.",
              ),
            ],
          ].map(([title, body]) => (
            <section key={title}>
              <h2 className="mb-3 text-xl font-bold text-forest">{title}</h2>
              <p className="text-muted-foreground">{body}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
