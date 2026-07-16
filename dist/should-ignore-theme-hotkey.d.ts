/**
 * Returns true when a global theme shortcut should not run (e.g. typing in a field).
 *
 * @param target - `Event.target` from `keydown`
 */
export declare function shouldIgnoreThemeHotkey(target: EventTarget | null): boolean;
