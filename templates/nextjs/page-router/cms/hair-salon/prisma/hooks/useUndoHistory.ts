import { useState, useCallback, useRef } from "react";

/**
 * Manages an undo stack for any state value.
 * Each call to `set` pushes the previous value onto the history stack.
 * `undo` pops the most recent previous value and restores it.
 */
export function useUndoHistory<T>(initialValue: T, maxHistory = 50) {
  const [value, setValue] = useState<T>(initialValue);
  const historyRef = useRef<T[]>([]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        if (JSON.stringify(prev) !== JSON.stringify(resolved)) {
          historyRef.current = [
            ...historyRef.current.slice(-maxHistory + 1),
            prev,
          ];
        }
        return resolved;
      });
    },
    [maxHistory]
  );

  const undo = useCallback(() => {
    if (historyRef.current.length === 0) return;
    const previous = historyRef.current[historyRef.current.length - 1];
    historyRef.current = historyRef.current.slice(0, -1);
    setValue(previous);
  }, []);

  const canUndo = historyRef.current.length > 0;

  return { value, set, undo, canUndo };
}
