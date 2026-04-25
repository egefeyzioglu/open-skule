"use client";

import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "src/components/ui/button";
import { cn } from "src/lib/utils";

const THEME_STORAGE_KEY = "open-skule-theme";

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
}

type ThemeToggleProps = {
  mode?: "icon" | "text";
  className?: string;
};

export default function ThemeToggle({
  mode = "icon",
  className,
}: ThemeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme ?? "dark";

    applyTheme(initialTheme === "dark");
    setIsDarkMode(initialTheme === "dark");
    setIsMounted(true);
  }, []);

  function handleThemeChange(checked: boolean) {
    setIsDarkMode(checked);
    applyTheme(checked);
    window.localStorage.setItem(THEME_STORAGE_KEY, checked ? "dark" : "light");
  }

  return (
    <Button
      type="button"
      variant={mode === "text" ? "ghost" : "outline"}
      size={mode === "text" ? "default" : "icon"}
      className={cn("cursor-pointer w-[40px] h-[40px]", className)}
      aria-label="Toggle dark mode"
      onClick={() => handleThemeChange(!(isMounted ? isDarkMode : false))}
    >
      {mode === "text" ? (
        <span>
          {isMounted && isDarkMode
            ? "Switch to light mode"
            : "Switch to dark mode"}
        </span>
      ) : isMounted && isDarkMode ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <MoonStar className="size-4" aria-hidden="true" />
      )}
    </Button>
  );
}
