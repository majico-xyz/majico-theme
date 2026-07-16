/**
 * Returns true when a global theme shortcut should not run (e.g. typing in a field).
 *
 * @param target - `Event.target` from `keydown`
 */
export function shouldIgnoreThemeHotkey(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return Boolean(
    target.closest('[contenteditable="true"],[contenteditable=""]')
  );
}
