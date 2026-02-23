"use client";

import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { useGameStore } from "@/store/gameStore";

export default function SpaceArtifact({ position, data }: { position: [number, number, number], data: any }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const setMission = useGameStore((state) => state.setMission);

  useCursor(hovered);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.02;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;

      if (hovered) {
        ref.current.scale.setScalar(1.2);
      } else {
        ref.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setMission(data)}
    >
      {/* The Glow */}
      <pointLight color="cyan" intensity={1} distance={3} />

      {/* The Artifact Geometry (Crystal/Book) */}
      <mesh>
        <octahedronGeometry args={[0.5, 0]} />
        <meshPhysicalMaterial
          color={hovered ? "#00ffff" : "#7b61ff"}
          roughness={0}
          transmission={0.6}
          thickness={0.5}
          emissive={hovered ? "#00ffff" : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>

      {/* Label (Billboard) */}
      {hovered && (
        // R3F Html would be better here but simpler to just use mesh for now or rely on UI
        <mesh position={[0, 1, 0]}>
          {/* Placeholder for label if needed in 3D */}
        </mesh>
      )}
    </group>
  );
}
