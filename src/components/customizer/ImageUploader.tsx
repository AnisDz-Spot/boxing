import React, { useState } from "react";
import { useCustomizationStore } from "../../store/customizationStore";
import { uploadToCloudinary } from "../../utils/cloudinary";
import {
  Image as ImageIcon,
  X,
  Move,
  RotateCw,
  Maximize,
  Loader2,
} from "lucide-react";
import type { ImageTransform } from "../../store/customizationStore";

const AVAILABLE_ZONES = ["OutterPalm", "OutterThumb", "Strap"] as const;
type AvailableZone = (typeof AVAILABLE_ZONES)[number];

const ZONE_LABELS: Record<AvailableZone, string> = {
  OutterPalm: "Outer Palm",
  OutterThumb: "Outer Thumb",
  Strap: "Strap",
};
const isMobile = window.innerWidth < 768;

export default function ImageUploader() {
  const {
    customImages,
    addCustomImage,
    removeCustomImage,
    updateImageTransform,
  } = useCustomizationStore();
  const [selectedZone, setSelectedZone] = useState<AvailableZone>("OutterPalm");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    message: string;
    type: "success" | "error" | "loading";
  } | null>(null);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith("image/")) {
      setUploadStatus({
        message: "Only image files are allowed",
        type: "error",
      });
      return;
    }

    await processFile(file);
  };

  // ImageUploader.tsx (simplified)
  const processFile = async (file: File) => {
    const MAX_SIZE_MB = isMobile ? 2 : 5; // 2MB mobile limit
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_SIZE_BYTES) {
      setUploadStatus({
        message: `Image exceeds ${MAX_SIZE_MB}MB limit`,
        type: "error",
      });
      return;
    }

    setUploadStatus({ message: "Uploading...", type: "loading" });

    const url = await uploadToCloudinary(file); // Direct upload without compression
    if (url) {
      addCustomImage(selectedZone, url);
      setUploadStatus({ message: "Upload successful!", type: "success" });
    } else {
      setUploadStatus({ message: "Upload failed", type: "error" });
    }
  };

  const handleTransformChange = (
    imageId: string,
    property: keyof ImageTransform,
    value: number
  ) => {
    const image = customImages[selectedZone].find((img) => img.id === imageId);
    if (!image) return;

    // Calculate proportional scaling if needed
    let newTransform = { ...image.transform };
    newTransform[property] = value;

    // Enforce max scale limit (optional)
    if (property === "scale") {
      newTransform.scale = Math.min(Math.max(value, 0.1), 1.5); // Limit scale range
    }

    updateImageTransform(selectedZone, imageId, newTransform);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Upload Custom Images</h3>
        <p className="text-neutral-400 text-sm mb-4">
          Add images to customize your gloves (Max {isMobile ? "1.5MB" : "5MB"})
        </p>
      </div>

      {/* Status Indicator */}
      {uploadStatus && (
        <div
          className={`p-3 rounded-md ${
            uploadStatus.type === "error"
              ? "bg-red-500/20 text-red-500"
              : uploadStatus.type === "success"
              ? "bg-green-500/20 text-green-500"
              : "bg-blue-500/20 text-blue-500"
          }`}
        >
          <div className="flex items-center gap-2">
            {uploadStatus.type === "loading" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {uploadStatus.message}
          </div>
          {uploadStatus.type === "loading" && (
            <div className="mt-2 w-full bg-neutral-700 rounded-full h-1.5">
              <div className="bg-gold h-1.5 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      )}

      <div className="bg-neutral-800 rounded-xl p-6 space-y-6">
        {/* Zone Selector */}
        <div>
          <label className="block text-sm font-medium mb-2">Select Zone</label>
          <select
            className="w-full bg-neutral-700 rounded-lg border border-neutral-600 p-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value as AvailableZone)}
          >
            {AVAILABLE_ZONES.map((zone) => (
              <option key={zone} value={zone}>
                {ZONE_LABELS[zone]}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Area */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Add Image (+$7.99)
          </label>
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${
                isDragging
                  ? "border-gold bg-gold/10"
                  : "border-neutral-600 hover:border-gold/50"
              }
            `}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
            <p className="text-sm text-neutral-300 mb-2">
              {isMobile
                ? "Tap to select photo"
                : "Drag & drop or click to browse"}
            </p>
            <p className="text-xs text-neutral-500">
              Max {isMobile ? "2MB" : "5MB"} • WebP recommended
            </p>
          </div>
        </div>

        {/* Image List */}
        {customImages[selectedZone].length > 0 && (
          <div className="space-y-6">
            <h4 className="font-medium flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              {customImages[selectedZone].length} image(s) for{" "}
              {ZONE_LABELS[selectedZone]}
            </h4>

            {customImages[selectedZone].map((image) => (
              <div
                key={image.id}
                className="bg-neutral-900 rounded-lg p-4 space-y-4"
              >
                <div className="relative">
                  <img
                    src={image.url}
                    alt="Custom design"
                    className="w-full rounded-lg border border-neutral-600"
                  />
                  <button
                    onClick={() => removeCustomImage(selectedZone, image.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Transform Controls */}
                <TransformControls
                  transform={image.transform}
                  onChange={(prop, value) =>
                    handleTransformChange(image.id, prop, value)
                  }
                />
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-navy/30 rounded-lg border border-gold/20 p-4">
          <h4 className="font-semibold mb-2">Tips for Best Results</h4>
          <ul className="text-sm text-neutral-400 space-y-1">
            <li>
              • Images should have a transparent background for best results
            </li>
            <li>• Recommended size: 512x512 pixels</li>
            <li>
              •{" "}
              {isMobile
                ? "Keep file size under 2MB for optimal performance"
                : "Keep file size under 5MB for optimal performance"}
            </li>
            <li>• Each image costs $7.99</li>
            <li>• You can add multiple images to each zone</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Reusable transform controls component
const TransformControls = ({
  transform,
  onChange,
}: {
  transform: ImageTransform;
  onChange: (property: keyof ImageTransform, value: number) => void;
}) => (
  <>
    <TransformSlider
      label="Position X"
      icon={<Move className="h-4 w-4 text-gold" />}
      value={transform.x}
      min={-512}
      max={512}
      onChange={(v) => onChange("x", v)}
    />

    <TransformSlider
      label="Position Y"
      icon={<Move className="h-4 w-4 text-gold" />}
      value={transform.y}
      min={-512}
      max={512}
      onChange={(v) => onChange("y", v)}
    />

    <TransformSlider
      label="Rotation"
      icon={<RotateCw className="h-4 w-4 text-gold" />}
      value={transform.rotation}
      min={0}
      max={360}
      onChange={(v) => onChange("rotation", v)}
    />

    <TransformSlider
      label="Scale"
      icon={<Maximize className="h-4 w-4 text-gold" />}
      value={transform.scale}
      min={0.1}
      max={isMobile ? 1.0 : 1.5}
      step={0.1}
      onChange={(v) => onChange("scale", v)}
    />
  </>
);

// Reusable slider component
const TransformSlider = ({
  label,
  icon,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <label className="text-sm font-medium">{label}</label>
    </div>
    <div className="flex justify-between text-xs mb-1">
      <span>{label.split(" ")[0]}</span>
      <span>
        {typeof value === "number"
          ? value.toFixed(step < 1 ? 2 : 0) +
            (label === "Rotation" ? "°" : label === "Scale" ? "x" : "")
          : value}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
    />
  </div>
);
