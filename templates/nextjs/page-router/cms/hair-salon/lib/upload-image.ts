// Client-side signed upload to Cloudinary. The server (/api/admin/upload) only
// signs the request; the bytes go browser -> Cloudinary directly.

export type UploadedImage = { url: string; publicId: string };

type SignResponse = {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
  error?: string;
};

/** Upload a File or Blob to Cloudinary in `folder`, returning its url + public id. */
export async function uploadImage(
  file: Blob,
  folder: string
): Promise<UploadedImage> {
  const signRes = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });
  if (!signRes.ok) throw new Error("Could not sign the upload");
  const sign = (await signRes.json()) as SignResponse;

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sign.apiKey);
  form.append("timestamp", String(sign.timestamp));
  form.append("signature", sign.signature);
  form.append("folder", sign.folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sign.cloudName}/image/upload`,
    { method: "POST", body: form }
  );
  if (!uploadRes.ok) throw new Error("Upload failed");
  const data = (await uploadRes.json()) as {
    secure_url: string;
    public_id: string;
  };
  return { url: data.secure_url, publicId: data.public_id };
}
