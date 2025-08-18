import { cx } from "../../lib/utils";

export default function DownArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 8 6"
      aria-hidden="true"
      className={cx(
        "ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400",
        className,
      )}
    >
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
