/**
 * Inline (blocking) script for `<head>`: sets `data-theme` on `<html>` before paint to avoid flash.
 * Must stay in sync with {@link MAJICO_THEME_STORAGE_KEY} and theme resolution in the app.
 */
export declare function getThemeBootScript(): string;
