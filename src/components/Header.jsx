import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";
import NavMenu from "./NavMenu";
import NavBar from "./NavBar";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur">
      <div className="mb-2 h-16 pt-6">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="relative flex gap-4">
            {/* Logo */}
            <div className="flex flex-1">
              <div className="bg-white-90 flex size-10 items-center justify-center rounded-full p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition delay-65 hover:scale-130 active:translate-y-2 dark:bg-zinc-800/90 dark:ring-white/10">
                <Link to="/" className="pointer-events-auto" aria-label="Home">
                  <LazyImage
                    src="/assets/dogs/morty.png"
                    alt="logo"
                    fetchPriority="high"
                    className="h-full w-full rounded-full bg-zinc-100 object-cover"
                  />
                </Link>
              </div>
            </div>
            {/* Navigation */}
            <div className="flex flex-1 justify-end md:justify-center">
              {/* Mobile */}
              <NavMenu />
              {/* Desktop */}
              <NavBar />
            </div>
            {/* light/dark mode toggle */}
            <div className="flex justify-end md:flex-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
