"use client";

import { useScroll, Stars, Cloud } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import FighterJet from "./FighterJet";
import Spaceship from "./Spaceship";
import { useGameStore } from "@/store/gameStore";

export default function Experience() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const { stage, setStage, setAltitude } = useGameStore();

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 to 1

    // Update Store
    setAltitude(Math.floor(offset * 100000));

    if (groupRef.current) {
      // Rotate the entire world based on scroll
      groupRef.current.rotation.y = offset * Math.PI * 2;

      // Move camera or group to simulate ascent
      // 0.0 - 0.25: Jet taking off / flying
      // 0.25 - 0.5: Transition to Space
      // 0.5 - 0.75: Deep Space / Assignment
      // 0.75 - 1.0: Re-entry / Dashboard

      if (offset < 0.3) {
        if (stage !== "JET") setStage("JET");
        state.camera.position.z = 5 + offset * 2;
      } else if (offset >= 0.3 && offset < 0.6) {
        if (stage !== "MORPH") setStage("MORPH");
      } else {
        if (stage !== "SPACE") setStage("SPACE");
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background Elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* The Hero Vehicles */}
      {stage === "JET" && <FighterJet scale={0.5} position={[0, -1, 0]} />}
      {(stage === "MORPH" || stage === "SPACE") && <Spaceship scale={0.5} position={[0, 0, 0]} visible={true} />}

      {/* Clouds for early stage */}
      {stage === "JET" && (
        <Cloud opacity={0.5} speed={0.4} position={[0, -2, -5]} />
      )}
    </group>
  );
}
