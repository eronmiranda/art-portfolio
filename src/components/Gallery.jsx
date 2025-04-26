import useFirestore from "../hooks/useFirestore";

const Gallery = () => {
  const { docs } = useFirestore("images");
  const artworks = docs
    .filter((doc) => doc.url)
    .map((doc) => ({
      src: doc.url,
      alt: doc.fileName,
    }));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* show only 6 latest artworks */}
      {artworks.slice(0, 6).map((artwork) => (
        <div key={artwork.id} className="group relative">
          <img
            src={artwork.src}
            alt={artwork.alt}
            className="w-full h-full object-cover transition-opacity hover:opacity-90"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-lg font-light">{artwork.alt}</h3>
            <p className="text-sm text-gray-600">{artwork.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
