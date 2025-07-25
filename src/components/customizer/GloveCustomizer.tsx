import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import GloveModel from './GloveModel';
import { RotateCcw, Download } from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';

const GloveCustomizer: React.FC = () => {
  const { resetCustomization } = useCustomizationStore();

  return (
    <div className="bg-neutral-800 rounded-xl overflow-hidden h-[500px] md:h-[600px]">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera 
          makeDefault  
          position={[0, 0, 8]} 
          fov={45}
          near={0.1}
          far={1000}
        />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Stage 
          environment="city" 
          intensity={0.6}
          adjustCamera={false}
          preset="rembrandt"
        >
          <GloveModel />
        </Stage>
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.5}
          minDistance={4}
          maxDistance={12}
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
      
      <div className="bg-neutral-900 px-4 py-3 flex justify-between items-center">
        <button
          onClick={resetCustomization}
          className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          <RotateCcw className="h-4 w-4" /> Reset Design
        </button>
        
        <button
          className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
        >
          <Download className="h-4 w-4" /> Share Design
        </button>
      </div>
    </div>
  );
};

export default GloveCustomizer;