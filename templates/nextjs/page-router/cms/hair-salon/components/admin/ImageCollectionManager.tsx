import { useEffect, useState } from "react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrud } from "@/hooks/useCrud";
import ImageDropzone from "@/components/admin/ImageDropzone";
import type { UploadedImage } from "@/lib/upload-image";

type CollectionRow = {
  id: string;
  url: string;
  publicId: string;
  alt: string | null;
  order: number;
};

interface ImageCollectionManagerProps {
  /** Collection slug — forms the REST base `/api/admin/collections/{slug}`. */
  collection: string;
  title: string;
  description?: string;
  /** Cloudinary folder uploads land in. */
  folder: string;
  /** Crop aspect ratio offered in the upload modal. */
  aspect?: number;
}

export default function ImageCollectionManager({
  collection,
  title,
  description,
  folder,
  aspect = 1,
}: ImageCollectionManagerProps) {
  const base = `/api/admin/collections/${collection}`;
  const { items, loading, error, remove, reload } =
    useCrud<CollectionRow>(base);

  // Local ordering mirror so drag feels instant before it persists.
  const [ordered, setOrdered] = useState<CollectionRow[]>([]);
  useEffect(() => setOrdered(items), [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleUploaded = async (images: UploadedImage[]) => {
    // Persist each new image at the end of the collection, then refresh once.
    let order = ordered.length;
    for (const img of images) {
      const res = await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: img.url, publicId: img.publicId, order: order++ }),
      });
      if (!res.ok) throw new Error("Failed to save image to the collection");
    }
    await reload();
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ordered.findIndex((i) => i.id === active.id);
    const newIndex = ordered.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const next = arrayMove(ordered, oldIndex, newIndex);
    setOrdered(next);

    // Persist only the rows whose order actually changed.
    await Promise.all(
      next.map((row, index) =>
        row.order === index
          ? Promise.resolve()
          : fetch(`${base}/${row.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ order: index }),
            })
      )
    );
    await reload();
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground">{title}</h1>
          {description && (
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <ImageDropzone
          folder={folder}
          aspect={aspect}
          onUploaded={handleUploaded}
        />
      </div>

      {loading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && ordered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-muted-foreground">
            No images yet. Use “Upload images” to add one or many.
          </p>
        </div>
      ) : (
        <>
          {ordered.length > 1 && (
            <p className="mb-3 text-xs text-muted-foreground">
              Drag to reorder — the order here is the order shown on the site.
            </p>
          )}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={ordered.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {ordered.map((img) => (
                  <SortableTile
                    key={img.id}
                    img={img}
                    onDelete={() => remove(img.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}
    </div>
  );
}

function SortableTile({
  img,
  onDelete,
}: {
  img: CollectionRow;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: img.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted",
        isDragging && "z-10 opacity-80 ring-2 ring-brand"
      )}
    >
      <Image
        src={img.url}
        alt={img.alt ?? "Collection image"}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 50vw, 25vw"
      />

      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="absolute left-2 top-2 cursor-grab touch-none rounded-lg bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
      >
        <GripVertical size={15} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete image"
        className="absolute right-2 top-2 rounded-lg bg-black/60 p-2 text-white opacity-0 transition-opacity hover:bg-red-500 group-hover:opacity-100"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
