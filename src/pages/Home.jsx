import { home } from '../resources/content';
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <div className="pt-20">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light mb-4">{home.headline}</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          {home.subline}
        </p>
      </section>
      
      <section className="max-w-5xl mx-auto px-4 py-8">
        <Gallery />
      </section>
      {home.cta.display && (<section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-center">
          <a
            href={home.cta.link}
            className="inline-block px-8 py-3 rounded-full bg-teal-500 text-white font-semibold shadow-lg hover:bg-teal-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            {home.cta.text}
          </a>
        </div>
      </section>)}
    </div>
  );
};

export default Home;
