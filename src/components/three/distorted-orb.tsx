"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from "@react-three/drei";

function Orb({ colorA, colorB }: { colorA: string; colorB: string }) {
  return (
    <Float speed={1.6} rotationIntensity={1.1} floatIntensity={1.4}>
      {/* solid distorted core */}
      <Icosahedron args={[1.35, 12]}>
        <MeshDistortMaterial
          color={colorA}
          emissive={colorB}
          emissiveIntensity={0.4}
          roughness={0.12}
          metalness={0.65}
          distort={0.42}
          speed={2.1}
        />
      </Icosahedron>
      {/* faceted wireframe shell */}
      <Icosahedron args={[1.62, 1]}>
        <meshBasicMaterial color={colorB} wireframe transparent opacity={0.16} />
      </Icosahedron>
    </Float>
  );
}

export default function DistortedOrbScene({
  colorA,
  colorB
}: {
  colorA: string;
  colorB: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={2.6} color={colorB} />
      <pointLight position={[-5, -3, -2]} intensity={1.8} color={colorA} />
      <pointLight position={[0, 3, -4]} intensity={1.2} color={colorB} />
      <React.Suspense fallback={null}>
        <Orb colorA={colorA} colorB={colorB} />
        <Sparkles count={60} scale={6} size={2.4} speed={0.4} opacity={0.6} color={colorB} />
      </React.Suspense>
    </Canvas>
  );
}
