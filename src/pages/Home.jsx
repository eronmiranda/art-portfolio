import { lazy, useMemo } from "react";
import useFirestore from "../hooks/useFirestore";
import { filterAndMapImages } from "../lib/utils";
import { home } from "../resources/content";
import Gallery from "../components/Gallery";
import About from "../components/About";

const CTASection = lazy(() => import("../components/CTASection"));

function HighlightsSection() {
  const highlights = [
    { label: "Years Creating", value: "4+" },
    { label: "Digital Pieces", value: "40+" },
    { label: "Happy Customers", value: "30+" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-b border-zinc-200 py-14 sm:py-16 dark:border-zinc-800">
        <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-3 sm:gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="space-y-3">
              <div className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-100">
                {item.value}
              </div>
              <div className="text-base font-medium text-zinc-600 dark:text-zinc-400">
                {item.label}
              </div>
              <div className="mx-auto h-0.5 w-12 bg-pink-500/20 dark:bg-pink-400/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  const { cta } = home;
  const rawImages = useFirestore("portfolio");
  const images = useMemo(
    () =>
      filterAndMapImages(rawImages)
        .filter((image) => image.featured === true)
        .slice(0, 6),
    [rawImages],
  );
  console.log(images);

  return (
    <main className="min-h-screen">
      {/* Hero/About Section */}
      <section className="pb-12">
        <About />
      </section>

      {/* Featured Work Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-zinc-800 sm:text-4xl dark:text-zinc-100">
            Some of my favourites
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            A curated selection of digital pieces that showcase my style and
            creativity
          </p>
        </div>

        <Gallery
          images={images}
          showTags={false}
          showSearch={false}
          breakpointCols={{ default: 3, 720: 2 }}
        />
      </section>

      {/* Highlights Section */}
      <HighlightsSection />

      {/* CTA Section */}
      {cta.display && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <CTASection
              description={cta.description}
              label={cta.label}
              link={cta.link}
            />
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;
