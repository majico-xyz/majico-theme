/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  applyAppTheme,
  readAppThemeFromDom,
  readStoredAppTheme,
  syncAppThemeFromStorage,
} from "./apply-app-theme.js";
import { MAJICO_THEME_STORAGE_KEY } from "./storage-key.js";

describe("applyAppTheme", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-theme", "light");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("syncAppThemeFromStorage applies stored preference to html", () => {
    const storage = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
    });
    document.documentElement.removeAttribute("data-theme");
    storage.set(MAJICO_THEME_STORAGE_KEY, "dark");

    expect(syncAppThemeFromStorage()).toBe("dark");
    expect(readAppThemeFromDom()).toBe("dark");
    expect(readStoredAppTheme()).toBe("dark");
  });

  it("applyAppTheme writes html and storage", () => {
    const storage = new Map<string, string>();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => {
        storage.set(key, value);
      },
    });

    applyAppTheme("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(storage.get(MAJICO_THEME_STORAGE_KEY)).toBe("light");
  });
});
