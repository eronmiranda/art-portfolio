import { lazy, useMemo } from "react";
import useFirestore from "../hooks/useFirestore";
import { filterAndMapImages } from "../lib/utils";
import { home } from "../resources/content";
import Gallery from "../components/Gallery";

const CTASection = lazy(() => import("../components/CTASection"));

function Home() {
  const { headline, subline, cta } = home;
  const rawImages = useFirestore("featured");
  const images = useMemo(
    () => filterAndMapImages(rawImages).slice(0, 6),
    [rawImages],
  );
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-100">
          {headline}
        </h1>
        <p className="mt-6 max-w-2xl text-2xl font-medium text-zinc-700 dark:text-zinc-400">
          {subline}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Some of my favourites
        </h2>
        <Gallery
          images={images}
          showTags={false}
          breakpointCols={{ default: 3, 720: 2 }}
        />
      </section>
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
