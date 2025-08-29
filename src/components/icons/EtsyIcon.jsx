import { cx } from "../../lib/utils";

function EtsyIcon({ className = "w-6 h-6" }) {
  return (
    <span
      className={cx(
        "mr-1 text-base font-bold transition-colors duration-200",
        "text-current", // Uses the parent's text color (neutral by default)
        className,
      )}
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      Etsy
    </span>
  );
}

export default EtsyIcon;
