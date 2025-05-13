import {motion, AnimatePresence} from "motion/react";

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
    <AnimatePresence initial={false} custom={index}>
      <motion.img
        {...props}
        variants={imageVariants}
        initial="initial"
        animate={loaded ? "loaded" : "loading"}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
      />
    </AnimatePresence>
  )
}

export default LazyImage
