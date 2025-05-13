import { MotionDiv, MotionLink } from "./Motion";
import { cx } from "../lib/utils";

function CTAButton({ children, href, className }) {
  return (
    <MotionDiv whileTap={{ y: 4 }}>
      <MotionLink
        href={href}
        className={cx(
          "inline-block animate-pulse rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-teal-600 hover:to-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2",
          className,
        )}
      >
        {children}
      </MotionLink>
    </MotionDiv>
  );
}

export default CTAButton;
