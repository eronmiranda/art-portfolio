import { motion } from "motion/react";

function MotionDiv({ children, ...props }) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
}

function MotionImg({ ...props }) {
  return <motion.img {...props} />;
}

function MotionSpan({ children, ...props }) {
  return (
    <motion.span {...props}>
      {children}
    </motion.span>
  );
}

export { MotionDiv, MotionImg, MotionSpan };
