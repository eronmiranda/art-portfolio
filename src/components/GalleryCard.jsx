import { cx } from "../lib/utils";
import LazyImage from "./LazyImage";
import ImageOverlay from "./ImageOverlay";

function GalleryCard({ index = 0, label, onClick, children, className }) {
  console.log("GalleryCard", index);
  return (
    <div
      className={cx(
        "fade-in-from-top group component-image-bg relative overflow-hidden shadow-md duration-300 hover:scale-105 hover:opacity-90 hover:shadow-2xl active:scale-95 dark:hover:shadow-lg dark:hover:shadow-zinc-100",
        className,
      )}
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <ImageOverlay label={label}>{children}</ImageOverlay>
    </div>
  );
}

export default GalleryCard;
