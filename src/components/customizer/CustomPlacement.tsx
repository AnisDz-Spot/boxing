import React, { useState } from 'react';
import { useCustomizationStore } from '../../store/customizationStore';
import { CustomText, CustomImage } from '../../types/glove';
import { Plus, X, Move, RotateCw, Maximize, Image as ImageIcon, Type } from 'lucide-react';

const CustomPlacement: React.FC = () => {
  const { 
    glove,
    addCustomText,
    updateCustomText,
    removeCustomText,
    addCustomImage,
    updateCustomImage,
    removeCustomImage 
  } = useCustomizationStore();

  const [newText, setNewText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddText = () => {
    if (newText.trim()) {
      const text: CustomText = {
        content: newText,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1
      };
      addCustomText(text);
      setNewText('');
    }
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      const image: CustomImage = {
        url: imageUrl,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: 1
      };
      addCustomImage(image);
      setImageUrl('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Custom Placement</h3>
      
      {/* Add Text */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Add Text (+$4.99)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 bg-navy/50 rounded-lg border border-neutral-600 p-2 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Enter text..."
          />
          <button
            onClick={handleAddText}
            className="bg-gold text-navy p-2 rounded-lg hover:bg-gold/80 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Add Image */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Add Image (+$7.99)</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 bg-navy/50 rounded-lg border border-neutral-600 p-2 focus:outline-none focus:ring-2 focus:ring-gold"
            placeholder="Enter image URL..."
          />
          <button
            onClick={handleAddImage}
            className="bg-gold text-navy p-2 rounded-lg hover:bg-gold/80 transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Custom Elements List */}
      <div className="space-y-6">
        {/* Text Elements */}
        {glove.customTexts.map((text, index) => (
          <div key={`text-${index}`} className="bg-navy/50 backdrop-blur-sm rounded-lg p-4 border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-gold" />
                <span className="font-medium">{text.content}</span>
              </div>
              <button
                onClick={() => removeCustomText(index)}
                className="text-neutral-400 hover:text-gold transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Move className="h-4 w-4 text-gold" />
                  <label className="text-sm font-medium">Position</label>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>X Position</span>
                      <span>{text.position.x.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={text.position.x}
                      onChange={(e) => updateCustomText(index, {
                        ...text,
                        position: { ...text.position, x: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Y Position</span>
                      <span>{text.position.y.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={text.position.y}
                      onChange={(e) => updateCustomText(index, {
                        ...text,
                        position: { ...text.position, y: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Z Position</span>
                      <span>{text.position.z.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={text.position.z}
                      onChange={(e) => updateCustomText(index, {
                        ...text,
                        position: { ...text.position, z: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <RotateCw className="h-4 w-4 text-gold" />
                  <label className="text-sm font-medium">Rotation</label>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>X Rotation</span>
                      <span>{text.rotation.x.toFixed(2)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={text.rotation.x}
                      onChange={(e) => updateCustomText(index, {
                        ...text,
                        rotation: { ...text.rotation, x: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Y Rotation</span>
                      <span>{text.rotation.y.toFixed(2)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={text.rotation.y}
                      onChange={(e) => updateCustomText(index, {
                        ...text,
                        rotation: { ...text.rotation, y: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Z Rotation</span>
                      <span>{text.rotation.z.toFixed(2)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={text.rotation.z}
                      onChange={(e) => updateCustomText(index, {
                        ...text,
                        rotation: { ...text.rotation, z: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Maximize className="h-4 w-4 text-gold" />
                  <label className="text-sm font-medium">Scale</label>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Size</span>
                  <span>{text.scale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={text.scale}
                  onChange={(e) => updateCustomText(index, {
                    ...text,
                    scale: parseFloat(e.target.value)
                  })}
                  className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Image Elements */}
        {glove.customImages.map((image, index) => (
          <div key={`image-${index}`} className="bg-navy/50 backdrop-blur-sm rounded-lg p-4 border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-gold" />
                <span className="font-medium truncate max-w-[200px]">{image.url}</span>
              </div>
              <button
                onClick={() => removeCustomImage(index)}
                className="text-neutral-400 hover:text-gold transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Move className="h-4 w-4 text-gold" />
                  <label className="text-sm font-medium">Position</label>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>X Position</span>
                      <span>{image.position.x.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={image.position.x}
                      onChange={(e) => updateCustomImage(index, {
                        ...image,
                        position: { ...image.position, x: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Y Position</span>
                      <span>{image.position.y.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={image.position.y}
                      onChange={(e) => updateCustomImage(index, {
                        ...image,
                        position: { ...image.position, y: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Z Position</span>
                      <span>{image.position.z.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.1"
                      value={image.position.z}
                      onChange={(e) => updateCustomImage(index, {
                        ...image,
                        position: { ...image.position, z: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <RotateCw className="h-4 w-4 text-gold" />
                  <label className="text-sm font-medium">Rotation</label>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>X Rotation</span>
                      <span>{image.rotation.x.toFixed(2)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={image.rotation.x}
                      onChange={(e) => updateCustomImage(index, {
                        ...image,
                        rotation: { ...image.rotation, x: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Y Rotation</span>
                      <span>{image.rotation.y.toFixed(2)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={image.rotation.y}
                      onChange={(e) => updateCustomImage(index, {
                        ...image,
                        rotation: { ...image.rotation, y: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Z Rotation</span>
                      <span>{image.rotation.z.toFixed(2)}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="1"
                      value={image.rotation.z}
                      onChange={(e) => updateCustomImage(index, {
                        ...image,
                        rotation: { ...image.rotation, z: parseFloat(e.target.value) }
                      })}
                      className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Maximize className="h-4 w-4 text-gold" />
                  <label className="text-sm font-medium">Scale</label>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Size</span>
                  <span>{image.scale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={image.scale}
                  onChange={(e) => updateCustomImage(index, {
                    ...image,
                    scale: parseFloat(e.target.value)
                  })}
                  className="w-full h-2 bg-navy rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {(glove.customTexts.length > 0 || glove.customImages.length > 0) && (
        <div className="mt-6 p-4 bg-navy/30 rounded-lg border border-gold/20">
          <p className="text-sm text-gold">
            Additional cost: ${((glove.customTexts.length * 4.99) + (glove.customImages.length * 7.99)).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomPlacement;