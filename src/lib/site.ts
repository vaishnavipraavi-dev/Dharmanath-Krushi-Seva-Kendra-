// Central business details. Replace placeholders once confirmed by the client.
// Leave whatsapp/phone empty until a real number is provided — the UI then shows "setup pending".
export const site = {
  nameEn: "Dharmanath Krushi Seva Kendra",
  nameMr: "धर्मनाथ कृषी सेवा केंद्र",
  locationEn: "Karjat, Ahilyanagar, Maharashtra",
  locationMr: "कर्जत, जि. अहिल्यानगर, महाराष्ट्र",
  addressEn: "Store address to be confirmed",
  addressMr: "दुकानाचा पत्ता लवकरच",
  phone: "", // e.g. "+91 98XXXXXXXX"
  whatsapp: "", // digits only with country code, e.g. "9198XXXXXXXX"
  email: "",
  hoursEn: "Business hours to be confirmed",
  hoursMr: "कामकाजाची वेळ लवकरच",
  socials: { facebook: "", instagram: "", youtube: "" },
};

export function waLink(message: string): string | null {
  if (!/^[1-9]\d{7,14}$/.test(site.whatsapp)) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
