import { home } from "../resources/content";
import MasonryGrid from "../components/MasonryGrid";
import useFirestore from "../hooks/useFirestore";
import { motion } from "motion/react";

function Home() {
  const { docs } = useFirestore("images");
  const artworks = docs
    .filter((doc) => doc.url !== undefined)
    .filter((doc) => doc.display === undefined || doc.display === true)
    .map((doc) => ({
      src: doc.url,
      alt: doc.title,
      title: doc.title,
    }))
    .slice(0, 6);
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
          {home.headline}
        </h1>
        <p className="mt-3 max-w-2xl text-xl text-zinc-700 dark:text-zinc-400">
          {home.subline}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <MasonryGrid
          artworks={artworks}
          breakpointColumnsObj={{ default: 3, 560: 2 }}
        />
      </section>
      {home.cta.display && (
        <div className="mx-auto max-w-5xl px-4 py-8">
          <motion.div className="flex justify-center" whileTap={{ y: 4 }}>
            <a
              href={home.cta.link}
              className="inline-block rounded-full bg-teal-500 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {home.cta.text}
            </a>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Home;
