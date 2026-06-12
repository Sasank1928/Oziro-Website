import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const CpuModel = () => {
  const coreRef = useRef();
  const hologramRef = useRef();
  const particlesRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Rotate central quantum crystal
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.8;
      coreRef.current.rotation.x = Math.sin(t * 1.5) * 0.2;
      const pulse = 1 + Math.sin(t * 4) * 0.08;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Spin floating hologram rings
    if (hologramRef.current) {
      hologramRef.current.rotation.y -= delta * 0.4;
      hologramRef.current.position.y = 0.5 + Math.sin(t * 2) * 0.15;
    }

    // Animate data particles rising
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child) => {
        if (child) {
          child.position.y += delta * 0.5;
          if (child.position.y > 1.5) {
            child.position.y = 0.2;
          }
          child.rotation.y += delta * 2;
          child.rotation.x += delta;
        }
      });
    }
  });

  // Generate some random positions for data particles
  const particleData = Array.from({ length: 12 }, () => ({
    x: (Math.random() - 0.5) * 1.2,
    z: (Math.random() - 0.5) * 1.2,
    y: Math.random() * 1.3 + 0.2,
    scale: Math.random() * 0.04 + 0.02,
    color: Math.random() > 0.5 ? '#00E5FF' : '#7B61FF',
  }));

  return (
    <group position={[0, -0.4, 0]} rotation={[0.4, -0.6, 0]}>
      {/* Main Motherboard Base */}
      <Box args={[3.2, 0.1, 3.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0B132B" roughness={0.7} metalness={0.2} />
      </Box>

      {/* Gold Edge Connector Pins */}
      {Array.from({ length: 8 }).map((_, i) => {
        const offset = -1.4 + i * 0.4;
        return (
          <group key={i}>
            {/* Left side pins */}
            <Box args={[0.15, 0.08, 0.05]} position={[-1.625, 0.02, offset]}>
              <meshStandardMaterial color="#FFB300" metalness={0.9} roughness={0.1} />
            </Box>
            {/* Right side pins */}
            <Box args={[0.15, 0.08, 0.05]} position={[1.625, 0.02, offset]}>
              <meshStandardMaterial color="#FFB300" metalness={0.9} roughness={0.1} />
            </Box>
          </group>
        );
      })}

      {/* CPU Metal Bracket / Heat Spreader Socket */}
      <Box args={[1.8, 0.15, 1.8]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#3A4F7C" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Silicon Chip Die */}
      <Box args={[1.2, 0.08, 1.2]} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#1C2541" roughness={0.5} />
      </Box>

      {/* Glowing Circuit Lines on board */}
      <Box args={[2.8, 0.02, 0.05]} position={[0, 0.06, 0.8]}>
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
      </Box>
      <Box args={[2.8, 0.02, 0.05]} position={[0, 0.06, -0.8]}>
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
      </Box>
      <Box args={[0.05, 0.02, 2.8]} position={[0.8, 0.06, 0]}>
        <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={2} />
      </Box>
      <Box args={[0.05, 0.02, 2.8]} position={[-0.8, 0.06, 0]}>
        <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={2} />
      </Box>

      {/* Capacitors & Components around CPU */}
      <Cylinder args={[0.12, 0.12, 0.35, 16]} position={[-1.2, 0.2, -1.2]}>
        <meshStandardMaterial color="#3E92CC" metalness={0.7} />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 0.35, 16]} position={[-0.9, 0.2, -1.2]}>
        <meshStandardMaterial color="#3E92CC" metalness={0.7} />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 0.35, 16]} position={[1.2, 0.2, 1.2]}>
        <meshStandardMaterial color="#3E92CC" metalness={0.7} />
      </Cylinder>
      <Cylinder args={[0.12, 0.12, 0.35, 16]} position={[0.9, 0.2, 1.2]}>
        <meshStandardMaterial color="#3E92CC" metalness={0.7} />
      </Cylinder>

      {/* Central Pulsing Quantum Processor Crystal (Core) */}
      <group position={[0, 0.3, 0]} ref={coreRef}>
        <Box args={[0.4, 0.4, 0.4]}>
          <meshStandardMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={3} 
            transparent 
            opacity={0.8}
            roughness={0.1}
          />
        </Box>
        {/* Wireframe outer core cube */}
        <Box args={[0.6, 0.6, 0.6]}>
          <meshStandardMaterial color="#7B61FF" wireframe />
        </Box>
      </group>

      {/* Floating Holographic Square Ring above CPU */}
      <group ref={hologramRef} position={[0, 0.6, 0]}>
        {/* Hologram Box Rim */}
        <Box args={[1.4, 0.02, 1.4]}>
          <meshStandardMaterial color="#00E5FF" wireframe emissive="#00E5FF" emissiveIntensity={2} />
        </Box>
        {/* Core spotlight beam */}
        <Cylinder args={[0.5, 0.5, 0.4, 32, 1, true]} position={[0, -0.2, 0]}>
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.15} side={THREE.DoubleSide} />
        </Cylinder>
      </group>

      {/* Synaptic/Data Particles Floating up from core */}
      <group ref={particlesRef}>
        {particleData.map((p, i) => (
          <Box key={i} args={[p.scale, p.scale, p.scale]} position={[p.x, p.y, p.z]}>
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={2} />
          </Box>
        ))}
      </group>
    </group>
  );
};

const CpuScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 3]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[0, 0.5, 0]} intensity={3} color="#00E5FF" />
      <pointLight position={[-3, -3, -3]} intensity={1.5} color="#7B61FF" />
      
      <CpuModel />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

export default CpuScene;
