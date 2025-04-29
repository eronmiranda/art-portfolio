import { useEffect } from "react";
import { motion } from "motion/react";

export default function Modal({ selectedImg, setSelectedImg }) {
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
      className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg}
        alt="enlarged pic"
        className="block max-w-[90%] max-h-[90%] my-16 mx-auto shadow-lg bg-white"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </motion.div>
  );
}
