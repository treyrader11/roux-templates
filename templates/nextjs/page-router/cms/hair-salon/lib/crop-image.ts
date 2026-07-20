// Turns a react-easy-crop pixel area into a downscaled PNG blob on an offscreen
// canvas. Longest side capped at MAX_OUTPUT to keep uploads small.
import type { Area } from "react-easy-crop";

const MAX_OUTPUT = 1600;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image for cropping"));
    img.src = src;
  });
}

export async function getCroppedBlob(src: string, area: Area): Promise<Blob> {
  const image = await loadImage(src);

  const scale = Math.min(1, MAX_OUTPUT / Math.max(area.width, area.height));
  const outW = Math.round(area.width * scale);
  const outH = Math.round(area.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported");

  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    outW,
    outH
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not export the cropped image"));
    }, "image/png");
  });
}
