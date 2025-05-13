import { motion } from "motion/react";

function LazyImage({ ...props }) {
  return (
    <motion.img
      {...props}
      loading="lazy"
      decoding="async"
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
}

export default LazyImage;
