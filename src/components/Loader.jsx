import { cx } from "../lib/utils";

function Loader({
  size = "h-12 w-12",
  text = "Loading...",
  className = "",
  showText = true,
}) {
  return (
    <div className={cx("flex items-center justify-center", className)}>
      <div className="text-center">
        <div
          className={cx(
            "mx-auto animate-spin rounded-full border-4 border-zinc-200 border-t-teal-600 dark:border-zinc-700 dark:border-t-teal-400",
            size,
          )}
        ></div>
        {showText && (
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">{text}</p>
        )}
      </div>
    </div>
  );
}

export default Loader;
