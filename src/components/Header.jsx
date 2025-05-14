import { Link } from "react-router-dom";
import { MotionDiv } from "./Motion";
import LazyImage from "./LazyImage";
import NavBar from "./NavBar";
import ThemeToggle from "./ThemeToggle";

function Header() {
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
              <NavBar />
            </div>
            {/* light/dark mode toggle */}
            <div className="flex flex-1 justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
