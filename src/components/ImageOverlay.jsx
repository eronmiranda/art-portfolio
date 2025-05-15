import { cx } from "../lib/utils";
function ImageOverlay({ className, label, children }) {
  return (
    <div>
      {children}
      <div
        className={cx(
          "absolute right-0 bottom-0 left-0 bg-gradient-to-t from-white/80 to-transparent p-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100",
          className,
        )}
      >
        <h4 className="text-xs font-normal text-zinc-900 md:text-lg">
          {label}
        </h4>
      </div>
    </div>
  );
}

export default ImageOverlay;
