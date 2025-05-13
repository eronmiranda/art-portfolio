import { AnimatePresence } from "motion/react";
import LazyImage from "./LazyImage";

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

function GalleryImage({ index, loaded, ...props }) {
  return (
    <AnimatePresence custom={index}>
      <LazyImage
        {...props}
        custom={index}
        variants={imageVariants}
        initial="initial"
        animate={loaded ? "loaded" : "loading"}
      />
    </AnimatePresence>
  );
}

export default GalleryImage;
