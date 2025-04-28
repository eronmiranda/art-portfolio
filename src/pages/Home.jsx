import { home } from "../resources/content";
import Gallery from "../components/Gallery";

const Home = () => {
  return (
    <div className="pt-20">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="mb-4 text-4xl font-light">{home.headline}</h1>
        <p className="max-w-2xl text-xl text-gray-600">{home.subline}</p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-8">
        <Gallery />
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
    </div>
  );
};

export default Home;
