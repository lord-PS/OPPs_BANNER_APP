"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Environment, Stars, Cloud } from "@react-three/drei";
import { Suspense } from "react";
import Experience from "./Experience"; // We will create this
import GameUI from "./GameUI"; // Overlay UI

export default function GameScene() {
  return (
    <div className="h-screen w-full relative bg-black">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.2}>
            <Experience />
          </ScrollControls>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <GameUI />
    </div>
  );
}
