// Tremor Badge [v1.0.0]

import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { cx } from "../../lib/utils";

const badgeVariants = tv({
  base: cx(
    "inline-flex items-center gap-x-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap ring-1 ring-inset",
  ),
  variants: {
    variant: {
      default: [
        "bg-blue-50 text-blue-900 ring-blue-500/30",
        "dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
      ],
      neutral: [
        "bg-gray-50 text-gray-900 ring-gray-500/30",
        "dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/20",
      ],
      success: [
        "bg-emerald-50 text-emerald-900 ring-emerald-600/30",
        "dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20",
      ],
      error: [
        "bg-red-50 text-red-900 ring-red-600/20",
        "dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
      ],
      warning: [
        "bg-yellow-50 text-yellow-900 ring-yellow-600/30",
        "dark:bg-yellow-400/10 dark:text-yellow-500 dark:ring-yellow-400/20",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const Badge = forwardRef(({ className, variant, ...props }, forwardedRef) => {
  return (
    <span
      ref={forwardedRef}
      className={cx(badgeVariants({ variant }), className)}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

const BadgeDismiss = forwardRef(
  ({ children, onDismiss, className, ...props }, forwardedRef) => {
    return (
      <Badge ref={forwardedRef} className={cx("me-2", className)} {...props}>
        {children}
        <button
          type="button"
          className="ms-2 inline-flex items-center rounded-xs bg-transparent p-1 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
          aria-label="Remove"
          onClick={onDismiss}
        >
          <svg
            className="h-2 w-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Remove badge</span>
        </button>
      </Badge>
    );
  },
);

BadgeDismiss.displayName = "BadgeDismiss";

export { Badge, badgeVariants, BadgeDismiss };
