import { useCustomizationStore } from '../../store/customizationStore';

const zones = [
  'Wrist',
  'InnerThumb',
  'OutterThumb',
  'InnerPalm',
  'OutterPalm',
  'Strap',
] as const;

type Zone = (typeof zones)[number];

export default function TextCustomization() {
  const { textZones, updateTextZone } = useCustomizationStore();

  return (
    <div className="space-y-8">
      {zones.map((zone) => { 
        const settings = textZones[zone]; 
        return (
          <div
            key={zone} 
            className="border border-neutral-700 rounded-xl p-4 bg-neutral-900"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              {zone} Text
            </h3>

            {/* Text Input */}
            <div className="mb-3">
              <label className="block font-medium mb-1">Text</label>
              <input
                type="text"
                value={settings.text}
                onChange={(e) =>
                  updateTextZone(zone, { text: e.target.value.slice(0, 20) })
                }
                className="w-full p-2 rounded bg-white text-black"
                placeholder="Enter text"
              />
            </div>

            {/* Font Selection */}
            <div className="mb-3">
              <label className="block font-medium mb-1">Font</label>
              <select
                value={settings.font}
                onChange={(e) => updateTextZone(zone, { font: e.target.value })}
                className="w-full p-2 rounded bg-white text-black"
              >
                <option value="Arial">Arial</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Impact">Impact</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>

            {/* Color */}
            <div className="mb-3">
              <label className="block font-medium mb-1">Text Color</label>
              <input
                type="color"
                value={settings.color}
                onChange={(e) =>
                  updateTextZone(zone, { color: e.target.value })
                }
                className="w-16 h-10 rounded"
              />
            </div>

            {/* Size */}
            <div className="mb-3">
              <label className="block font-medium mb-1">Font Size</label>
              <input
                type="range"
                min={20}
                max={128}
                step={1}
                value={settings.size}
                onChange={(e) =>
                  updateTextZone(zone, { size: Number(e.target.value) })
                }
                className="w-full"
              />
              <p className="text-sm text-neutral-400 text-right">
                {settings.size}px
              </p>
            </div>

            {/* Position */}
            <div className="mb-3">
              <label className="block font-medium mb-1">Position (X/Y)</label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min={0}
                  max={512}
                  value={settings.x}
                  onChange={(e) =>
                    updateTextZone(zone, { x: Number(e.target.value) })
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min={0}
                  max={512}
                  value={settings.y}
                  onChange={(e) =>
                    updateTextZone(zone, { y: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Rotation */}
            <div>
              <label className="block font-medium mb-1">Rotation (°)</label>
              <input
                type="range"
                min={0}
                max={360}
                value={settings.rotation}
                onChange={(e) =>
                  updateTextZone(zone, { rotation: Number(e.target.value) })
                }
                className="w-full"
              />
              <p className="text-sm text-neutral-400 text-right">
                {settings.rotation}°
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
