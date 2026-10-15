import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useLayoutEffect,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Header, Footer, Floating, btn } from "@/components/site";
import { NotFound } from "@/components/not-found";
import { LangProvider, useLang } from "@/lib/i18n";
import { products } from "@/lib/catalog";
import { reportLovableError } from "@/lib/lovable-error-reporting";

const Home = lazy(() => import("@/routes/index"));
const About = lazy(() => import("@/routes/about"));
const Products = lazy(() => import("@/routes/products.index"));
const ProductDetail = lazy(() => import("@/routes/products.$slug"));
const CropSolutions = lazy(() => import("@/routes/crop-solutions"));
const Gallery = lazy(() => import("@/routes/gallery"));
const Contact = lazy(() => import("@/routes/contact"));
const Privacy = lazy(() => import("@/routes/privacy"));
const Terms = lazy(() => import("@/routes/terms"));

const pageInfo: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Growing Together",
    description:
      "Explore seeds, fertilizers, crop protection and agricultural supplies in Karjat, Ahilyanagar.",
  },
  "/about": {
    title: "About Us",
    description: "Meet your local agricultural supply centre in Karjat, Ahilyanagar.",
  },
  "/products": {
    title: "Products",
    description: "Explore seeds, fertilizers, crop protection and agricultural inputs by category.",
  },
  "/crop-solutions": {
    title: "Crop Solutions",
    description:
      "Explore agricultural input categories by vegetables, fruits, cereals, pulses and other crops.",
  },
  "/gallery": {
    title: "Gallery",
    description:
      "Explore a visual story of agriculture, farming and essential agricultural inputs.",
  },
  "/contact": {
    title: "Contact",
    description:
      "Share your agricultural product requirements with Dharmanath Krushi Seva Kendra, Karjat.",
  },
  "/privacy": {
    title: "Privacy",
    description: "How this website handles language preferences and product enquiries.",
  },
  "/terms": {
    title: "Terms",
    description: "Information about sample products, enquiries and website use.",
  },
};

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, "") || "/";
    const product = path.startsWith("/products/")
      ? products.find((p) => `/products/${p.slug}` === path)
      : undefined;
    const info = product
      ? { title: product.name.en, description: product.desc.en }
      : pageInfo[path] || {
          title: "Page not found",
          description: "Explore our agricultural product catalogue or return to the homepage.",
        };
    const title = `${info.title} — Dharmanath Krushi Seva Kendra`;
    document.title = title;
    for (const [attribute, key, content] of [
      ["name", "description", info.description],
      ["property", "og:title", title],
      ["property", "og:description", info.description],
    ]) {
      let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute!, key!);
        document.head.append(meta);
      }
      meta.content = content!;
    }
  }, [pathname]);
  return null;
}

function RouteLoading() {
  const { t } = useLang();
  return (
    <div className="container-x min-h-[50vh] py-24 text-center text-forest" role="status">
      {t("Loading page…", "पान लोड होत आहे…")}
    </div>
  );
}

function PageError({ reset }: { reset: () => void }) {
  const { t } = useLang();
  return (
    <section className="container-x py-24 text-center">
      <h1 className="text-h2 font-bold text-forest">
        {t("This page didn't load", "हे पान लोड झाले नाही")}
      </h1>
      <p className="my-6 text-muted-foreground">
        {t(
          "Please try again or return to the homepage.",
          "पुन्हा प्रयत्न करा किंवा मुख्यपृष्ठावर परत जा.",
        )}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button className={btn.primary} onClick={reset}>
          {t("Try again", "पुन्हा प्रयत्न करा")}
        </button>
        <Link className={btn.outline} to="/">
          {t("Go home", "मुख्यपृष्ठावर जा")}
        </Link>
      </div>
    </section>
  );
}

class PageErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch(error: Error, info: ErrorInfo) {
    reportLovableError(error, { boundary: "page", componentStack: info.componentStack });
  }
  override render() {
    return this.state.failed ? (
      <PageError reset={() => this.setState({ failed: false })} />
    ) : (
      this.props.children
    );
  }
}

export function App() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <PageMetadata />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="pt-24 xl:pt-[132px]">
          <PageErrorBoundary key={pathname}>
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/crop-solutions" element={<CropSolutions />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageErrorBoundary>
        </main>
        <Footer />
        <Floating />
      </MotionConfig>
    </LangProvider>
  );
}
