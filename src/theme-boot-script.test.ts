import { describe, expect, it } from "vitest";
import { MAJICO_THEME_STORAGE_KEY } from "./storage-key.js";
import { getThemeBootScript } from "./theme-boot-script.js";

describe("getThemeBootScript", () => {
  it("embeds the storage key and sets data-theme", () => {
    const s = getThemeBootScript();
    expect(s).toContain(JSON.stringify(MAJICO_THEME_STORAGE_KEY));
    expect(s).toContain("setAttribute");
    expect(s).toContain("data-theme");
  });

  it("sets data-marketing-landing on marketing landing paths before paint", () => {
    const s = getThemeBootScript();
    expect(s).toContain("data-marketing-landing");
    expect(s).toContain('"/concepts/landing-figma"');
  });

  it("reads stored theme on marketing landing instead of forcing light", () => {
    const s = getThemeBootScript();
    expect(s).toMatch(
      /onMarketing[\s\S]*setAttribute\("data-marketing-landing"[\s\S]*setAttribute\("data-theme",t\)/
    );
    expect(s).not.toMatch(
      /onMarketing[\s\S]*setAttribute\("data-theme","light"\)[\s\S]*return;/
    );
  });

  it("defaults to light when storage is missing", () => {
    const s = getThemeBootScript();
    expect(s).toContain('t=(s==="light"||s==="dark")?s:"light"');
    expect(s).not.toContain("prefers-color-scheme");
  });
});
