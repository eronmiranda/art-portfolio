import { lazy, useMemo } from "react";
import useFirestore from "../hooks/useFirestore";
import { filterAndMapImages } from "../lib/utils";
import { home } from "../resources/content";
import Gallery from "../components/Gallery";
import About from "./About";

const CTASection = lazy(() => import("../components/CTASection"));

function HighlightsSection() {
  const highlights = [
    { label: "Years Creating", value: "4+" },
    { label: "Digital Pieces", value: "40+" },
    { label: "Happy Customers", value: "30+" },
  ];

  return (
    <div className="my-16 border-t border-b border-zinc-200 py-16 dark:border-zinc-800">
      <div className="grid grid-cols-3 gap-8 text-center">
        {highlights.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-100">
              {item.value}
            </div>
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { cta } = home;
  const rawImages = useFirestore("featured");
  const images = useMemo(
    () => filterAndMapImages(rawImages).slice(0, 6),
    [rawImages],
  );
  return (
    <>
      <About />
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-16 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Some of my favourites
        </h2>
        <Gallery
          images={images}
          showTags={false}
          breakpointCols={{ default: 3, 720: 2 }}
        />
      </section>
      <HighlightsSection />
      {cta.display && (
        <CTASection
          description={cta.description}
          label={cta.label}
          link={cta.link}
        />
      )}
    </>
  );
}

export default Home;
