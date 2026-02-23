import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpaceArtifact from "./SpaceArtifact";

const MOCK_ASSIGNMENTS = [
  { id: 1, title: "The Awakening", status: "UPLOADED", score: "95/100", element: "AIR", artifactType: "SPELL_BOOK" },
  { id: 2, title: "Algo-Rhythms", status: "PENDING", score: "TBD", element: "VOID", artifactType: "SCROLL" },
  { id: 3, title: "Inheritance Protocol", status: "GRADED", score: "88/100", element: "FIRE", artifactType: "CRYSTAL" },
];

export default function Spaceship(props: any) {
  const ref = useRef<THREE.Group>(null);
  const [assignments, setAssignments] = useState<any[]>(MOCK_ASSIGNMENTS);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={ref} {...props}>
      {/* Sci-Fi Spaceship Geometry */}
      {/* Core */}
      <mesh>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#fff" wireframe />
      </mesh>
      {/* Ring */}
      <mesh rotation={[1.5, 0, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} />
      </mesh>

      {/* Floating Artifacts (Assignments) */}
      {assignments.map((assignment, i) => {
        const angle = (i / assignments.length) * Math.PI * 2;
        const radius = 3.5; // Increased radius
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <SpaceArtifact
            key={assignment.id}
            position={[x, 0, z]}
            data={assignment}
          />
        );
      })}
    </group>
  );
}
