import type { GetServerSideProps } from "next";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import AdminLayout from "@/components/admin/AdminLayout";
import { requireAdminSession } from "@/lib/admin-guard";
import { useCrud } from "@/hooks/useCrud";
import { cn } from "@/lib/utils";
import { Upload, Trash2 } from "lucide-react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = await requireAdminSession(ctx);
  if (redirect) return redirect;
  return { props: {} };
};

type GalleryRow = {
  id: string;
  url: string;
  publicId: string;
  alt: string | null;
  category: string | null;
  order: number;
};

export default function AdminGalleryImages() {
  const { items, loading, error, create, remove, reload } =
    useCrud<GalleryRow>("/api/admin/gallery");

  return (
    <AdminLayout backHref="/admin/gallery" backLabel="Gallery">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-foreground">Portfolio Images</h1>
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            resourceType: "image",
            folder: "reverse-gen/gallery",
            sources: ["local", "url"],
            clientAllowedFormats: ["jpg", "png", "webp", "avif"],
            maxFileSize: 8_000_000,
          }}
          onSuccess={async (result) => {
            if (typeof result.info !== "string" && result.info) {
              await create({
                url: result.info.secure_url,
                publicId: result.info.public_id,
              } as Partial<GalleryRow>);
              await reload();
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className={cn(
                "flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm",
                "text-brand-foreground hover:bg-brand-600 transition-colors"
              )}
            >
              <Upload size={15} />
              Upload image
            </button>
          )}
        </CldUploadWidget>
      </div>

      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && items.length === 0 ? (
        <p className="text-muted-foreground">No images yet. Upload your first one.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={img.url}
                alt={img.alt ?? "Portfolio image"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <button
                type="button"
                onClick={() => remove(img.id)}
                className="absolute right-2 top-2 rounded-lg bg-black/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Delete image"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
