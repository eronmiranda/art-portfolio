import Masonry from "react-masonry-css";
import { useState } from "react";
import Modal from "./Modal";
import { motion, AnimatePresence } from "motion/react";

const defaultBreakpointColumnsObj = {
  default: 5,
  1440: 4,
  1024: 3,
  560: 2,
};

export default function MasonryGrid({
  artworks,
  breakpointColumnsObj,
  className,
}) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [loaded, setLoaded] = useState(Array(artworks.length).fill(false));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const columns = breakpointColumnsObj || defaultBreakpointColumnsObj;
  const isLoading = artworks.length === 0;
  const skeletons = Array.from({ length: 12 });

  const handleImageLoad = (index) => {
    setLoaded((previousStates) => {
      const updatedStates = [...previousStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };

  const handleImageClick = (src, index) => {
    setSelectedImg(src);
    setSelectedIndex(index);
  };

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
              <motion.div
                key={index}
                layoutId={`artwork-${index}`}
                onClick={() => handleImageClick(artwork.src, index)}
                whileTap={{ y: 4 }}
                className="group relative mb-4 aspect-square overflow-hidden rounded-md"
              >
                {!loaded[index] && (
                  <div className="absolute inset-0 z-10 mb-4 aspect-square animate-pulse overflow-hidden rounded-md bg-gray-200">
                    <div className="h-full w-full bg-gray-300" />
                  </div>
                )}
                <motion.img
                  src={artwork.src}
                  alt={artwork.alt}
                  layoutId={`artwork-img-${index}`}
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
                  animate={
                    loaded[index]
                      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, scale: 1.1, filter: "blur(12px)" }
                  }
                  transition={{
                    duration: 0.4,
                  }}
                  className="h-full w-full object-cover hover:opacity-90"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                  onLoad={() => handleImageLoad(index)}
                />
                <div className="absolute right-0 bottom-0 left-0 bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:p-4">
                  <h4 className="text-xs font-light md:text-lg">
                    {artwork.title}
                  </h4>
                </div>
              </motion.div>
            ))}
      </Masonry>
      <AnimatePresence>
        {selectedImg && (
          <Modal
            key={selectedImg}
            selectedImg={selectedImg}
            setSelectedImg={setSelectedImg}
            layoutId={`artwork-img-${selectedIndex}`}
          />
        )}
      </AnimatePresence>
    </>
  );
}
