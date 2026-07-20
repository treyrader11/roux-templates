import { useEffect } from "react";

export type KeyOptions = {
  preventDefault?: boolean;
};

const normalizeKey = (key: string) => key?.toLowerCase();

/**
 * Combo hook for shortcuts like ⌘+S / Ctrl+S.
 */
export function useKeyPressCombo(
  callback: () => void,
  keys: string[] | string[][],
  options?: KeyOptions
): void {
  useEffect(() => {
    const combos: string[][] = Array.isArray((keys as unknown[])[0])
      ? (keys as string[][]).map((combo) => combo.map(normalizeKey))
      : [(keys as string[]).map(normalizeKey)];

    const pressed = new Set<string>();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const key = normalizeKey(e.key);
      pressed.add(key);

      if (e.metaKey) pressed.add("meta");
      if (e.ctrlKey) pressed.add("control");
      if (e.shiftKey) pressed.add("shift");
      if (e.altKey) pressed.add("alt");

      const matchesCombo = combos.some((combo) =>
        combo.every((k) => pressed.has(k))
      );

      if (!matchesCombo) return;

      if (options?.preventDefault) {
        e.preventDefault();
      }

      callback();
    };

    const handleKeyUp = () => {
      pressed.clear();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [callback, options?.preventDefault, keys]);
}

/** Cross-platform save shortcut: ⌘+S on Mac, Ctrl+S on Windows/Linux. */
export function useSaveShortcut(callback: () => void): void {
  useKeyPressCombo(
    callback,
    [
      ["meta", "s"],
      ["control", "s"],
    ],
    { preventDefault: true }
  );
}

/** Cross-platform undo shortcut: ⌘+Z on Mac, Ctrl+Z on Windows/Linux. */
export function useUndoShortcut(callback: () => void): void {
  useKeyPressCombo(
    callback,
    [
      ["meta", "z"],
      ["control", "z"],
    ],
    { preventDefault: true }
  );
}
