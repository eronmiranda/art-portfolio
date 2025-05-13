import { motion, AnimatePresence } from "motion/react";

function MotionDiv({ children, ...props }) {
  return <motion.div {...props}>{children}</motion.div>;
}

function MotionImg({ ...props }) {
  return <motion.img {...props} />;
}

function MotionSpan({ children, ...props }) {
  return <motion.span {...props}>{children}</motion.span>;
}

function MotionPresence({ children, ...props }) {
  return <AnimatePresence {...props}>{children}</AnimatePresence>;
}
function MotionLink({ children, ...props }) {
  return <motion.a {...props}>{children}</motion.a>;
}

export { MotionDiv, MotionImg, MotionSpan, MotionPresence, MotionLink };
