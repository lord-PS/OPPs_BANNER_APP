"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

/* ===== FLOATING PARTICLES ===== */
function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const mousePos = useRef({ x: 0, y: 0 });

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [count]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const geo = mesh.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (Math.abs(arr[i * 3]) > 15) velocities[i * 3] *= -1;
      if (Math.abs(arr[i * 3 + 1]) > 15) velocities[i * 3 + 1] *= -1;
      if (Math.abs(arr[i * 3 + 2]) > 15) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // Subtle camera movement based on mouse
    state.camera.position.x += (mousePos.current.x * 0.5 - state.camera.position.x) * 0.02;
    state.camera.position.y += (mousePos.current.y * 0.3 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00e5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ===== GEOMETRIC WIREFRAMES ===== */
function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null!);
  const icoRef = useRef<THREE.Mesh>(null!);
  const torusRef = useRef<THREE.Mesh>(null!);
  const octaRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.15;
      icoRef.current.rotation.z = t * 0.1;
      icoRef.current.position.y = Math.sin(t * 0.5) * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.15;
      torusRef.current.position.y = Math.cos(t * 0.4) * 0.5;
    }
    if (octaRef.current) {
      octaRef.current.rotation.z = t * 0.12;
      octaRef.current.rotation.x = t * 0.08;
      octaRef.current.position.y = Math.sin(t * 0.6 + 1) * 0.4;
    }
  });

  const wireMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#00e5ff",
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      }),
    []
  );

  return (
    <group ref={groupRef}>
      <mesh ref={icoRef} position={[0, 0, 0]} material={wireMat}>
        <icosahedronGeometry args={[2.5, 1]} />
      </mesh>
      <mesh ref={torusRef} position={[4, 1, -3]} material={wireMat}>
        <torusGeometry args={[1.5, 0.4, 8, 20]} />
      </mesh>
      <mesh ref={octaRef} position={[-4, -1, -2]} material={wireMat}>
        <octahedronGeometry args={[1.5, 0]} />
      </mesh>
    </group>
  );
}

/* ===== FOG LINE ===== */
function FogPlane() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.z = t * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -8]} scale={[40, 40, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#050510" transparent opacity={0.5} />
    </mesh>
  );
}

/* ===== MAIN SCENE ===== */
export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 8, 30]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#00e5ff" />
        <pointLight position={[-5, -5, 3]} intensity={0.3} color="#7b61ff" />
        <Particles count={1500} />
        <GeometricShapes />
        <FogPlane />
      </Canvas>
    </div>
  );
}
