import { cx } from "../lib/utils";

export default function FormCard({ className, children, ...props }) {
  return (
    <div
      className={cx(
        // base
        "relative w-full rounded-lg border p-6 text-left shadow-xs",
        // background color
        "bg-white dark:bg-zinc-800",
        // border color
        "border-zinc-200 dark:border-zinc-900",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
