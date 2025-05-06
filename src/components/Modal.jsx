import { useEffect } from "react";
import { motion } from "motion/react";

export default function Modal({ selectedImg, setSelectedImg, layoutId }) {
  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      setSelectedImg(null);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setSelectedImg(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSelectedImg]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleClick}
    >
      <motion.img
        src={selectedImg}
        alt=""
        layoutId={layoutId}
        className="max-h-[80vh] max-w-[80vw] rounded-lg shadow-xl"
        draggable={false}
        onContextMenu={event => event.preventDefault()}
      />
    </motion.div>
  );
}
