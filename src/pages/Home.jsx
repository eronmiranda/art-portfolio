import { useMemo } from "react";
import useFirestore from "../hooks/useFirestore";
import { filterAndMapImages } from "../lib/utils";
import { home } from "../resources/content";
import Gallery from "../components/Gallery";
import CTAButton from "../components/CTAButton";

function Home() {
  const rawImages = useFirestore("images");
  const images = useMemo(
    () => filterAndMapImages(rawImages).slice(0, 6),
    [rawImages],
  );
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-20 pb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-100">
          {home.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-2xl font-medium text-zinc-700 dark:text-zinc-400">
          {home.subline}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-zinc-800 dark:text-zinc-100">
          Featured Artworks
        </h2>
        <Gallery
          images={images}
          showTags={false}
          className="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
        />
      </section>
      {home.cta.display && (
        <div className="mx-auto max-w-5xl px-4 py-8">
          <p className="mb-4 text-center text-lg text-zinc-700 dark:text-zinc-300">
            {home.cta.description ?? "Ready to see more?"}
          </p>
          <div className="flex justify-center">
            <CTAButton to={home.cta.link}>
              {home.cta.label ?? "Explore my Portfolio"}
            </CTAButton>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
