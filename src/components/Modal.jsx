import { useState, useEffect, useCallback } from "react";
import { cx } from "../lib/utils";

function Modal({ onClose, className, children }) {
  const [open, setOpen] = useState(false);

  // Trigger open animation after mount
  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 100);
    return () => clearTimeout(id);
  }, []);

  //match duration-200 before unmounting
  const handleClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cx(
          "fixed inset-0 min-h-screen bg-black/60 transition-opacity",
          className,
          open
            ? "opacity-100 duration-300 ease-out"
            : "pointer-events-none opacity-0 duration-200 ease-in",
        )}
        aria-hidden="true"
        onClick={handleClose}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
