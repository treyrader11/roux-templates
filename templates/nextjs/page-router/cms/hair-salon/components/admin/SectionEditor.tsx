import { cn } from "@/lib/utils";
import { Check, ExternalLink } from "lucide-react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSaveShortcut, useUndoShortcut } from "@/hooks/useKeyPress";
import { useUndoHistory } from "@/hooks/useUndoHistory";
import Link from "next/link";

type SectionEditorProps<T> = {
  slug: string;
  initialData: T;
  previewHref?: string;
  children: (props: {
    data: T;
    update: (field: keyof T, value: T[keyof T]) => void;
    updateNested: (path: string, value: unknown) => void;
    save: () => Promise<void>;
    markChanged: () => void;
    inputStyles: string;
  }) => React.ReactNode;
};

export default function SectionEditor<T extends Record<string, unknown>>({
  slug,
  initialData,
  previewHref,
  children,
}: SectionEditorProps<T>) {
  const { value: data, set: setData, undo } = useUndoHistory<T>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanged, setHasChanged] = useState(false);

  const update = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setSaved(false);
    },
    [setData]
  );

  const updateNested = useCallback(
    (path: string, value: unknown) => {
      setData((prev) => {
        const next = JSON.parse(JSON.stringify(prev));
        const keys = path.split(".");
        let obj = next;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return next;
      });
      setSaved(false);
    },
    [setData]
  );

  const handleUndo = useCallback(() => {
    undo();
    setSaved(false);
  }, [undo]);

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: JSON.stringify(data) }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setHasChanged(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [slug, data]);

  const markChanged = useCallback(() => setHasChanged(true), []);

  useSaveShortcut(save);
  useUndoShortcut(handleUndo);

  const inputStyles = cn(
    "w-full px-4 py-3 rounded-xl bg-background border border-border",
    "text-foreground text-base outline-none transition-colors duration-200",
    "focus:border-brand placeholder:text-muted-foreground"
  );

  return (
    <>
      <div className="p-6 rounded-2xl space-y-6 bg-card border border-border">
        {children({ data, update, updateNested, save, markChanged, inputStyles })}

        <div className="flex items-center gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={save}
            disabled={saving}
            className={cn(
              "gradient-button px-6 py-2.5 text-sm font-medium cursor-pointer",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-emerald-500 text-sm"
              >
                <Check size={16} />
                Saved
              </motion.span>
            )}
          </AnimatePresence>
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
      </div>

      {previewHref && (
        <AnimatePresence>
          {hasChanged && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Link
                href={previewHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-3 rounded-full",
                  "bg-card border border-border shadow-lg",
                  "text-brand text-sm font-medium",
                  "hover:border-brand/40 transition-all duration-200"
                )}
              >
                Preview page
                <ExternalLink size={15} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
