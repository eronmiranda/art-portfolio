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

function MasonryGrid({ artworks, breakpointColumnsObj, className }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [loaded, setLoaded] = useState(Array(artworks.length).fill(false));
  const [selectedIndex, setSelectedIndex] = useState(null);
  const columns = breakpointColumnsObj || defaultBreakpointColumnsObj;

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(12px)",
    },
    loaded: (index) => {
      return {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.4,
          delay: index * 0.1,
        },
      };
    },
    loading: (index) => {
      return {
        opacity: 0,
        scale: 1.1,
        filter: "blur(12px)",
        transition: {
          duration: 0.4,
          delay: index * 0.1,
        },
      };
    },
  };

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
            {!loaded[index] && (
              <div className="absolute inset-0 z-10 mb-4 aspect-square animate-pulse overflow-hidden rounded-md bg-gray-200">
                <div className="h-full w-full bg-gray-300" />
              </div>
            )}
            <AnimatePresence custom={index}>
              <motion.img
                src={artwork.src}
                alt={artwork.alt}
                layoutId={`artwork-img-${index}`}
                variants={imageVariants}
                initial="initial"
                animate={loaded[index] ? "loaded" : "loading"}
                custom={index}
                className="h-full w-full object-cover hover:opacity-90"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
                onLoad={() => handleImageLoad(index)}
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
              />
            </AnimatePresence>

            <div className="absolute right-0 bottom-0 left-0 bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:p-4">
              <h4 className="text-xs font-light md:text-lg">{artwork.title}</h4>
            </div>
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
