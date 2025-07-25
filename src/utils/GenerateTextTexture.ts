import * as THREE from 'three';
import type { CustomImage } from '../store/customizationStore';

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
}

export async function generateTextTexture({
  text,
  font = 'Arial',
  textColor = '#FFFFFF',
  bgColor = '#000000',
  x = 256,
  y = 256,
  rotation = 0,
  size = 64,
  images = [],
}: TextOptions): Promise<THREE.Texture> {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background color
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = bgColor ?? '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  // Images
  for (const image of images) {
    const img = await loadImage(image.url);
    const { x, y, scale, rotation } = image.transform;
    ctx.save();
    ctx.translate(x + 256, y + 256);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }

  // Text
  if (text) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.font = `bold ${size}px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFFFFF';
    ctx.strokeText(text, 0, 0);
    ctx.fillStyle = textColor;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.needsUpdate = true;
  return texture;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}