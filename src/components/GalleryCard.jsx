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
        "shadow-md transition-shadow hover:shadow-xl",
        // hover for interactivity
        "transition-transform duration-200 hover:scale-105 hover:brightness-90",
        className,
      )}
    >
      {children}
    </MotionDiv>
  );
}

export default GalleryCard;
