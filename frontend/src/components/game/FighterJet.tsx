"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FighterJet(props: any) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      // Banking effect based on mouse x
      const x = state.mouse.x;
      const y = state.mouse.y;

      ref.current.rotation.z = -x * 0.5; // Bank left/right
      ref.current.rotation.x = -y * 0.2; // Pitch up/down
    }
  });

  return (
    <group ref={ref} {...props}>
      {/* Simple Geometry Representation of a Jet */}
      {/* Fuselage */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.5, 3, 32]} />
        <meshStandardMaterial color="#333" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, -0.5, 0.5]} rotation={[1.5, 0, 0]}>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial color="#444" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Cockpit */}
      <mesh position={[0, 0.5, 0.2]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
      {/* Engine Glow */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 0.5, 32]} />
        <meshStandardMaterial color="#ff5500" emissive="#ff5500" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}
