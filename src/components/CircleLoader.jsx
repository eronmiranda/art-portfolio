import { cx } from "../lib/utils";
const SIZE_DEFAULT = 12;
export default function CircleLoader({ size = SIZE_DEFAULT, className }) {
  return (
    <div className={cx("flex items-center justify-center", className)}>
      <div className="relative box-border size-12">
        <span className="inline-flex text-teal-500 dark:text-teal-700">
          <svg
            width={size}
            height={size}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth={(SIZE_DEFAULT / size) * 2}
            xmlns="http://www.w3.org/2000/svg"
            className="animate-rotate-pulse"
          >
            <path d="M11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11" />
          </svg>
        </span>
      </div>
    </div>
  );
}
