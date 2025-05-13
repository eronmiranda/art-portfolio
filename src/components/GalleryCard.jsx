import { cx } from "../lib/utils";
import { MotionDiv } from "./Motion";
function GalleryCard({ children, className, ...props }) {
  return (
    <MotionDiv
      {...props}
      whileTap={{ y: 4 }}
      className={cx(
        "group relative aspect-square overflow-hidden rounded-md",
        // shadow for depth
        "shadow-md hover:shadow-xl transition-shadow",
        className
      )}
    >
      {children}
    </MotionDiv>
  );
}

export default GalleryCard;
