import { cx } from "../lib/utils";
import { MotionDiv, MotionPresence } from "./Motion";
const imageVariants = {
  initial: {
    opacity: 0,
    // filter: "blur(8px)",
  },
  animate: (index) => {
    return {
      opacity: 1,
      // filter: "blur(0px)",
      transition: {
        duration: 0.3,
        delay: index * 0.08,
      },
    };
  },
};

function GalleryCard({ children, className, onClick, index, ...props }) {
  return (
    <MotionPresence custom={index} mode="popLayout">
      <MotionDiv
        className={cx(
          "group relative aspect-square overflow-hidden rounded-md",
          className,
        )}
        onClick={onClick}
        custom={index}
        variants={imageVariants}
        initial="initial"
        animate="animate"
        {...props}
      >
        {children}
      </MotionDiv>
    </MotionPresence>
  );
}

export default GalleryCard;
