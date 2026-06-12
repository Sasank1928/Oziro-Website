import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Icosahedron, MeshDistortMaterial, Sphere } from '@react-three/drei';

const AICore = () => {
  const coreRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.2;
        coreRef.current.rotation.x += delta * 0.1;
    }
    if (ringRef1.current) {
        ringRef1.current.rotation.x += delta * 0.5;
        ringRef1.current.rotation.y += delta * 0.2;
    }
    if (ringRef2.current) {
        ringRef2.current.rotation.y -= delta * 0.3;
        ringRef2.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group position={[3, 0, -2]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron ref={coreRef} args={[1.5, 2]}>
          <MeshDistortMaterial 
            color="#00E5FF" 
            emissive="#00E5FF" 
            emissiveIntensity={0.5} 
            wireframe 
            distort={0.4} 
            speed={2} 
          />
        </Icosahedron>
        
        {/* Holographic Rings */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshBasicMaterial color="#7B61FF" transparent opacity={0.5} />
        </mesh>
        
        <mesh ref={ringRef2} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.3} />
        </mesh>

        <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </Sphere>
      </Float>
    </group>
  );
};

const Particles = () => {
  return (
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
  );
};

const HeroScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00E5FF" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#7B61FF" />
      
      <Particles />
      <AICore />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 2 - 0.1}
      />
    </Canvas>
  );
};

export default HeroScene;
