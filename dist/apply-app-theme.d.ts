export type AppColorScheme = "light" | "dark";
/** Reads the active theme from `<html>` (defaults to light when unset). */
export declare function readAppThemeFromDom(): AppColorScheme;
/** Reads persisted theme preference when available (client only). */
export declare function readStoredAppTheme(): AppColorScheme | null;
/**
 * Ensures `<html data-theme>` matches localStorage (or light default).
 * Call once on the client after hydration to recover from partial updates.
 */
export declare function syncAppThemeFromStorage(): AppColorScheme;
/** Persist and apply light/dark on `<html>` (shared by ThemeProvider and landing). */
export declare function applyAppTheme(next: AppColorScheme): void;
