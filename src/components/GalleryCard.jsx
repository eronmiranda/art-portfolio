import { cx } from "../lib/utils";
import ImageOverlay from "./ImageOverlay";

function GalleryCard({ index = 0, label, onClick, children, className }) {
  return (
    <div
      className={cx(
        "image-reveal group component-image-bg relative overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl dark:hover:shadow-lg dark:hover:shadow-zinc-100",
        className,
      )}
      onClick={onClick}
      style={{
        animationDelay: `${index * 80}ms`,
        "--hover-scale": "1.03",
      }}
    >
      <div className="transition-transform duration-300 ease-out hover:scale-[var(--hover-scale)] active:scale-98">
        <ImageOverlay label={label}>{children}</ImageOverlay>
      </div>
    </div>
  );
}

export default GalleryCard;
