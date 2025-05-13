import { cx } from "../lib/utils";
function ImageOverlay({ className, text, children }) {
  return (
    <div>
      {children}
      <div
        className={cx(
          "absolute right-0 bottom-0 left-0 bg-white/70 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:p-4",
          className
        )}
      >
        <h4 className="text-xs font-light text-zinc-900 md:text-lg">{text}</h4>
      </div>
    </div>
  );
}

export default ImageOverlay;
