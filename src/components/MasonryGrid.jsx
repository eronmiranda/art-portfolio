import Masonry from "react-masonry-css";

export default function MasonryGrid({ setSelectedImg, artworks }) {
  const breakpointColumnsObj = {
    default: 5,
    1440: 4,
    1024: 3,
    560: 2,
  };
  const isLoading = artworks.length === 0;
  const skeletons = Array.from({ length: 12 });

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="ml-[-4px] flex w-full"
      columnClassName="pl-4 bg-clip-padding"
    >
      {isLoading
        ? skeletons.map((_, index) => (
          <div
            key={index}
            className="mb-4 aspect-square animate-pulse overflow-hidden rounded-md bg-gray-200"
          >
            <div className="h-full w-full bg-gray-300" />
          </div>
        ))
        : artworks.map((artwork, index) => (
          <div
            key={index}
            onClick={() => setSelectedImg(artwork.src)}
            className="mb-4 aspect-square overflow-hidden rounded-md group relative"
          >
            <img
              src={artwork.src}
              alt=""
              className="h-full w-full object-cover transition-opacity hover:opacity-90"
              loading={index < 10 ? "eager" : "lazy"}
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
            />
            <div className="absolute right-0 bottom-0 left-0 bg-white/80 p-4 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <h3 className="text-lg font-light">{artwork.alt}</h3>
              <p className="text-sm text-gray-600">{artwork.alt}</p>
            </div>
          </div>
        ))}
    </Masonry>
  );
}
