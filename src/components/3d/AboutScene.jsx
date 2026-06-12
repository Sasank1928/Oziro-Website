import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere, MeshWobbleMaterial, Center } from '@react-three/drei';

const AbstractRobot = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.5;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <group ref={groupRef}>
      <Center>
        {/* Head */}
        <Box args={[1, 1, 1]} position={[0, 2, 0]}>
          <meshStandardMaterial color="#00E5FF" wireframe />
        </Box>
        {/* Eye */}
        <Sphere args={[0.2, 16, 16]} position={[0, 2, 0.5]}>
          <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={2} />
        </Sphere>
        
        {/* Body */}
        <Cylinder args={[0.8, 1, 2, 16]} position={[0, 0, 0]}>
          <MeshWobbleMaterial color="#0B1120" factor={0.2} speed={2} />
        </Cylinder>
        
        {/* Arms */}
        <Box args={[0.4, 2, 0.4]} position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <meshStandardMaterial color="#00E5FF" wireframe />
        </Box>
        <Box args={[0.4, 2, 0.4]} position={[1.2, 0, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <meshStandardMaterial color="#00E5FF" wireframe />
        </Box>
      </Center>
    </group>
  );
};

const AboutScene = () => {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00E5FF" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#7B61FF" />
      
      <AbstractRobot />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.0} />
    </Canvas>
  );
};

export default AboutScene;
