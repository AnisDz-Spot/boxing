import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCustomizationStore } from '../../store/customizationStore';
import { generateTextTexture } from '../../utils/GenerateTextTexture';

const GloveModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  const { glove, customImages } = useCustomizationStore();
  const { scene } = useGLTF('/models/glove.glb');

  useFrame((state) => {
    if (group.current) {
      const targetRotation = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1; 
      group.current.rotation.y += (targetRotation - group.current.rotation.y) * 0.05;
    }
  });

  useEffect(() => {
    const applyMaterials = async () => {
      const applyColor = async (name: string, color: string, images: any[] = []) => {
        const mesh = scene.getObjectByName(name) as THREE.Mesh;
        if (mesh && mesh.material && 'color' in mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.color.set(color);

          // Apply images if they exist for this part
          if (images.length > 0) {
            const texture = await generateTextTexture({
              text: '',
              bgColor: color,
              images: images
            });
            material.map = texture;
          } else {
            material.map = null;
          }

          material.needsUpdate = true;
        }
      };

      // Apply colors and images to each part
      await applyColor('Fingers', glove.fingersColor.hex);
      await applyColor('Inner Palm', glove.innerPalmColor.hex);
      await applyColor('Outer Palm', glove.outerPalmColor.hex, customImages.OutterPalm);
      await applyColor('Inner Thumb', glove.innerThumbColor.hex);
      await applyColor('Outer Thumb', glove.outerThumbColor.hex, customImages.OutterThumb);
      await applyColor('Strap', glove.strapColor.hex, customImages.Strap);
      await applyColor('Wrist', glove.wristColor.hex);
      await applyColor('Wrist Outline', glove.wristOutlineColor.hex, customImages.WristOutline);
      await applyColor('Outline', glove.outlineColor.hex);
    };

    applyMaterials();
  }, [glove, customImages, scene]);

  return (
    <group ref={group} position={[0, -1, 0]} scale={[0.8, 0.8, 0.8]}>
      <primitive object={scene} />
    </group>
  );
};

export default GloveModel;

useGLTF.preload('/models/glove.glb');