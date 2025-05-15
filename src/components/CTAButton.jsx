import { MotionDiv } from "./Motion";
import { cx } from "../lib/utils";
import { Link } from "react-router-dom";

function CTAButton({ children, to, className }) {
  return (
    <MotionDiv whileTap={{ y: 4 }}>
      <Link
        to={to}
        className={cx(
          "inline-block animate-pulse rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-teal-600 hover:to-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2",
          className,
        )}
      >
        {children}
      </Link>
    </MotionDiv>
  );
}

export default CTAButton;
