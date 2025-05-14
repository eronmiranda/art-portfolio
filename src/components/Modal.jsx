import { useEffect } from "react";
import { cx } from "../lib/utils";

function Modal({ onClose, className, children }) {
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
        "fixed inset-0 z-50 flex items-center justify-center bg-black/60",
        className,
      )}
      onClick={onClose}
    >
      {children}
    </div>
  );
}

export default Modal;
