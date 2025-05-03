import Masonry from "react-masonry-css";
import { useState } from "react";
import Modal from "./Modal";
const defaultBreakpointColumnsObj = {
  default: 5,
  1440: 4,
  1024: 3,
  560: 2,
};

export default function MasonryGrid({ artworks, breakpointColumnsObj, className }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const columns = breakpointColumnsObj || defaultBreakpointColumnsObj;
  const isLoading = artworks.length === 0;
  const skeletons = Array.from({ length: 12 });

  return (
    <>
      <Masonry
        breakpointCols={columns}
        className={`flex w-full${className ? ` ${className}` : ""}`}
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
                className="group relative mb-4 aspect-square overflow-hidden rounded-md"
              >
                <img
                  src={artwork.src}
                  alt=""
                  className="h-full w-full object-cover transition-opacity hover:opacity-90"
                  loading="lazy"
                  sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                />
                <div className="absolute right-0 bottom-0 left-0 bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:p-4">
                  <h4 className="text-xs font-light md:text-lg">
                    {artwork.title}
                  </h4>
                </div>
              </div>
            ))}
      </Masonry>
      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </>
  );
}
