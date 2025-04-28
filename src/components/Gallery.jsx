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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* show only 6 latest artworks */}
      {artworks.slice(0, 6).map((artwork) => (
        <div key={artwork.id} className="group relative">
          <img
            src={artwork.src}
            alt={artwork.alt}
            className="h-full w-full object-cover transition-opacity hover:opacity-90"
          />
          <div className="absolute right-0 bottom-0 left-0 bg-white/80 p-4 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <h3 className="text-lg font-light">{artwork.alt}</h3>
            <p className="text-sm text-gray-600">{artwork.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
