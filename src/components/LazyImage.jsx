import { motion, AnimatePresence } from "motion/react";

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

function LazyImage({ index, loaded, ...props }) {
  return (
    <AnimatePresence custom={index}>
      <motion.img
        {...props}
        custom={index}
        variants={imageVariants}
        initial="initial"
        animate={loaded ? "loaded" : "loading"}
        loading="lazy"
        decoding="async"
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
      />
    </AnimatePresence>
  );
}

export default LazyImage;
