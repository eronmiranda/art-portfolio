import { useState } from "react";
import { routes } from "../resources/config";
import Modal from "./Modal";
import { Link, useLocation } from "react-router-dom";

function DownArrowIcon() {
  return (
    <svg
      viewBox="0 0 8 6"
      aria-hidden="true"
      className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
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

function CrossIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
    >
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ModalMenu({ open, onClose }) {
  const location = useLocation();
  const handleCloseButtonClick = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className="items-start pt-6">
      <div className="w-[90vw] rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 dark:bg-zinc-900 dark:ring-zinc-800">
        <div className="flex flex-row-reverse items-center justify-between">
          <button
            aria-label="Close menu"
            className="-m-1 p-1"
            onClick={handleCloseButtonClick}
          >
            <CrossIcon />
          </button>
          <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Navigation
          </h2>
        </div>
        <nav className="mt-6">
          <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
            <li key="home" className="relative" onClick={onClose}>
              <Link
                to="/"
                className="block py-2"
                aria-label="Home"
                aria-current={location.pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            {routes.map(
              ({ isEnabled, to, label }) =>
                isEnabled && (
                  <li key={to} className="relative" onClick={onClose}>
                    <Link
                      to={to}
                      className="block py-2"
                      aria-label={label}
                      aria-current={
                        location.pathname === to ? "page" : undefined
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </nav>
      </div>
    </Modal>
  );
}

function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenuClick = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };
  return (
    <div className="pointer-events-auto md:hidden">
      <button
        className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
        onClick={handleMenuClick}
      >
        <span className="flex-1 text-left">Menu</span>
        <DownArrowIcon />
      </button>
      <ModalMenu open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export default NavMenu;
