import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import cloudinary from "@/lib/cloudinary";

/**
 * Signs a short-lived Cloudinary upload for the admin dropzone. The file bytes
 * go straight from the browser to Cloudinary using this signature — never
 * through our server. Also returns the (non-secret) cloud name + api key so the
 * client needs no extra NEXT_PUBLIC env vars. Admin-only.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) return res.status(401).json({ error: "Unauthorized" });

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: "Cloudinary is not configured" });
  }

  const folder =
    typeof req.body?.folder === "string" && req.body.folder
      ? req.body.folder
      : "reverse-gen";
  const timestamp = Math.round(Date.now() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    apiSecret
  );

  return res.status(200).json({
    signature,
    timestamp,
    folder,
    apiKey,
    cloudName,
  });
}
