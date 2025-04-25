import Masonry from "react-masonry-css";
import { artworks } from "../resources/content";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex ml-[-4px] w-full"
      columnClassName="pl-4 bg-clip-padding"
    >
      {artworks.map((artwork, index) => (
        <div
          key={index}
          className="mb-4 rounded-md overflow-hidden"
          style={{
            aspectRatio: artwork.orientation === "horizontal" ? "16/9" : "9/16",
          }}
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
