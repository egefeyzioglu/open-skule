"use client";

import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "src/components/ui/button";

const THEME_STORAGE_KEY = "open-skule-theme";

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme = storedTheme ?? getSystemTheme();

    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setIsDarkMode(initialTheme === "dark");
    setIsMounted(true);
  }, []);

  function handleThemeChange(checked: boolean) {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
    window.localStorage.setItem(THEME_STORAGE_KEY, checked ? "dark" : "light");
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-10 w-10 cursor-pointer"
      aria-label="Toggle dark mode"
      onClick={() => handleThemeChange(!(isMounted ? isDarkMode : false))}
    >
      {isMounted && isDarkMode ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <MoonStar className="size-4" aria-hidden="true" />
      )}
    </Button>
  );
}
