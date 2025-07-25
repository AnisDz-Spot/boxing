import React, { useState } from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { uploadToCloudinary} from "../utils/cloudinary.ts";
import { Image as ImageIcon, X, Move, RotateCw, Maximize } from 'lucide-react';
import type { Zone, ImageTransform } from '../../store/customizationStore';

const AVAILABLE_ZONES = ['OutterPalm', 'OutterThumb', 'WristOutline'] as const;
type AvailableZone = typeof AVAILABLE_ZONES[number];

const ZONE_LABELS: Record<AvailableZone, string> = {
  OutterPalm: 'Outer Palm',
  OutterThumb: 'Outer Thumb',
  WristOutline: 'Wrist Outline'
};

export default function ImageUploader() {
  const { updateCustomImage, addCustomImage, updateImageTransform, customImages } = useCustomizationStore();
  const [selectedZone, setSelectedZone] = useState<AvailableZone>('OutterPalm');
  const [isDragging, setIsDragging] = useState(false);
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    processFile(file);
  };

  const processFile = async (file: File) => {
    const url = await uploadToCloudinary(file);
    if (url) {
      addCustomImage(selectedZone, url); // on utilise maintenant la vraie URL
    } else {
      console.error("Échec de l'upload vers Cloudinary");
    }
  };


  const handleClearImage = () => {
    updateCustomImage(selectedZone, '');
  };

  const handleTransformChange = (property: keyof ImageTransform, value: number) => {
    const currentTransform = customImages[selectedZone].transform;
    updateImageTransform(selectedZone, {
      ...currentTransform,
      [property]: value
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Upload Custom Images</h3>
        <p className="text-neutral-400 text-sm mb-4">
          Add your own images to customize specific areas of the gloves. Images will be automatically
          mapped to the selected zone.
        </p>
      </div>

      <div className="bg-neutral-800 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Select Zone</label>
          <select
            className="w-full bg-neutral-700 rounded-lg border border-neutral-600 p-3 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value as AvailableZone)}
          >
            {AVAILABLE_ZONES.map((zone) => (
              <option key={zone} value={zone}>{ZONE_LABELS[zone]}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Image (+$7.99)</label>
          <div
            className={`
              border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragging ? 'border-gold bg-gold/10' : 'border-neutral-600 hover:border-gold/50'}
            `}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
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
              Drag and drop your image here, or click to browse
            </p>
            <p className="text-xs text-neutral-500">
              Supports: PNG, JPG, JPEG (max 5MB)
            </p>
          </div>
        </div>

        {customImages[selectedZone]?.url && (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={customImages[selectedZone].url}
                alt="Preview"
                className="w-full rounded-lg border border-neutral-600"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors"
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Move className="h-4 w-4 text-gold" />
                <label className="text-sm font-medium">Position</label>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>X Position</span>
                    <span>{customImages[selectedZone].transform.x.toFixed(0)}px</span>
                  </div>
                  <input
                    type="range"
                    min="-512"
                    max="512"
                    value={customImages[selectedZone].transform.x}
                    onChange={(e) => handleTransformChange('x', parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Y Position</span>
                    <span>{customImages[selectedZone].transform.y.toFixed(0)}px</span>
                  </div>
                  <input
                    type="range"
                    min="-512"
                    max="512"
                    value={customImages[selectedZone].transform.y}
                    onChange={(e) => handleTransformChange('y', parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <RotateCw className="h-4 w-4 text-gold" />
                <label className="text-sm font-medium">Rotation</label>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>Angle</span>
                <span>{customImages[selectedZone].transform.rotation.toFixed(0)}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={customImages[selectedZone].transform.rotation}
                onChange={(e) => handleTransformChange('rotation', parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Maximize className="h-4 w-4 text-gold" />
                <label className="text-sm font-medium">Scale</label>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>Size</span>
                <span>{customImages[selectedZone].transform.scale.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="2"
                step="0.01"
                value={customImages[selectedZone].transform.scale}
                onChange={(e) => handleTransformChange('scale', parseFloat(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="bg-navy/30 rounded-lg border border-gold/20 p-4">
          <h4 className="font-semibold mb-2">Image Guidelines</h4>
          <ul className="text-sm text-neutral-400 space-y-1">
            <li>• Images should have a transparent background for best results</li>
            <li>• Recommended size: 512x512 pixels</li>
            <li>• Keep file size under 5MB for optimal performance</li>
            <li>• Images will be automatically scaled to fit the selected zone</li>
          </ul>
        </div>
      </div>
    </div>
  );
}