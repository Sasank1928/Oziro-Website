import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { BsLayers, BsMortarboard, BsPlugin, BsBoxes } from 'react-icons/bs';
import styles from './Labs.module.css';
import hologramAvatar from '../assets/hologram_avatar.png';


const researchPillars = [
  {
    icon: BsBoxes,
    title: "Deep Reinforcement Learning",
    desc: "Training robotic joints and bipeds/quadrupeds in physical simulations utilizing millions of training iterations to achieve organic, self-stabilizing locomotion."
  },
  {
    icon: BsLayers,
    title: "Real-time Sensor Fusion",
    desc: "Fusing raw data from stereo depth cameras, micro-solid-state LiDAR, and GPS RTK sensors at sub-millisecond rates to ensure situational awareness."
  },
  {
    icon: BsPlugin,
    title: "Dexterous Manipulation Networks",
    desc: "Developing self-adjusting grip profiles based on tactical tactile feedback arrays, enabling robotic hands to pick up fruits, eggs, and glass tubes."
  },
  {
    icon: BsMortarboard,
    title: "Predictive Edge SLAM",
    desc: "Compiling semantic 3D floor structures directly on-device, allowing drones and AGVs to navigate in offline and GPS-denied environments."
  }
];

const publications = [
  {
    tag: "Conference Paper",
    title: "End-to-End Locomotion Control of Bipedal Robots via Adversarial Skill Networks",
    journal: "IEEE Transactions on Robotics (2025)",
    authors: "Dr. A. Sharma, Prof. K. Vance"
  },
  {
    tag: "Patent Application",
    title: "Distributed Spatial SLAM and Path-Finding Routing for Heavy Logistics Fleets",
    journal: "US Patent App #18/924,510 (2025)",
    authors: "Oziro R&D Labs Team"
  },
  {
    tag: "Whitepaper",
    title: "Next-Gen Tactile Fingertips with Sub-Millimeter Edge Force Resolution",
    journal: "Oziro Technical Whitepaper Vol. 4 (2026)",
    authors: "M. Patel, Dr. L. Chen"
  }
];

const Labs = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Hero split with 3D brain synapse */}
        <div className={styles.heroSplit}>
          <div className={styles.heroText}>
            <span className={styles.tag}>Oziro Research Labs</span>
            <h1 className={styles.title}>Advancing Autonomous <br /><span className="text-gradient">Intelligence</span></h1>
            <p className={styles.desc}>
              At Oziro Tech AI World, our research engineers map out the next generation of robotic dexterity and spatial cognitive algorithms. We build the artificial neural frameworks that transform static machines into adaptive, learning assistants.
            </p>
          </div>

          <div className={styles.canvasCol}>
            <div className={styles.canvasWrapper}>
              <img src={hologramAvatar} alt="Oziro Volumetric Core Simulation" className={styles.labsImage} />
            </div>
            <p className={styles.canvasHint}>Pulsating Neural Network Simulation Core</p>
          </div>
        </div>

        {/* Pillars Section */}
        <section className={styles.pillarsSection}>
          <h2 className={styles.sectionTitle}>Core Research Pillars</h2>
          <div className={styles.pillarsGrid}>
            {researchPillars.map((p, i) => (
              <div key={i} className={`${styles.pillarCard} glass-panel`}>
                <div className={styles.pillarIconWrapper}>
                  <p.icon className={styles.pillarIcon} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications section */}
        <section className={styles.pubSection}>
          <h2 className={styles.sectionTitle}>Patents & Publications</h2>
          <div className={styles.pubList}>
            {publications.map((pub, i) => (
              <div key={i} className={`${styles.pubCard} glass-panel`}>
                <div className={styles.pubHeader}>
                  <span className={styles.pubTag}>{pub.tag}</span>
                  <span className={styles.pubJournal}>{pub.journal}</span>
                </div>
                <h3>{pub.title}</h3>
                <p className={styles.pubAuthors}>Authors: {pub.authors}</p>
                <button className={styles.downloadBtn}>Read Abstract &rarr;</button>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Simulator Callout with Performance Details */}
        <section className={`${styles.simulatorCallout} glass-panel`}>
          <div className={styles.simContent}>
            <h2>Oziro Simulation Sandbox</h2>
            <p>Develop, test, and deploy bipedal locomotion policies and robotic kinematics in our high-fidelity virtual environment. Fully integrated with ROS 2 and Gazebo physics engines.</p>
            
            <div className={styles.simGrid}>
              <div className={styles.simMetric}>
                <span className={styles.simValue}>1000 Hz</span>
                <span className={styles.simLabel}>Physics Step Rate</span>
              </div>
              <div className={styles.simMetric}>
                <span className={styles.simValue}>60 FPS</span>
                <span className={styles.simLabel}>WebGL2 Rendering</span>
              </div>
              <div className={styles.simMetric}>
                <span className={styles.simValue}>2,048</span>
                <span className={styles.simLabel}>Parallel Trained Agents</span>
              </div>
              <div className={styles.simMetric}>
                <span className={styles.simValue}>&lt; 0.5 ms</span>
                <span className={styles.simLabel}>Telemetry Loop Latency</span>
              </div>
            </div>

            <div className={styles.requirements}>
              <h3>Recommended System Requirements</h3>
              <p>For running browser-based visual SLAM and parallel training simulations:</p>
              <ul>
                <li><strong>CPU:</strong> Octa-Core Intel i7 / AMD Ryzen 7 or Apple M-Series</li>
                <li><strong>GPU:</strong> Nvidia RTX 3060 (6GB VRAM) / Radeon RX 6700 or newer</li>
                <li><strong>Memory:</strong> 16 GB DDR5 System RAM</li>
                <li><strong>Frameworks Supported:</strong> ROS 2 (Humble/Jazzy), Gazebo 11, Isaac Gym</li>
              </ul>
            </div>

            <button className={styles.launchSimBtn}>Launch Sandbox Simulator</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Labs;
