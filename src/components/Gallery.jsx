const Gallery = ({ artworks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="group relative">
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover transition-opacity hover:opacity-90"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-lg font-light">{artwork.title}</h3>
            <p className="text-sm text-gray-600">{artwork.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
