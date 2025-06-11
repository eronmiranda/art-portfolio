import { Toaster as Sonner } from "sonner";
import { useTheme } from "../contexts/ThemeContext";

const toasterStyles = {
  light: {
    toast: "!bg-zinc-100",
    success: "!text-green-900",
    error: "!text-red-900",
  },
  dark: {
    toast: "!bg-zinc-800",
    success: "!text-green-200",
    error: "!text-red-200",
  },
};

export default function Toaster() {
  const [theme] = useTheme();
  console.log(theme);
  return (
    <Sonner
      theme={theme}
      position="top-right"
      toastOptions={{
        classNames: toasterStyles[theme],
      }}
    />
  );
}
