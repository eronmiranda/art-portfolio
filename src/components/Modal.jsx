import { useEffect } from "react";
import { cx } from "../lib/utils";

function Modal({ open, onClose, children }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className={cx(
        "fixed inset-0 flex items-center justify-center transition-opacity",
        open
          ? "transition-300 visible bg-black/60 opacity-100 ease-out"
          : "invisible opacity-0 duration-200 ease-in",
      )}
      aria-hidden="true"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={cx(
          "rounded-lg p-6 shadow transition-all",
          open
            ? "tranlsate-y-0 opacity-100 duration-300 ease-out sm:scale-100"
            : "translate-y-4 opacity-0 duration-200 ease-in sm:translate-y-0 sm:scale-95",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
