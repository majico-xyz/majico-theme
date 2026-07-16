import { MARKETING_LANDING_PATHS } from "@majico-xyz/landing";
import { MAJICO_THEME_STORAGE_KEY } from "./storage-key.js";

/**
 * Inline (blocking) script for `<head>`: sets `data-theme` on `<html>` before paint to avoid flash.
 * Must stay in sync with {@link MAJICO_THEME_STORAGE_KEY} and theme resolution in the app.
 */
export function getThemeBootScript(): string {
  const k = JSON.stringify(MAJICO_THEME_STORAGE_KEY);
  const marketingPaths = JSON.stringify([...MARKETING_LANDING_PATHS]);
  return `(function(){try{var k=${k};var s=localStorage.getItem(k);var t=(s==="light"||s==="dark")?s:"light";var ml=${marketingPaths};var onMarketing=ml.indexOf(location.pathname)!==-1;if(onMarketing){document.documentElement.setAttribute("data-marketing-landing","");}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;
}
