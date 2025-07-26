import * as THREE from "three";
import type { CustomImage } from "../store/customizationStore";

interface TextOptions {
  text: string;
  font?: string;
  textColor?: string;
  bgColor?: string;
  x?: number;
  y?: number;
  rotation?: number;
  size?: number;
  images?: CustomImage[];
  scale?: number; // Made optional with default value
}

export async function generateTextTexture({
  text,
  font = "Arial",
  textColor = "#FFFFFF",
  bgColor = "#000000",
  x = 256,
  y = 256,
  rotation = 0,
  size = 64,
  images = [],
  scale = 1.0, // Default scale factor
}: TextOptions): Promise<THREE.Texture> {
  const canvas = document.createElement("canvas");
  // Apply scale to canvas dimensions for sharper results
  canvas.width = canvas.height = 512 * scale;
  const ctx = canvas.getContext("2d")!;

  // Scale the context to maintain coordinate system
  ctx.scale(scale, scale);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background (scaled)
  ctx.save();
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale); // Adjust for scaling
  ctx.restore();

  // Images with proper scaling
  for (const image of images) {
    const img = await loadImage(image.url);
    const {
      x: imgX,
      y: imgY,
      scale: imgScale,
      rotation: imgRotation,
    } = image.transform;

    ctx.save();
    ctx.translate((imgX + 256) * scale, (imgY + 256) * scale);
    ctx.rotate((imgRotation * Math.PI) / 180);
    ctx.scale(imgScale * scale, imgScale * scale); // Combine transforms
    ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
    ctx.restore();
  }

  // Text with scaling
  if (text) {
    ctx.save();
    ctx.translate(x * scale, y * scale);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.font = `bold ${size * scale}px ${font}`; // Scale font size
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 4 * scale; // Scale line width
    ctx.strokeStyle = "#FFFFFF";
    ctx.strokeText(text, 0, 0);
    ctx.fillStyle = textColor;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;

  // For Three.js, set texture repeat if needed
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return texture;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
