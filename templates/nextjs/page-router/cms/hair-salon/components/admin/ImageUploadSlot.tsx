import { cn } from "@/lib/utils";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadSlotProps {
  label: string;
  slug: string;
  currentImageUrl?: string;
  folder?: string;
  onUploadSuccess: (slug: string, url: string, publicId: string) => void;
  onDelete: (slug: string) => void;
}

export default function ImageUploadSlot({
  label,
  slug,
  currentImageUrl,
  folder = "reverse-gen",
  onUploadSuccess,
  onDelete,
}: ImageUploadSlotProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(slug);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cn(
          "relative w-full h-[160px] md:h-[200px] rounded-xl overflow-hidden",
          "border border-border bg-muted"
        )}
      >
        {currentImageUrl && (
          <Image
            src={currentImageUrl}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-white text-sm font-medium">{label}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            maxFiles: 1,
            resourceType: "image",
            folder,
            sources: ["local", "url"],
            clientAllowedFormats: ["jpg", "png", "webp", "avif"],
            maxFileSize: 5_000_000,
          }}
          onSuccess={(result) => {
            if (typeof result.info !== "string" && result.info) {
              onUploadSuccess(slug, result.info.secure_url, result.info.public_id);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm",
                "bg-brand/10 text-brand border border-brand/20",
                "hover:bg-brand/20 transition-colors"
              )}
            >
              <Upload size={14} />
              {currentImageUrl ? "Replace" : "Upload"}
            </button>
          )}
        </CldUploadWidget>

        {currentImageUrl && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className={cn(
              "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm",
              "bg-red-500/10 text-red-500 border border-red-500/20",
              "hover:bg-red-500/20 transition-colors disabled:opacity-50"
            )}
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Trash2 size={14} />
            )}
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
