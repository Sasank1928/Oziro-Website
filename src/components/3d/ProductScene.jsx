import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere, Torus, Cone } from '@react-three/drei';
import * as THREE from 'three';

const colors = {
  primary: '#4DFFFF',
  secondary: '#C09EFF',
  dark: '#3A4E8C',
  gray: '#455B8B',
  metal: '#8FAEE0',
};

const DroneModel = ({ staticMode }) => {
  const group = useRef();
  const fan1 = useRef();
  const fan2 = useRef();
  const fan3 = useRef();
  const fan4 = useRef();

  useFrame((state, delta) => {
    if (staticMode) return;
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.2;
      group.current.rotation.x = Math.sin(t) * 0.1;
      group.current.rotation.z = Math.cos(t) * 0.1;
    }
    // Spin fans very fast
    [fan1, fan2, fan3, fan4].forEach(fan => {
      if (fan.current) fan.current.rotation.y += delta * 20;
    });
  });

  return (
    <group ref={group} scale={1.1}>
      {/* Central Body */}
      <Cylinder args={[0.3, 0.3, 1, 16]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={colors.dark} metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Box args={[0.4, 0.4, 0.8]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color={colors.metal} wireframe />
      </Box>
      <Sphere args={[0.15, 16, 16]} position={[0, -0.1, 0.4]}>
        <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={2} />
      </Sphere>

      {/* Arms & Fans */}
      {[
        [-0.6, 0.6], [0.6, 0.6], [-0.6, -0.6], [0.6, -0.6]
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Arm connector */}
          <Cylinder args={[0.05, 0.05, 0.8]} rotation={[0, 0, Math.PI / 2]} position={[-x / 2, 0, -z / 2]}>
            <meshStandardMaterial color={colors.metal} />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 0.8]} rotation={[Math.PI / 2, 0, 0]} position={[-x / 2, 0, -z / 2]}>
            <meshStandardMaterial color={colors.metal} />
          </Cylinder>

          {/* Fan Guard */}
          <Torus args={[0.3, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={colors.primary} wireframe />
          </Torus>
          {/* Rotating Fan */}
          <group ref={i === 0 ? fan1 : i === 1 ? fan2 : i === 2 ? fan3 : fan4}>
            <Box args={[0.5, 0.02, 0.08]}>
              <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={1} />
            </Box>
            <Box args={[0.08, 0.02, 0.5]}>
              <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={1} />
            </Box>
          </group>
        </group>
      ))}
    </group>
  );
};

const RobotModel = ({ staticMode }) => {
  const group = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();

  useFrame((state) => {
    if (staticMode) return;
    const t = state.clock.elapsedTime * 4;
    if (group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.05;
    }
    if (leftArm.current) leftArm.current.rotation.x = Math.sin(t) * 0.5;
    if (rightArm.current) rightArm.current.rotation.x = Math.sin(t + Math.PI) * 0.5;
    if (leftLeg.current) leftLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.5;
    if (rightLeg.current) rightLeg.current.rotation.x = Math.sin(t) * 0.5;
  });

  return (
    <group ref={group} scale={1.0} position={[0, 0.5, 0]}>
      {/* Head */}
      <Sphere args={[0.25, 32, 32]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={2} transparent opacity={0.9} />
      </Sphere>

      {/* Torso */}
      <Box args={[0.7, 1, 0.4]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={colors.primary} wireframe />
      </Box>
      <Box args={[0.6, 0.9, 0.3]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={colors.dark} transparent opacity={0.8} />
      </Box>

      {/* Arms */}
      <group position={[-0.45, 0.9, 0]} ref={leftArm}>
        <Cylinder args={[0.08, 0.08, 0.8]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>
      <group position={[0.45, 0.9, 0]} ref={rightArm}>
        <Cylinder args={[0.08, 0.08, 0.8]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>

      {/* Legs */}
      <group position={[-0.2, 0, 0]} ref={leftLeg}>
        <Cylinder args={[0.1, 0.1, 0.9]} position={[0, -0.4, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>
      <group position={[0.2, 0, 0]} ref={rightLeg}>
        <Cylinder args={[0.1, 0.1, 0.9]} position={[0, -0.4, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>
    </group>
  );
};

const DogModel = ({ staticMode }) => {
  const group = useRef();
  const flLeg = useRef();
  const frLeg = useRef();
  const blLeg = useRef();
  const brLeg = useRef();

  useFrame((state) => {
    if (staticMode) return;
    const t = state.clock.elapsedTime * 6;
    if (group.current) {
      group.current.position.y = Math.sin(t * 2) * 0.05;
    }
    // Quadruped walk cycle
    if (flLeg.current) flLeg.current.rotation.x = Math.sin(t) * 0.4;
    if (brLeg.current) brLeg.current.rotation.x = Math.sin(t) * 0.4;
    if (frLeg.current) frLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.4;
    if (blLeg.current) blLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.4;
  });

  return (
    <group ref={group} scale={1.0} position={[0, 0.2, 0]}>
      {/* Body */}
      <Box args={[0.5, 0.4, 1.2]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color={colors.dark} metalness={0.8} />
      </Box>
      <Box args={[0.55, 0.45, 1.25]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color={colors.primary} wireframe />
      </Box>

      {/* Head */}
      <Box args={[0.3, 0.3, 0.4]} position={[0, 0.7, 0.7]}>
        <meshStandardMaterial color={colors.metal} />
      </Box>
      <Box args={[0.2, 0.1, 0.1]} position={[0, 0.75, 0.9]}>
        <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={2} />
      </Box>

      {/* Legs */}
      <group position={[-0.3, 0.5, 0.4]} ref={flLeg}>
        <Cylinder args={[0.06, 0.04, 0.6]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>
      <group position={[0.3, 0.5, 0.4]} ref={frLeg}>
        <Cylinder args={[0.06, 0.04, 0.6]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>
      <group position={[-0.3, 0.5, -0.4]} ref={blLeg}>
        <Cylinder args={[0.06, 0.04, 0.6]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>
      <group position={[0.3, 0.5, -0.4]} ref={brLeg}>
        <Cylinder args={[0.06, 0.04, 0.6]} position={[0, -0.3, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>
      </group>
    </group>
  );
};

const AgvModel = ({ staticMode }) => {
  const group = useRef();
  const scanner = useRef();
  const wheels = useRef([]);

  useFrame((state, delta) => {
    if (staticMode) return;
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 3) * 0.02 - 0.2;
    }
    if (scanner.current) {
      scanner.current.rotation.y += delta * 15;
    }
    wheels.current.forEach(w => {
      if (w) w.rotation.x -= delta * 5;
    });
  });

  return (
    <group ref={group} scale={1.0} position={[0, -0.2, 0]}>
      {/* Flatbed Base */}
      <Box args={[1.4, 0.2, 2.2]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color={colors.dark} metalness={0.9} roughness={0.1} />
      </Box>
      <Box args={[1.45, 0.05, 2.25]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={0.5} wireframe />
      </Box>
      
      {/* Sensor/Control Tower */}
      <Box args={[0.8, 0.7, 0.6]} position={[0, 0.85, 0.6]}>
        <meshStandardMaterial color={colors.metal} />
      </Box>
      <Box args={[0.6, 0.4, 0.65]} position={[0, 0.9, 0.6]}>
        <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={1} transparent opacity={0.8} />
      </Box>
      
      {/* LiDAR Scanner */}
      <Cylinder args={[0.15, 0.15, 0.2]} position={[0, 1.3, 0.6]} ref={scanner}>
        <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={2} />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.1]} position={[0, 1.2, 0.6]}>
        <meshStandardMaterial color="#111" />
      </Cylinder>

      {/* Cargo Payload (Holographic Box) */}
      <Box args={[1.0, 0.6, 1.0]} position={[0, 0.8, -0.4]}>
        <meshStandardMaterial color={colors.primary} transparent opacity={0.3} />
      </Box>
      <Box args={[1.0, 0.6, 1.0]} position={[0, 0.8, -0.4]}>
        <meshStandardMaterial color={colors.primary} wireframe />
      </Box>

      {/* Wheels */}
      {[
        [-0.5, 0.8], [0.5, 0.8], [-0.5, -0.8], [0.5, -0.8]
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.2, z]} ref={el => wheels.current[i] = el}>
          <Cylinder args={[0.2, 0.2, 0.2, 32]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#111" roughness={0.9} />
            <Torus args={[0.1, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={2} />
            </Torus>
            {/* Spokes to make rotation visible */}
            <Box args={[0.3, 0.22, 0.05]}>
              <meshStandardMaterial color={colors.primary} />
            </Box>
            <Box args={[0.05, 0.22, 0.3]}>
              <meshStandardMaterial color={colors.primary} />
            </Box>
          </Cylinder>
        </group>
      ))}
    </group>
  );
};

const CarModel = ({ staticMode }) => {
  const wheels = useRef([]);
  const group = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = Math.sin(t * 10) * 0.02;
    }
    wheels.current.forEach(w => {
      if (w) w.rotation.x -= delta * 10;
    });
  });

  return (
    <group ref={group} scale={1.0} position={[0, -0.2, 0]}>
      {/* Chassis */}
      <Box args={[1.2, 0.4, 2]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={colors.dark} metalness={0.9} roughness={0.1} />
      </Box>
      {/* Glowing accents */}
      <Box args={[1.25, 0.05, 2.05]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={1.5} />
      </Box>
      <Box args={[0.8, 0.3, 1.2]} position={[0, 0.8, -0.2]}>
        <meshStandardMaterial color={colors.metal} transparent opacity={0.6} />
      </Box>

      {/* Wheels */}
      {[
        [-0.7, 0.8], [0.7, 0.8], [-0.7, -0.8], [0.7, -0.8]
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.3, z]} ref={el => wheels.current[i] = el}>
          <Cylinder args={[0.3, 0.3, 0.2, 32]} rotation={[0, 0, Math.PI / 2]}>
            <meshStandardMaterial color="#111" roughness={0.9} />
            <Torus args={[0.2, 0.02, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={2} />
            </Torus>
            {/* Spokes to make rotation visible */}
            <Box args={[0.5, 0.22, 0.05]}>
              <meshStandardMaterial color={colors.primary} />
            </Box>
            <Box args={[0.05, 0.22, 0.5]}>
              <meshStandardMaterial color={colors.primary} />
            </Box>
          </Cylinder>
        </group>
      ))}
    </group>
  );
};

const ArmModel = ({ staticMode }) => {
  const base = useRef();
  const joint1 = useRef();
  const joint2 = useRef();

  useFrame((state) => {
    if (staticMode) return;
    const t = state.clock.elapsedTime * 1.5;
    if (base.current) base.current.rotation.y = Math.sin(t * 0.5) * 1.5;
    if (joint1.current) joint1.current.rotation.x = Math.sin(t) * 0.5 + 0.5;
    if (joint2.current) joint2.current.rotation.x = Math.sin(t * 1.5) * 0.8 - 0.5;
  });

  return (
    <group scale={1.0} position={[0, -0.6, 0]}>
      {/* Base */}
      <Cylinder args={[0.5, 0.6, 0.2, 32]}>
        <meshStandardMaterial color={colors.dark} />
      </Cylinder>

      <group ref={base}>
        <Cylinder args={[0.3, 0.3, 0.4, 32]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color={colors.metal} />
        </Cylinder>

        {/* Lower Arm */}
        <group position={[0, 0.5, 0]} ref={joint1}>
          <Sphere args={[0.25, 32, 32]}>
            <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={1} />
          </Sphere>
          <Cylinder args={[0.15, 0.15, 1.2]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color={colors.metal} />
          </Cylinder>

          {/* Upper Arm */}
          <group position={[0, 1.2, 0]} ref={joint2}>
            <Sphere args={[0.2, 32, 32]}>
              <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={1} />
            </Sphere>
            <Cylinder args={[0.1, 0.1, 0.8]} position={[0, 0.4, 0]}>
              <meshStandardMaterial color={colors.metal} />
            </Cylinder>

            {/* Gripper */}
            <group position={[0, 0.8, 0]}>
              <Box args={[0.3, 0.1, 0.1]}>
                <meshStandardMaterial color={colors.dark} />
              </Box>
              <Box args={[0.05, 0.3, 0.1]} position={[-0.12, 0.2, 0]}>
                <meshStandardMaterial color={colors.primary} emissive={colors.primary} />
              </Box>
              <Box args={[0.05, 0.3, 0.1]} position={[0.12, 0.2, 0]}>
                <meshStandardMaterial color={colors.primary} emissive={colors.primary} />
              </Box>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

const HologramModel = ({ staticMode }) => {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();
  const core = useRef();

  useFrame((state, delta) => {
    if (staticMode) return;
    if (ring1.current) {
      ring1.current.rotation.x += delta;
      ring1.current.rotation.y += delta * 0.5;
    }
    if (ring2.current) {
      ring2.current.rotation.y += delta * 1.5;
      ring2.current.rotation.z += delta;
    }
    if (ring3.current) {
      ring3.current.rotation.x -= delta;
      ring3.current.rotation.z -= delta * 1.2;
    }
    if (core.current) {
      core.current.rotation.y += delta * 2;
    }
  });

  return (
    <group scale={1.6}>
      <group ref={ring1}>
        <Torus args={[0.8, 0.02, 16, 64]}>
          <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={2} />
        </Torus>
      </group>
      <group ref={ring2}>
        <Torus args={[0.6, 0.02, 16, 64]}>
          <meshStandardMaterial color={colors.secondary} emissive={colors.secondary} emissiveIntensity={2} />
        </Torus>
      </group>
      <group ref={ring3}>
        <Torus args={[0.4, 0.02, 16, 64]}>
          <meshStandardMaterial color={colors.primary} emissive={colors.primary} emissiveIntensity={2} />
        </Torus>
      </group>
      <group ref={core}>
        <Box args={[0.3, 0.3, 0.3]}>
          <meshStandardMaterial color={colors.secondary} wireframe emissive={colors.secondary} emissiveIntensity={3} />
        </Box>
      </group>
    </group>
  );
};

const ProductScene = ({ productId, isThumbnail = false, staticMode = false }) => {
  const id = productId?.toLowerCase();

  let Model = HologramModel;
  if (id === 'drone') Model = DroneModel;
  else if (id === 'humanoid' || id === 'robot') Model = RobotModel;
  else if (id === 'dog' || id === 'quaddog') Model = DogModel;
  else if (id === 'agv') Model = AgvModel;
  else if (id === 'car') Model = CarModel;
  else if (id === 'arm' || id === 'roboarm') Model = ArmModel;

  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} color={colors.primary} />
      <pointLight position={[-5, 5, -5]} intensity={1.8} color={colors.secondary} />
      <pointLight position={[0, -2, 0]} intensity={1.5} color={colors.primary} />

      <Model staticMode={staticMode} />

      {/* Disable orbit controls to prevent scroll hijacking and keep it fixed */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false}
        autoRotate={!staticMode} 
        autoRotateSpeed={1} 
      />
    </Canvas>
  );
};

export default ProductScene;
