import seeds from "@/assets/seeds.jpg";
import fertilizer from "@/assets/fertilizer.jpg";
import protection from "@/assets/protection.jpg";
import store from "@/assets/store.jpg";
import vegetables from "@/assets/vegetables.jpg";
import fruits from "@/assets/fruits.jpg";
import cereals from "@/assets/cereals.jpg";
import pulses from "@/assets/pulses.jpg";
import sugarcane from "@/assets/sugarcane.jpg";
import farmer from "@/assets/farmer.jpg";
import aerial from "@/assets/aerial.jpg";
import hero from "@/assets/hero.jpg";
import type { L } from "./i18n";

export type CategoryId = "seeds" | "fertilizers" | "protection" | "inputs";

export const categories: { id: CategoryId; name: L; desc: L; image: string }[] = [
  {
    id: "seeds",
    name: { en: "Seeds & Sowing Essentials", mr: "बियाणे व पेरणी साहित्य" },
    desc: { en: "Vegetable and field crop seeds for every sowing season.", mr: "प्रत्येक पेरणी हंगामासाठी भाजीपाला व शेतपिकांचे बियाणे." },
    image: seeds,
  },
  {
    id: "fertilizers",
    name: { en: "Fertilizers & Plant Nutrition", mr: "खते व पीक पोषण" },
    desc: { en: "Primary, secondary and micronutrient fertilizers.", mr: "मुख्य, दुय्यम व सूक्ष्म अन्नद्रव्य खते." },
    image: fertilizer,
  },
  {
    id: "protection",
    name: { en: "Crop Protection Products", mr: "पीक संरक्षण उत्पादने" },
    desc: { en: "Solutions to help protect crops through the season.", mr: "हंगामभर पिकांच्या संरक्षणासाठी उपाय." },
    image: protection,
  },
  {
    id: "inputs",
    name: { en: "Other Agricultural Inputs", mr: "इतर कृषी साहित्य" },
    desc: { en: "Soil care and essential farming supplies.", mr: "माती आरोग्य व शेतीसाठी आवश्यक साहित्य." },
    image: store,
  },
];

export type Product = { slug: string; category: CategoryId; name: L; desc: L; image: string };

export const products: Product[] = [
  { slug: "vegetable-seeds", category: "seeds", name: { en: "Vegetable Seeds", mr: "भाजीपाला बियाणे" }, desc: { en: "Seed varieties for common vegetable crops.", mr: "प्रमुख भाजीपाला पिकांसाठी बियाणे वाण." }, image: seeds },
  { slug: "field-crop-seeds", category: "seeds", name: { en: "Field Crop Seeds", mr: "शेतपीक बियाणे" }, desc: { en: "Seeds for cereals, pulses and other field crops.", mr: "तृणधान्ये, कडधान्ये व इतर शेतपिकांसाठी बियाणे." }, image: cereals },
  { slug: "npk-fertilizer", category: "fertilizers", name: { en: "NPK Fertilizer", mr: "एनपीके खत" }, desc: { en: "Balanced primary nutrient fertilizer.", mr: "संतुलित मुख्य अन्नद्रव्य खत." }, image: fertilizer },
  { slug: "micronutrient-fertilizer", category: "fertilizers", name: { en: "Micronutrient Fertilizer", mr: "सूक्ष्म अन्नद्रव्य खत" }, desc: { en: "Supports crops with essential trace nutrients.", mr: "आवश्यक सूक्ष्म अन्नद्रव्यांचा पुरवठा." }, image: pulses },
  { slug: "crop-protection-solution", category: "protection", name: { en: "Crop Protection Solution", mr: "पीक संरक्षण द्रावण" }, desc: { en: "Helps protect crops — use as per product label.", mr: "पिकांच्या संरक्षणासाठी — लेबलनुसार वापरा." }, image: protection },
  { slug: "soil-nutrition-product", category: "inputs", name: { en: "Soil Nutrition Product", mr: "माती पोषण उत्पादन" }, desc: { en: "Supports soil health and structure.", mr: "मातीचे आरोग्य व पोत सुधारण्यास मदत." }, image: sugarcane },
  { slug: "fruit-crop-nutrition", category: "fertilizers", name: { en: "Fruit Crop Nutrition", mr: "फळपीक पोषण" }, desc: { en: "Nutrition range suited for orchards.", mr: "फळबागांसाठी पोषण उत्पादने." }, image: fruits },
  { slug: "farm-essentials", category: "inputs", name: { en: "Farm Essentials", mr: "शेती आवश्यक साहित्य" }, desc: { en: "Everyday supplies for the working farm.", mr: "रोजच्या शेतीकामासाठी साहित्य." }, image: vegetables },
];

export type Crop = { id: string; name: L; overview: L; image: string; cats: CategoryId[] };

export const crops: Crop[] = [
  { id: "vegetables", name: { en: "Vegetables", mr: "भाजीपाला" }, image: vegetables, cats: ["seeds", "fertilizers", "protection"],
    overview: { en: "Vegetable crops such as tomato, brinjal and chilli are typically grown in short cycles and need attention to seed quality and balanced nutrition.", mr: "टोमॅटो, वांगी, मिरची यांसारखी भाजीपाला पिके कमी कालावधीत येतात; दर्जेदार बियाणे व संतुलित पोषण महत्त्वाचे असते." } },
  { id: "fruits", name: { en: "Fruits", mr: "फळपिके" }, image: fruits, cats: ["fertilizers", "protection", "inputs"],
    overview: { en: "Orchard crops like pomegranate are long-term investments where soil health and nutrition planning matter across seasons.", mr: "डाळिंबासारखी फळपिके दीर्घकालीन गुंतवणूक असते; मातीचे आरोग्य व पोषण नियोजन महत्त्वाचे." } },
  { id: "cereals", name: { en: "Cereals", mr: "तृणधान्ये" }, image: cereals, cats: ["seeds", "fertilizers"],
    overview: { en: "Wheat, jowar and bajra form the backbone of many farms, relying on good seed and timely nutrient supply.", mr: "गहू, ज्वारी, बाजरी ही अनेक शेतांची मुख्य पिके; चांगले बियाणे व वेळेवर पोषण आवश्यक." } },
  { id: "pulses", name: { en: "Pulses", mr: "कडधान्ये" }, image: pulses, cats: ["seeds", "fertilizers", "protection"],
    overview: { en: "Gram, tur and other pulses enrich the soil and benefit from careful seed selection.", mr: "हरभरा, तूर इत्यादी कडधान्ये जमीन सुपीक करतात; बियाणे निवड काळजीपूर्वक करावी." } },
  { id: "other", name: { en: "Other Crops", mr: "इतर पिके" }, image: sugarcane, cats: ["fertilizers", "inputs"],
    overview: { en: "Sugarcane, cotton, soybean and more — share your crop and our team will guide you to the right product categories.", mr: "ऊस, कापूस, सोयाबीन व इतर — तुमचे पीक सांगा, आमची टीम योग्य उत्पादन श्रेणी सुचवेल." } },
];

export type GalleryCat = "agriculture" | "products" | "farmers" | "store";
export const galleryCats: { id: GalleryCat; name: L }[] = [
  { id: "agriculture", name: { en: "Agriculture", mr: "शेती" } },
  { id: "products", name: { en: "Products", mr: "उत्पादने" } },
  { id: "farmers", name: { en: "Farmers", mr: "शेतकरी" } },
  { id: "store", name: { en: "Store & Activities", mr: "दुकान व उपक्रम" } },
];

export const gallery: { src: string; cat: GalleryCat; alt: string; tall?: boolean }[] = [
  { src: hero, cat: "agriculture", alt: "Green farmland at sunrise" },
  { src: farmer, cat: "farmers", alt: "Farmer inspecting crop leaves", tall: true },
  { src: seeds, cat: "products", alt: "Assorted crop seeds" },
  { src: store, cat: "store", alt: "Agricultural input store interior" },
  { src: fruits, cat: "agriculture", alt: "Pomegranate orchard", tall: true },
  { src: fertilizer, cat: "products", alt: "Granular fertilizer in hand" },
  { src: protection, cat: "farmers", alt: "Farmer spraying cotton field" },
  { src: aerial, cat: "agriculture", alt: "Aerial view of farmland" },
  { src: vegetables, cat: "agriculture", alt: "Tomato and brinjal plants", tall: true },
  { src: pulses, cat: "agriculture", alt: "Pulse crops with pods" },
  { src: cereals, cat: "agriculture", alt: "Wheat and jowar field" },
  { src: sugarcane, cat: "agriculture", alt: "Sugarcane rows" },
];

export const catName = (id: CategoryId) => categories.find((c) => c.id === id)!.name;
