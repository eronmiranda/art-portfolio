import Masonry from "react-masonry-css";
import { useState, lazy, Suspense } from "react";
import Modal from "./Modal";
import { motion, AnimatePresence } from "motion/react";
import SkeletonImage from "./SkeletonImage";

const LazyImage = lazy(() => import("./LazyImage"));

const defaultBreakpointColumnsObj = {
  default: 5,
  1440: 4,
  1024: 3,
  560: 2,
};

function MasonryGrid({ artworks, breakpointColumnsObj, className }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [loaded, setLoaded] = useState(Array(artworks.length).fill(false));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const columns = breakpointColumnsObj ?? defaultBreakpointColumnsObj;

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
        {artworks.map((artwork, index) => (
          <motion.div
            key={index}
            layoutId={`artwork-${index}`}
            onClick={() => handleImageClick(artwork.src, index)}
            whileTap={{ y: 4 }}
            className="group relative mb-4 aspect-square overflow-hidden rounded-md"
          >
            <Suspense fallback={<SkeletonImage />}>
              <LazyImage
                index={index}
                loaded={loaded[index]}
                src={artwork.src}
                alt={artwork.alt}
                layoutId={`artwork-img-${index}`}
                className="h-full w-full object-cover hover:opacity-90"
                onLoad={() => handleImageLoad(index)}
              />
              <div className="absolute right-0 bottom-0 left-0 bg-white/70 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:p-4">
                <h4 className="text-xs font-light text-zinc-900 md:text-lg">
                  {artwork.title}
                </h4>
              </div>
            </Suspense>
          </motion.div>
        ))}
      </Masonry>
      <AnimatePresence>
        {selectedImg && (
          <Modal onBackdropClick={() => setSelectedImg(null)}>
            <motion.img
              src={selectedImg}
              alt=""
              layoutId={`artwork-img-${selectedIndex}`}
              className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-xl"
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default MasonryGrid;
