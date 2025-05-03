import { useEffect } from "react";
import { motion } from "motion/react";

export default function Modal({ selectedImg, setSelectedImg, originRect }) {
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

  const initial = originRect
    ? {
        opacity: 1,
        scale: 1,
        x: originRect.left + originRect.width / 2 - window.innerWidth / 2,
        y: originRect.top + originRect.height / 2 - window.innerHeight / 2,
        width: originRect.width,
        height: originRect.height,
      }
    : { opacity: 0, scale: 0 };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        className="mx-auto my-16 block max-h-[90%] max-w-[90%] bg-white shadow-lg"
        initial={initial}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          width: "auto",
          height: "auto",
        }}
        exit={initial}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      />
    </motion.div>
  );
}
