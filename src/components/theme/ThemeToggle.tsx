"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-red-300
          bg-white/80
          text-red-700
          shadow-sm
          dark:border-red-400/40
          dark:bg-red-950/60
          dark:text-red-100
        "
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        relative
        flex h-10 w-10
        items-center justify-center
        rounded-xl
        border
        border-red-300
        bg-white
        text-red-700
        shadow-sm
        transition-all
        duration-200
        hover:scale-105
        hover:bg-red-50
        hover:text-red-800
        active:scale-95

        dark:border-red-400/40
        dark:bg-red-950
        dark:text-red-100
        dark:hover:bg-red-900
      "
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}