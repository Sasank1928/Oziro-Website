import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Torus, Box, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const QuantumCore = () => {
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const nodesRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Core rotation and pulse
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
      coreRef.current.rotation.x += delta * 0.2;
      const scale = 1 + Math.sin(t * 3) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Orbiting rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.4;
      ring2Ref.current.rotation.z += delta * 0.5;
    }

    // Orbiting nodes group
    if (nodesRef.current) {
      nodesRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Central Pulsing Liquid-Metal AI Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <MeshDistortMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={1.2}
          distort={0.4}
          speed={2.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Internal Core Light glow */}
      <pointLight distance={10} intensity={3} color="#00E5FF" />

      {/* Nested Wireframe Polyhedron for high-tech enclosure */}
      <group>
        <Sphere args={[1.7, 12, 12]}>
          <meshStandardMaterial color="#7B61FF" wireframe transparent opacity={0.4} />
        </Sphere>
      </group>

      {/* Holographic Data Rings */}
      <Torus ref={ring1Ref} args={[2.0, 0.02, 8, 64]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
      </Torus>
      <Torus ref={ring2Ref} args={[2.3, 0.015, 8, 64]} rotation={[0, Math.PI / 4, 0]}>
        <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={1.5} />
      </Torus>

      {/* Synaptic Network Nodes orbiting the core */}
      <group ref={nodesRef}>
        {/* Connection paths */}
        <Torus args={[2.6, 0.005, 8, 64]} rotation={[Math.PI/2, 0, 0]}>
          <meshStandardMaterial color="#2563EB" transparent opacity={0.2} />
        </Torus>
        
        {/* Nodes */}
        <Sphere args={[0.06, 16, 16]} position={[2.6, 0, 0]}>
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={3} />
        </Sphere>
        <Sphere args={[0.06, 16, 16]} position={[-2.6, 0, 0]}>
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={3} />
        </Sphere>
        <Sphere args={[0.06, 16, 16]} position={[0, 0, 2.6]}>
          <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={3} />
        </Sphere>
        <Sphere args={[0.06, 16, 16]} position={[0, 0, -2.6]}>
          <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={3} />
        </Sphere>
        
        {/* Floating AI Microchips */}
        <group position={[1.8, 1.8, 0]}>
          <Box args={[0.2, 0.2, 0.05]}>
            <meshStandardMaterial color="#fff" wireframe />
          </Box>
        </group>
        <group position={[-1.8, -1.8, 0]}>
          <Box args={[0.2, 0.2, 0.05]}>
            <meshStandardMaterial color="#fff" wireframe />
          </Box>
        </group>
      </group>
    </group>
  );
};

const GlobeScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#7B61FF" />
      
      <QuantumCore />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
};

export default GlobeScene;
