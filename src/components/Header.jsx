import { Link, useLocation } from "react-router-dom";
import { routes } from "../resources/config";
import { motion } from "motion/react";

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-transparent sticky top-0 z-50 backdrop-blur">
      <div className="mb-2 h-16 pt-6">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex flex-1">
              <motion.div 
                className="flex size-10 items-center justify-center rounded-full bg-zinc-100 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm" 
                whileHover={{ scale: 1.3 }}
              >
                <Link to="/" className="pointer-events-auto" aria-label="Home">
                  <img
                    className="h-full w-full rounded-full bg-zinc-100 object-cover"
                    alt="logo"
                    fetchPriority="high"
                    src="/assets/dogs/morty.png"
                    loading="lazy"
                  />
                </Link>
              </motion.div>
            </div>
            {/* Navigation */}
            <div className="flex flex-1 justify-end md:justify-center">
              <nav
                className="pointer-events-auto md:block"
                aria-label="Main navigation"
              >
                <ul className="relative flex rounded-full px-3 bg-white/90 text-sm md:text-md font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm">
                  {routes.map(
                    ({ isEnabled, to, label }) =>
                      isEnabled && (
                        <li key={to} className="relative">
                          <Link
                            to={to}
                            className={`relative z-10 block px-3.5 py-2 transition ${
                              location.pathname === to
                                ? "font-semibold text-teal-500"
                                : "text-zinc-800"
                            } hover:text-teal-500`}
                            aria-label={label}
                            aria-current={
                              location.pathname === to ? "page" : undefined
                            }
                          >
                            {label}
                            {location.pathname === to && (
                              <motion.span 
                                className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 " 
                                layoutId="tab-active-underline"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                          </Link>
                        </li>
                      ),
                  )}
                </ul>
              </nav>
            </div>
            {/* Future light/dark mode toggle */}
            <div className="flex justify-end md:flex-1"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
