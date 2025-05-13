import { MotionPresence } from "./Motion";
import LazyImage from "./LazyImage";
import { cx } from "../lib/utils";

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

function GalleryImage({ index, loaded, className, ...props }) {
  return (
    <MotionPresence custom={index}>
      <LazyImage
        {...props}
        custom={index}
        variants={imageVariants}
        initial="initial"
        animate={loaded ? "loaded" : "loading"}
        className={cx("h-full w-full object-cover hover:opacity-90", className)}
      />
    </MotionPresence>
  );
}

export default GalleryImage;
