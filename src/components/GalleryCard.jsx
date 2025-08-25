import { cx } from "../lib/utils";

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
      <div className="relative transition-transform duration-300 ease-out hover:scale-[var(--hover-scale)] active:scale-98">
        {children}

        {/* Title badge */}
        {label && (
          <div className="absolute bottom-3 left-3 rounded-full bg-black/80 px-3 py-1 shadow-lg">
            <h4 className="text-xs font-medium text-white">{label}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryCard;
