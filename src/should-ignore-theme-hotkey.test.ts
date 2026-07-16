/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { shouldIgnoreThemeHotkey } from "./should-ignore-theme-hotkey.js";

describe("shouldIgnoreThemeHotkey", () => {
  it("returns false for body", () => {
    expect(shouldIgnoreThemeHotkey(document.body)).toBe(false);
  });

  it("returns true for input", () => {
    const input = document.createElement("input");
    expect(shouldIgnoreThemeHotkey(input)).toBe(true);
  });

  it("returns true for textarea", () => {
    const ta = document.createElement("textarea");
    expect(shouldIgnoreThemeHotkey(ta)).toBe(true);
  });

  it("returns true for select", () => {
    const sel = document.createElement("select");
    expect(shouldIgnoreThemeHotkey(sel)).toBe(true);
  });

  it("returns true for contenteditable host", () => {
    const el = document.createElement("div");
    el.setAttribute("contenteditable", "true");
    expect(shouldIgnoreThemeHotkey(el)).toBe(true);
  });

  it("returns true when target is inside contenteditable", () => {
    const host = document.createElement("div");
    host.setAttribute("contenteditable", "true");
    const span = document.createElement("span");
    host.appendChild(span);
    expect(shouldIgnoreThemeHotkey(span)).toBe(true);
  });
});
