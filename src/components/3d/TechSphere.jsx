import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

const HumanoidTracker = () => {
  const baseRef = useRef();
  const headRef = useRef();
  const torsoRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const eyesRef = useRef();
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates based on the entire window
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseLeave = () => {
      // Reset to center (facing front) when mouse leaves window
      mouseTarget.current.x = 0;
      mouseTarget.current.y = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useFrame((state) => {
    // 1. Sliding Eyes
    const maxEyeX = 0.15; 
    const maxEyeY = 0.1;  
    
    if (eyesRef.current) {
      eyesRef.current.position.x = THREE.MathUtils.lerp(eyesRef.current.position.x, mouseTarget.current.x * maxEyeX, 0.1);
      eyesRef.current.position.y = THREE.MathUtils.lerp(eyesRef.current.position.y, mouseTarget.current.y * maxEyeY, 0.1);
    }
    
    // 2. Base, Head & Torso Rotation Tracking
    const headTargetX = mouseTarget.current.x * Math.PI / 4;
    const headTargetY = mouseTarget.current.y * Math.PI / 6;

    if (baseRef.current) {
      // The entire body base rotates slightly to face the mouse
      baseRef.current.rotation.y = THREE.MathUtils.lerp(baseRef.current.rotation.y, headTargetX * 0.3, 0.02);
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headTargetX * 0.7, 0.05);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -headTargetY, 0.05);
    }

    if (torsoRef.current) {
      torsoRef.current.rotation.y = THREE.MathUtils.lerp(torsoRef.current.rotation.y, headTargetX * 0.3, 0.03);
      torsoRef.current.rotation.x = THREE.MathUtils.lerp(torsoRef.current.rotation.x, -headTargetY * 0.2, 0.03);
    }
    
    // 3. Idle arm animation
    const t = state.clock.elapsedTime;
    if (leftArmRef.current) leftArmRef.current.rotation.z = Math.sin(t) * 0.05 + 0.1;
    if (rightArmRef.current) rightArmRef.current.rotation.z = -Math.sin(t) * 0.05 - 0.1;
  });

  return (
    <group ref={baseRef} position={[0, -1.5, 0]}>
      {/* Torso & Upper Body */}
      <group ref={torsoRef} position={[0, 1.5, 0]}>
        {/* Round Cute Torso */}
        <Cylinder args={[0.6, 0.5, 1.4, 32]}>
           <meshStandardMaterial color="#fff" />
        </Cylinder>
        {/* Glowing Chest Core */}
        <Sphere args={[0.2, 16, 16]} position={[0, 0.2, 0.55]}>
           <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1} />
        </Sphere>
        
        {/* Head */}
        <group ref={headRef} position={[0, 1.4, 0]}>
          {/* Main Head (slightly squashed for cuteness) */}
          <Sphere args={[0.65, 32, 32]} scale={[1.1, 0.9, 1]}>
             <meshStandardMaterial color="#fff" />
          </Sphere>
          
          {/* Cute Earphones */}
          <Cylinder args={[0.2, 0.2, 0.1, 32]} rotation={[0, 0, Math.PI/2]} position={[-0.72, 0, 0]}>
             <meshStandardMaterial color="#2563EB" />
          </Cylinder>
          <Cylinder args={[0.2, 0.2, 0.1, 32]} rotation={[0, 0, Math.PI/2]} position={[0.72, 0, 0]}>
             <meshStandardMaterial color="#2563EB" />
          </Cylinder>

          {/* Antenna */}
          <Cylinder args={[0.02, 0.02, 0.4]} position={[0, 0.7, 0]}>
             <meshStandardMaterial color="#fff" />
          </Cylinder>
          <Sphere args={[0.08, 16, 16]} position={[0, 0.9, 0]}>
             <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
          </Sphere>
          
          {/* Visor (Black screen for face) */}
          <Box args={[0.9, 0.48, 0.3]} position={[0, 0.03, 0.5]}>
             <meshStandardMaterial color="#0B1120" />
          </Box>

          {/* Eyes Group - This moves around the face! */}
          <group ref={eyesRef}>
            <Sphere args={[0.08, 16, 16]} position={[-0.2, 0.05, 0.65]} scale={[1.5, 1, 0.5]}>
               <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={3} />
            </Sphere>
            <Sphere args={[0.08, 16, 16]} position={[0.2, 0.05, 0.65]} scale={[1.5, 1, 0.5]}>
               <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={3} />
            </Sphere>
          </group>
          
          {/* Cute Smiling Mouth */}
          <Torus args={[0.07, 0.01, 16, 32, Math.PI * 0.6]} rotation={[0, 0, Math.PI * 1.2]} position={[0, -0.11, 0.65]}>
             <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
          </Torus>
        </group>

        {/* Arms */}
        <group ref={leftArmRef} position={[-0.9, 0.4, 0]}>
          <Cylinder args={[0.15, 0.15, 0.9]} position={[0, -0.4, 0]}>
             <meshStandardMaterial color="#fff" />
          </Cylinder>
          {/* Hands */}
          <Sphere args={[0.18, 16, 16]} position={[0, -0.85, 0]}>
             <meshStandardMaterial color="#2563EB" />
          </Sphere>
        </group>
        <group ref={rightArmRef} position={[0.9, 0.4, 0]}>
          <Cylinder args={[0.15, 0.15, 0.9]} position={[0, -0.4, 0]}>
             <meshStandardMaterial color="#fff" />
          </Cylinder>
           {/* Hands */}
          <Sphere args={[0.18, 16, 16]} position={[0, -0.85, 0]}>
             <meshStandardMaterial color="#2563EB" />
          </Sphere>
        </group>
      </group>

      {/* Legs (Cute small stumpy legs) */}
      <group position={[-0.25, 0.7, 0]}>
        <Cylinder args={[0.15, 0.15, 0.8]} position={[0, -0.4, 0]}>
           <meshStandardMaterial color="#fff" />
        </Cylinder>
        <Box args={[0.35, 0.1, 0.4]} position={[0, -0.8, 0.05]}>
           <meshStandardMaterial color="#2563EB" />
        </Box>
      </group>
      <group position={[0.25, 0.7, 0]}>
        <Cylinder args={[0.15, 0.15, 0.8]} position={[0, -0.4, 0]}>
           <meshStandardMaterial color="#fff" />
        </Cylinder>
        <Box args={[0.35, 0.1, 0.4]} position={[0, -0.8, 0.05]}>
           <meshStandardMaterial color="#2563EB" />
        </Box>
      </group>
    </group>
  );
};

const TechScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00E5FF" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00E5FF" />
      
      <HumanoidTracker />
    </Canvas>
  );
};

export default TechScene;
