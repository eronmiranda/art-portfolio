import Masonry from "react-masonry-css";
import useFirestore from "../hooks/useFirestore";

export default function MasonryGrid() {
  const { docs } = useFirestore("images");
  const images = docs.map((doc) => ({
    src: doc.url,
    alt: doc.fileName,
  }));
  const artworks = images.filter((artwork) => artwork.src !== undefined);
  const breakpointColumnsObj = {
    default: 5,
    1440: 4,
    1024: 3,
    560: 2,
  };

  const isLoading = docs.length === 0;
  const skeletons = Array.from({ length: 12 });

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex ml-[-4px] w-full"
      columnClassName="pl-4 bg-clip-padding"
    >
      {isLoading
        ? skeletons.map((_, index) => (
            <div
              key={index}
              className="mb-4 rounded-md overflow-hidden aspect-square bg-gray-200 animate-pulse"
            >
              <div className="w-full h-full bg-gray-300" />
            </div>
          ))
        : artworks.map((artwork, index) => (
            <div
              key={index}
              className="mb-4 rounded-md overflow-hidden aspect-square"
            >
              <img
                src={artwork.src}
                alt={artwork.alt}
                className="w-full h-full object-cover"
                loading={index < 10 ? "eager" : "lazy"}
                sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
              />
            </div>
          ))}
    </Masonry>
  );
}
