import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const location = useLocation();

  // Memoize the navigation links
  const memoizedNavLinks = useMemo(() => navLinks, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="h-16 pt-6 mb-2">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex flex-1">
              <div className="size-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm flex items-center justify-center">
                <Link
                  to="/"
                  className="pointer-events-auto"
                  aria-label="Home"
                >
                  <img 
                    className="rounded-full bg-zinc-100 h-full w-full object-cover" 
                    alt="logo" 
                    fetchPriority="high"
                    src="/src/assets/dogs/morty.png"
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>
            {/* Navigation */}
            <div className="flex flex-1 justify-end md:justify-center">
              <nav 
                className="pointer-events-auto md:block"
                aria-label="Main navigation"  
              >
                <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm">
                  {memoizedNavLinks.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="block px-3 py-2 transition hover:text-teal-500"
                        aria-current={location.pathname === to ? 'page' : undefined}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
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
