import { Link, useLocation } from "react-router-dom";
import { routes } from "../resources/config";
import { MotionDiv, MotionSpan } from "./Motion";
import useTheme from "../hooks/useTheme";
import LazyImage from "./LazyImage";

function Header() {
  const location = useLocation();
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-zinc-100 backdrop-blur dark:bg-zinc-900">
      <div className="mb-2 h-16 pt-6">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex flex-1">
              <MotionDiv
                className="bg-white-90 flex size-10 items-center justify-center rounded-full p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10"
                whileHover={{ scale: 1.3 }}
              >
                <Link to="/" className="pointer-events-auto" aria-label="Home">
                  <LazyImage
                    src="/assets/dogs/morty.png"
                    alt="logo"
                    fetchPriority="high"
                    className="h-full w-full rounded-full bg-zinc-100 object-cover"
                  />
                </Link>
              </MotionDiv>
            </div>
            {/* Navigation */}
            <div className="flex flex-1 justify-end md:justify-center">
              <nav
                className="pointer-events-auto md:block"
                aria-label="Main navigation"
              >
                <ul className="md:text-md relative flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                  {routes.map(
                    ({ isEnabled, to, label }) =>
                      isEnabled && (
                        <li key={to} className="relative">
                          <Link
                            to={to}
                            className={`relative z-10 block px-3.5 py-2 transition ${
                              location.pathname === to
                                ? "font-semibold text-teal-500"
                                : "text-zinc-800 dark:text-zinc-100"
                            } hover:text-teal-500`}
                            aria-label={label}
                            aria-current={
                              location.pathname === to ? "page" : undefined
                            }
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
            </div>
            {/* light/dark mode toggle */}
            <div className="flex flex-1 justify-end">
              <MotionDiv className="pointer-events-auto" whileTap={{ y: 4 }}>
                <button
                  onClick={toggleTheme}
                  className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                  aria-label={
                    theme === "dark"
                      ? "Switch to dark theme"
                      : "Switch to light theme"
                  }
                >
                  {theme === "dark" ? (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400"
                    >
                      <path
                        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
                    >
                      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
                      <path
                        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
                        fill="none"
                      />
                    </svg>
                  )}
                </button>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
