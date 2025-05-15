import { routes } from "../resources/config";
import { cx } from "../lib/utils";
import { MotionSpan } from "./Motion";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  return (
    <nav
      className="pointer-events-auto hidden md:block"
      aria-label="Main navigation"
    >
      <ul className="md:text-md relative flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {routes.map(
          ({ isEnabled, to, label }) =>
            isEnabled && (
              <li key={to} className="relative">
                <Link
                  to={to}
                  className={cx(
                    "relative z-10 block px-3.5 py-2 transition",
                    location.pathname === to
                      ? "font-semibold text-teal-500"
                      : "text-zinc-800 dark:text-zinc-100",
                  )}
                  aria-label={label}
                  aria-current={location.pathname === to ? "page" : undefined}
                >
                  {label}
                  {location.pathname === to && (
                    <MotionSpan
                      className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0"
                      layoutId="tab-active-underline"
                      transition={{
                        type: "tween",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            ),
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
