import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GALLERY } from "@/lib/content";

export default function AdminGalleryPage() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-foreground">Gallery</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload and organize your portfolio images.
          </p>
        </div>
        <Button size="sm" className="shrink-0">
          <Upload size={16} /> Upload
        </Button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {GALLERY.map((g) => (
          <div
            key={g.id}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
          >
            <Image src={g.url} alt={g.alt} fill className="object-cover" sizes="25vw" />
            <button
              type="button"
              aria-label="Delete image"
              className="absolute right-2 top-2 hidden h-8 w-8 items-center justify-center rounded-lg bg-background/90 text-rose-600 group-hover:flex"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
