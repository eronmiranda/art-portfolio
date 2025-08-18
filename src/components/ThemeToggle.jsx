import { useTheme } from "../contexts/ThemeContext";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";

function ThemeToggle() {
  const [theme, toggleTheme] = useTheme();
  return (
    <div className="pointer-events-auto transition active:translate-y-1">
      <button
        onClick={toggleTheme}
        className="group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        aria-label={
          theme === "dark" ? "Switch to dark theme" : "Switch to light theme"
        }
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
}

export default ThemeToggle;
