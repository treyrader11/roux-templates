import { useCallback, useEffect, useState } from "react";

/**
 * Minimal client CRUD helper against a REST endpoint that exposes:
 *   GET  {base}        -> T[]
 *   POST {base}        -> T
 *   PUT  {base}/{id}   -> T
 *   DELETE {base}/{id} -> { ok }
 */
export function useCrud<T extends { id: string }>(base: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(base);
      if (!res.ok) throw new Error();
      setItems(await res.json());
    } catch {
      setError("Failed to load items.");
    } finally {
      setLoading(false);
    }
  }, [base]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (data: Partial<T>) => {
      const res = await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Create failed");
      await load();
    },
    [base, load]
  );

  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      const res = await fetch(`${base}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Update failed");
      await load();
    },
    [base, load]
  );

  const remove = useCallback(
    async (id: string) => {
      const res = await fetch(`${base}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await load();
    },
    [base, load]
  );

  return { items, loading, error, create, update, remove, reload: load };
}
