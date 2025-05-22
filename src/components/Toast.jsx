import { useEffect } from "react";
import { cx } from "../lib/utils";

export default function Toast({ variant = "default", text, open, onClose }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cx(
        "animate-fade-in fixed top-6 left-1/2 z-50 flex max-w-md min-w-[250px] -translate-x-1/2 items-center gap-2 rounded-md px-6 py-4 text-center shadow-lg",
        variant === "danger" && "border border-red-300 bg-red-100 text-red-700",
        variant === "success" &&
          "border border-green-300 bg-green-100 text-green-700",
        variant === "default" &&
          "border border-gray-300 bg-gray-100 text-gray-700",
      )}
      role="alert"
    >
      <span className="flex-1">{text}</span>
    </div>
  );
}
