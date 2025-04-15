import Gallery from '../components/Gallery';

const Home = () => {
  const sampleArtworks = [
    {
      id: 1,
      title: "Artwork 1",
      imageUrl: "https://placeholder.com/800x600",
      description: "Description of artwork 1"
    },
    // Add more sample artworks
  ];

  return (
    <div className="pt-20">
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light mb-4">Stickers by Marave</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          A brief introduction about the artist and their work. Keep it simple and elegant.
        </p>
      </section>
      
      <section className="max-w-5xl mx-auto px-4 py-8">
        <Gallery artworks={sampleArtworks} />
      </section>
    </div>
  );
};

export default Home;
