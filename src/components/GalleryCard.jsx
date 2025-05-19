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
    <div
      className={cx(
        "group fade-in relative overflow-hidden rounded-md transition-transform duration-200 ease-in-out hover:scale-105 hover:opacity-90 active:scale-95",
        className,
      )}
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

export default GalleryCard;
