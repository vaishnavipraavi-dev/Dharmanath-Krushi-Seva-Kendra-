# Dharmanath Krushi Seva Kendra

A responsive, bilingual agricultural business website built with React, TanStack Start, Tailwind CSS, Framer Motion and Lucide icons. This project remains compatible with its existing Lovable setup.

## Develop and check

```sh
npm install
npm run dev
npm run build
npm run test
npx tsc --noEmit
```

Pages: Home, About, Products, Product Details, Crop Solutions, Gallery, Contact, Privacy and Terms. Product filters and crop selections use URL search parameters. The gallery supports category filters and an accessible lightbox with keyboard navigation. The selected language is retained in browser storage.

## Business configuration

Update `src/lib/site.ts` with verified phone, WhatsApp, email, store address, hours and social links. WhatsApp expects international digits without `+`, spaces or punctuation. Until a valid number is present, the website shows contact setup as pending and never claims an enquiry was sent. Visitors can download their prepared enquiry as a text file. No database or enquiry submission API is implemented.

`src/lib/catalog.ts` contains illustrative product types, crop categories and gallery images. Replace these with approved inventory and actual business photographs before launch. Products do not represent confirmed stock or brand affiliations. Crop information is general and does not include pesticide dosages or personalized recommendations. Review privacy and terms content when production services are finalized.

The site uses locally supplied photography. Marathi uses locally bundled Noto Sans Devanagari variable fonts, including their SIL Open Font License in `src/assets/fonts/OFL.txt`; English fonts load from Google Fonts. Marathi headings, labels and body text use language-specific spacing for readability. Browser-local language selection also works if persistent storage is blocked.

## Lovable

Continue editing in the [connected Lovable project](https://lovable.dev/projects/c1276221-44ce-41fa-aefa-14516d91c9e1). Preserve published Git history as described in AGENTS.md.
