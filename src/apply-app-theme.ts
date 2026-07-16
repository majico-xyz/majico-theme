import { MAJICO_THEME_STORAGE_KEY } from "./storage-key.js";

export type AppColorScheme = "light" | "dark";

/** Reads the active theme from `<html>` (defaults to light when unset). */
export function readAppThemeFromDom(): AppColorScheme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** Reads persisted theme preference when available (client only). */
export function readStoredAppTheme(): AppColorScheme | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(MAJICO_THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* private mode */
  }
  return null;
}

/**
 * Ensures `<html data-theme>` matches localStorage (or light default).
 * Call once on the client after hydration to recover from partial updates.
 */
export function syncAppThemeFromStorage(): AppColorScheme {
  const stored = readStoredAppTheme();
  const next = stored ?? readAppThemeFromDom();
  applyAppTheme(next);
  return next;
}

/** Persist and apply light/dark on `<html>` (shared by ThemeProvider and landing). */
export function applyAppTheme(next: AppColorScheme): void {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(MAJICO_THEME_STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
}
