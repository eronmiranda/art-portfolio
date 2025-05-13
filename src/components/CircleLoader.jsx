import { MotionSpan } from "./Motion";
import { cx } from "../lib/utils";

export default function CircleLoader({ className }) {
  return (
    <div className={cx("flex items-center justify-center", className)}>
      <div className="relative box-border size-12">
        <MotionSpan
          className="absolute top-0 left-0 box-border block size-9 rounded-full border-5 border-solid border-[#e9e9e9] border-t-teal-500"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration: 1,
          }}
        />
      </div>
    </div>
  );
}
