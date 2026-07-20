import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { type Area } from "react-easy-crop";
import {
  UploadCloud,
  X,
  Crop as CropIcon,
  Check,
  Loader2,
  ImagePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getCroppedBlob } from "@/lib/crop-image";
import { uploadImage, type UploadedImage } from "@/lib/upload-image";

type Status = "idle" | "uploading" | "done" | "error";

type Staged = {
  id: string;
  name: string;
  blob: Blob;
  previewUrl: string;
  status: Status;
};

interface ImageDropzoneProps {
  /** Cloudinary folder uploads land in. */
  folder: string;
  /** Crop aspect ratio when the optional per-image crop is used. */
  aspect?: number;
  /** Button label that opens the modal. */
  triggerLabel?: string;
  /** Called with every successfully uploaded image once the batch completes. */
  onUploaded: (images: UploadedImage[]) => Promise<void> | void;
}

export default function ImageDropzone({
  folder,
  aspect = 1,
  triggerLabel = "Upload images",
  onUploaded,
}: ImageDropzoneProps) {
  const [open, setOpen] = useState(false);
  const [staged, setStaged] = useState<Staged[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cropping state — the staged item currently being cropped, if any.
  const [cropId, setCropId] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pixels, setPixels] = useState<Area | null>(null);

  // Track object URLs so we can revoke them and avoid leaks.
  const urls = useRef<Set<string>>(new Set());
  const track = (url: string) => {
    urls.current.add(url);
    return url;
  };
  const revoke = (url: string) => {
    URL.revokeObjectURL(url);
    urls.current.delete(url);
  };

  useEffect(() => {
    const set = urls.current;
    return () => set.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const addFiles = useCallback((files: File[]) => {
    const next = files
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => {
        const previewUrl = URL.createObjectURL(f);
        urls.current.add(previewUrl);
        return {
          id: crypto.randomUUID(),
          name: f.name,
          blob: f as Blob,
          previewUrl,
          status: "idle" as Status,
        };
      });
    if (next.length) setStaged((prev) => [...prev, ...next]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open: openFileDialog } =
    useDropzone({
      onDrop: addFiles,
      accept: { "image/*": [] },
      multiple: true,
      noClick: true,
    });

  function reset() {
    staged.forEach((s) => revoke(s.previewUrl));
    setStaged([]);
    setError(null);
    setCropId(null);
    setBusy(false);
  }

  function close() {
    reset();
    setOpen(false);
  }

  function removeStaged(id: string) {
    setStaged((prev) => {
      const item = prev.find((s) => s.id === id);
      if (item) revoke(item.previewUrl);
      return prev.filter((s) => s.id !== id);
    });
  }

  function startCrop(id: string) {
    setCropId(id);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setPixels(null);
  }

  const croppingItem = staged.find((s) => s.id === cropId) ?? null;

  async function confirmCrop() {
    if (!croppingItem || !pixels) return;
    setBusy(true);
    setError(null);
    try {
      const blob = await getCroppedBlob(croppingItem.previewUrl, pixels);
      const previewUrl = track(URL.createObjectURL(blob));
      setStaged((prev) =>
        prev.map((s) => {
          if (s.id !== croppingItem.id) return s;
          revoke(s.previewUrl);
          return { ...s, blob, previewUrl, status: "idle" };
        })
      );
      setCropId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not crop the image");
    } finally {
      setBusy(false);
    }
  }

  async function uploadAll() {
    if (!staged.length) return;
    setBusy(true);
    setError(null);
    const uploaded: UploadedImage[] = [];
    for (const item of staged) {
      setStaged((prev) =>
        prev.map((s) => (s.id === item.id ? { ...s, status: "uploading" } : s))
      );
      try {
        const result = await uploadImage(item.blob, folder);
        uploaded.push(result);
        setStaged((prev) =>
          prev.map((s) => (s.id === item.id ? { ...s, status: "done" } : s))
        );
      } catch {
        setStaged((prev) =>
          prev.map((s) => (s.id === item.id ? { ...s, status: "error" } : s))
        );
      }
    }

    if (uploaded.length) {
      try {
        await onUploaded(uploaded);
      } catch {
        setError("Uploaded, but saving the collection failed. Please reload.");
      }
    }

    setBusy(false);
    if (uploaded.length === staged.length) close();
    else setError((e) => e ?? "Some images failed to upload. Remove and retry.");
  }

  const cardStyles =
    "w-full max-w-3xl rounded-2xl border border-border bg-card shadow-xl";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm",
          "text-brand-foreground hover:bg-brand-600 transition-colors"
        )}
      >
        <UploadCloud size={15} />
        {triggerLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className={cn(cardStyles, "flex max-h-[90vh] flex-col")}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="font-display text-lg text-foreground">
                {croppingItem ? "Crop image" : "Upload images"}
              </h3>
              <button
                type="button"
                onClick={close}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="min-h-0 flex-1 overflow-auto p-5">
              {croppingItem ? (
                <div>
                  <div className="relative h-[50vh] min-h-[280px] w-full overflow-hidden rounded-xl bg-muted">
                    <Cropper
                      image={croppingItem.previewUrl}
                      crop={crop}
                      zoom={zoom}
                      aspect={aspect}
                      showGrid={false}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={(_, areaPixels) => setPixels(areaPixels)}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Zoom</span>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.01}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="flex-1 accent-brand"
                    />
                  </div>
                </div>
              ) : (
                <>
                  {/* Dropzone */}
                  <div
                    {...getRootProps()}
                    onClick={() => openFileDialog()}
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
                      isDragActive
                        ? "border-brand bg-brand/10"
                        : "border-border hover:border-brand/60"
                    )}
                  >
                    <input {...getInputProps()} />
                    <UploadCloud
                      size={34}
                      className="text-muted-foreground"
                    />
                    <p className="text-sm text-muted-foreground">
                      {isDragActive
                        ? "Drop the images here"
                        : "Drag & drop images here, or"}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openFileDialog();
                      }}
                      className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand-600 transition-colors"
                    >
                      Browse files
                    </button>
                    <p className="text-xs text-muted-foreground/70">
                      Upload one or many — JPG, PNG, WEBP, AVIF
                    </p>
                  </div>

                  {/* Staged previews */}
                  {staged.length > 0 && (
                    <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {staged.map((s) => (
                        <div
                          key={s.id}
                          className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.previewUrl}
                            alt={s.name}
                            className="h-full w-full object-cover"
                          />

                          {/* Status overlay */}
                          {s.status === "uploading" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                              <Loader2
                                size={20}
                                className="animate-spin text-white"
                              />
                            </div>
                          )}
                          {s.status === "done" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/40">
                              <Check size={22} className="text-white" />
                            </div>
                          )}
                          {s.status === "error" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-red-500/50 text-xs font-medium text-white">
                              Failed
                            </div>
                          )}

                          {/* Hover controls */}
                          {s.status === "idle" && (
                            <div className="absolute inset-x-0 top-0 flex justify-end gap-1 p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => startCrop(s.id)}
                                aria-label="Crop image"
                                className="rounded-md bg-black/60 p-1.5 text-white hover:bg-black/80"
                              >
                                <CropIcon size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeStaged(s.id)}
                                aria-label="Remove image"
                                className="rounded-md bg-black/60 p-1.5 text-white hover:bg-black/80"
                              >
                                <X size={13} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2 border-t border-border px-5 py-4">
              {croppingItem ? (
                <>
                  <button
                    type="button"
                    onClick={() => setCropId(null)}
                    disabled={busy}
                    className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={confirmCrop}
                    disabled={busy || !pixels}
                    className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand-600 disabled:opacity-50"
                  >
                    {busy ? "Cropping…" : "Apply crop"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openFileDialog()}
                    disabled={busy}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    <ImagePlus size={15} />
                    Add more
                  </button>
                  <button
                    type="button"
                    onClick={uploadAll}
                    disabled={busy || staged.length === 0}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2 text-sm font-medium text-brand-foreground hover:bg-brand-600 disabled:opacity-50"
                  >
                    {busy && <Loader2 size={15} className="animate-spin" />}
                    {busy
                      ? "Uploading…"
                      : `Upload ${staged.length || ""} ${
                          staged.length === 1 ? "image" : "images"
                        }`.trim()}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
