import { home } from "../resources/content";
import MasonryGrid from "../components/MasonryGrid";
import useFirestore from "../hooks/useFirestore";

const imageBreakpointColumnsObj = {
  default: 3,
  560: 2,
};


const Home = () => {
  const { docs } = useFirestore("images");
  const artworks = docs
    .filter((doc) => doc.url !== undefined)
    .map((doc) => ({
      src: doc.url,
      alt: doc.fileName,
    }));
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">{home.headline}</h1>
        <p className="max-w-2xl text-xl mt-3 text-zinc-700">{home.subline}</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <MasonryGrid 
          artworks={artworks.slice(0, 6)}
          breakpointColumnsObj={imageBreakpointColumnsObj}
        />
      </section>
      {home.cta.display && (
        <section className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex justify-center">
            <a
              href={home.cta.link}
              className="inline-block rounded-full bg-teal-500 px-8 py-3 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:outline-none"
            >
              {home.cta.text}
            </a>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
