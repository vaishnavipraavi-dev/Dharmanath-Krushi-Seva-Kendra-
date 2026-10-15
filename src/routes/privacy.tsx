import { PageHero } from "@/components/site";
import { useLang } from "@/lib/i18n";
import img from "@/assets/aerial.jpg";
export default function Privacy() {
  const { t } = useLang();
  return (
    <>
      <PageHero
        image={img}
        crumb={{ en: "Privacy", mr: "गोपनीयता" }}
        eyebrow={{ en: "Website information", mr: "वेबसाइट माहिती" }}
        title={{ en: "Your Information, Handled Clearly.", mr: "तुमच्या माहितीबद्दल स्पष्टता." }}
      />
      <article className="container-x py-16">
        <div className="mx-auto max-w-3xl space-y-9">
          {[
            [
              t("About this prototype", "या नमुना वेबसाइटबद्दल"),
              t(
                "This is a presentation website for Dharmanath Krushi Seva Kendra. Contact details and operational information are awaiting confirmation.",
                "ही धर्मनाथ कृषी सेवा केंद्राची सादरीकरणासाठी तयार केलेली नमुना वेबसाइट आहे. संपर्क व कामकाजाचे तपशील निश्चित व्हायचे आहेत.",
              ),
            ],
            [
              t("Language preference", "भाषेची निवड"),
              t(
                "Your selected language is saved in your browser's local storage under dksk-lang. You can change it using the language switch or remove it by clearing site data in your browser.",
                "तुमची निवडलेली भाषा ब्राउझरच्या स्थानिक साठवणीत dksk-lang या नावाने जतन होते. भाषा बटणातून निवड बदला किंवा ब्राउझरमधील साइट डेटा साफ करून ती काढा.",
              ),
            ],
            [
              t("Enquiry information", "चौकशीची माहिती"),
              t(
                "The form keeps your entered details in page memory while you use it. This prototype has no enquiry database and does not send form details to a server. Save a Copy downloads your enquiry to your device; it does not send it to the business.",
                "फॉर्ममध्ये भरलेली माहिती वापरादरम्यान पानाच्या मेमरीत राहते. या नमुन्यात चौकशीचा डेटाबेस नाही आणि फॉर्मची माहिती सर्व्हरला पाठवली जात नाही. ‘प्रत जतन करा’ वापरल्यावर चौकशी तुमच्या उपकरणावर डाउनलोड होते; व्यवसायाला पाठवली जात नाही.",
              ),
            ],
            [
              t("External services", "बाह्य सेवा"),
              t(
                "Fonts are loaded from Google Fonts, which receives the normal network information needed to serve them. Map links open Google Maps. When a business WhatsApp number is configured, the enquiry action will open WhatsApp with the details you enter; you choose whether to send them there. Those services follow their own privacy policies.",
                "फॉन्ट Google Fonts वरून लोड होतात; त्यासाठी आवश्यक सामान्य नेटवर्क माहिती त्या सेवेला मिळते. नकाशाचे दुवे Google Maps उघडतात. व्यवसायाचा व्हॉट्सअॅप क्रमांक जोडल्यानंतर चौकशीसाठी तुमच्या माहितीसह व्हॉट्सअॅप उघडेल; संदेश पाठवायचा की नाही हे तुम्ही ठरवाल. या सेवांची स्वतंत्र गोपनीयता धोरणे लागू होतात.",
              ),
            ],
            [
              t("Before launch", "प्रकाशनापूर्वी"),
              t(
                "This notice should be reviewed when business contact details, hosting, analytics or backend services are finalized.",
                "व्यवसायाचे संपर्क तपशील, होस्टिंग, विश्लेषण किंवा बॅकएंड सेवा निश्चित झाल्यावर या सूचनेचा आढावा घ्यावा.",
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
