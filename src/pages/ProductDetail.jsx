import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ProductDetail.module.css';
import ProductScene from '../components/3d/ProductScene';



const productsData = {
  humanoid: {
    name: 'Humanoid Assistant Robot',
    tagline: 'Next-Generation Autonomous Assistant',
    desc: 'The Oziro Humanoid V1 represents the pinnacle of cognitive robotics. Equipped with advanced natural language processing, humanoid locomotion, and high-precision dexterous hands, it is designed to assist in complex office tasks, customer engagement, healthcare assistance, and light manufacturing chores. Built on Oziro\'s proprietary cognitive brain, it learns and adapts to its environment in real-time.',
    specs: [
      { label: 'Height', value: '1.75 meters (5\'9")' },
      { label: 'Weight', value: '75 kg (165 lbs)' },
      { label: 'Payload Capacity', value: '15 kg per arm' },
      { label: 'Battery Life', value: '8 hours active runtime' },
      { label: 'Degree of Freedom', value: '32 DOFs total' },
      { label: 'Locomotion Speed', value: 'Up to 5 km/h' },
      { label: 'AI Processor', value: 'Oziro Neural Core Gen 2' },
      { label: 'Sensory Array', value: 'Stereo depth cameras, LiDAR, spatial microphones' }
    ],
    features: [
      { title: 'Dexterous Manipulation', desc: 'Custom hands featuring high torque feedback for gripping delicate objects.' },
      { title: 'Semantic Mapping', desc: 'Builds a 3D semantic grid of offices and factories to coordinate tasks.' },
      { title: 'Human-Robot Collaboration', desc: 'Built-in force detection arrays ensure 100% safe physical interactions.' }
    ],
    applications: [
      'Reception & Customer Experience',
      'Clinical Support & Patient Care',
      'High-Mix Assembly Lines',
      'Facility Inspection & Security Patrolling'
    ]
  },
  drone: {
    name: 'Surveillance & Inspection Drone',
    tagline: 'Autonomous Industrial Surveillance & Inspection',
    desc: 'AeroDrone X is an autonomous quadcopter designed for heavy-duty aerial inspections and automated perimeter surveillance. Engineered with carbon fiber composites, it can withstand extreme weather conditions. Leveraging edge AI computing, the drone detects anomalies such as thermal leakage, gas emissions, and security breaches without needing manual pilot control.',
    specs: [
      { label: 'Dimensions', value: '650 x 650 x 220 mm' },
      { label: 'Weight', value: '4.8 kg' },
      { label: 'Max Flight Time', value: '45 minutes' },
      { label: 'Max Wind Resistance', value: '12 m/s' },
      { label: 'Transmission Range', value: '15 km (HD video)' },
      { label: 'Payload Bay', value: 'Up to 2.5 kg' },
      { label: 'IP Rating', value: 'IP55 Weatherproof' },
      { label: 'Navigation', value: 'RTK GPS & Visual SLAM' }
    ],
    features: [
      { title: 'Edge Analytics', desc: 'Processes 4K video streams on-board to flag pipeline or structure cracks instantly.' },
      { title: 'Collision Avoidance', desc: '360-degree obstacle detection utilizing LiDAR and visual SLAM sensors.' },
      { title: 'Auto-Docking Recharge', desc: 'Returns automatically to its weather-sealed charging pod when battery is low.' }
    ],
    applications: [
      'Power Grid & Solar Farm Inspection',
      'Perimeter Security & Automated Patrols',
      'Agricultural Mapping & Health Monitoring',
      'Mining Site Volumetric Analysis'
    ]
  },
  quaddog: {
    name: 'All-Terrain Quadruped Robot',
    tagline: 'All-Terrain Quadruped Robotic Platform',
    desc: 'QuadDog Alpha is an agile four-legged robot designed to go where wheeled systems cannot. With state-of-the-art dynamic balance control, it easily traverses mud, gravel, stairs, and ruins. It acts as an autonomous sensor carrier, inspecting dangerous industrial environments, gas leak zones, and unstructured disaster sites to keep human workers out of harm\'s way.',
    specs: [
      { label: 'Length / Height', value: '800 x 500 mm' },
      { label: 'Weight', value: '32 kg' },
      { label: 'Max Speed', value: '3.5 m/s' },
      { label: 'Terrain Traversal', value: 'Stairs, slopes up to 35°' },
      { label: 'Battery Capacity', value: '4 hours continuous traversal' },
      { label: 'Payload Slots', value: '4 modular rail connectors' },
      { label: 'Max Payload', value: '10 kg' },
      { label: 'IP Rating', value: 'IP67 dust and water protection' }
    ],
    features: [
      { title: 'Dynamic Balance Control', desc: 'Recovers from slip or push in milliseconds using high-frequency torque motors.' },
      { title: 'Modular Payload System', desc: 'Allows developers to mount robotic arms, gas sensors, or thermal cameras easily.' },
      { title: 'Simultaneous Localization', desc: '3D LiDAR SLAM enables navigation in complete darkness or dust clouds.' }
    ],
    applications: [
      'Subterranean & Tunnel Exploration',
      'Oil & Gas Refinery Site Inspection',
      'Search & Rescue Missions',
      'Forestry & Geological Research'
    ]
  },
  roboarm: {
    name: 'Collaborative Robotic Arm',
    tagline: 'High-Precision Collaborative Robotic Arm',
    desc: 'RoboArm Flex is a 6-axis collaborative robotic arm engineered for industrial automation tasks requiring high repeatability and flexibility. Featuring an intuitive training interface, factory floor workers can guide the arm by hand to program pick-and-place, sorting, and packaging routines within minutes, eliminating complex coding cycles.',
    specs: [
      { label: 'Reach', value: '1200 mm' },
      { label: 'Payload', value: '8 kg' },
      { label: 'Repeatability', value: '±0.03 mm' },
      { label: 'Degree of Freedom', value: '6 rotational joints' },
      { label: 'Footprint', value: 'Ø 190 mm base' },
      { label: 'Weight', value: '24 kg' },
      { label: 'Power Consumption', value: 'Avg 250 W' },
      { label: 'Programming', value: 'Hand-guided teaching, Python SDK' }
    ],
    features: [
      { title: 'Zero-Code Teaching', desc: 'Press a button and guide the arm manually to set path nodes.' },
      { title: 'Integrated Force Control', desc: 'Detects collision resistance below 50 Newtons and stops immediately.' },
      { title: 'Modular End-Effectors', desc: 'Quick-change adapters for pneumatic grippers, vacuum suctions, and welding tools.' }
    ],
    applications: [
      'Precision Pick & Place',
      'Electronic Assembly & Testing',
      'Machine Tending & Feeding',
      'Gluing, Dispensing, and Soldering'
    ]
  },
  agv: {
    name: 'Heavy-Duty Logistics Vehicle',
    tagline: 'Heavy-Duty Autonomous Logistics Vehicle',
    desc: 'AutoBot AGV is a flatbed autonomous mobile robot (AMR) designed to automate material handling in warehouses and factory floors. Equipped with smart fleet intelligence, it navigates complex crowded layouts, coordinates movements with other vehicles, and delivers raw materials or completed packages directly to assembly lines without manual guidance.',
    specs: [
      { label: 'Dimensions', value: '1100 x 780 x 400 mm' },
      { label: 'Max Load Capacity', value: '500 kg (1100 lbs)' },
      { label: 'Max Speed', value: '1.8 m/s' },
      { label: 'Battery Runtime', value: '10 hours (lithium iron phosphate)' },
      { label: 'Charging Time', value: '1.5 hours (rapid charge)' },
      { label: 'Navigation', value: 'Laser SLAM & QR Code guidance' },
      { label: 'Safety Systems', value: 'Dual safety laser scanners, bumper bands' },
      { label: 'Interface', value: 'WiFi, REST APIs, ROS 2' }
    ],
    features: [
      { title: 'Adaptive Route Planning', desc: 'Recalculates travel paths in real-time if an unexpected obstacle blocks a corridor.' },
      { title: 'Fleet Orchestration', desc: 'Integrates with central WMS/ERP to distribute tasks across 100+ robots.' },
      { title: 'Self-Charging Docking', desc: 'Checks battery level and schedule, scheduling charger visits during down periods.' }
    ],
    applications: [
      'Automated Warehouse Pallet Sorting',
      'Factory Floor Assembly Line Feeding',
      'Heavy Materials & Frame Hauling',
      'Cross-docking Operations'
    ]
  },
  car: {
    name: 'Autonomous Tactical Rover',
    tagline: 'Autonomous Tactical Robotic Car',
    desc: 'The CyberRover V1 is a high-speed, all-terrain autonomous robotic car designed for tactical mapping, logistics, and perimeter exploration. Equipped with an adaptive suspension chassis and direct-drive hub motors, it navigates complex terrain with high mobility. Utilizing dual-antenna RTK GPS and visual-inertial sensor suites, it conducts path planning and scanning routines independently.',
    specs: [
      { label: 'Length', value: '1.2 meters' },
      { label: 'Weight', value: '45 kg (99 lbs)' },
      { label: 'Payload Capacity', value: '30 kg' },
      { label: 'Top Speed', value: '25 km/h' },
      { label: 'Navigation', value: 'RTK GPS + Visual Inertial SLAM' },
      { label: 'Operating Time', value: '6 hours continuous drive' },
      { label: 'Drive System', value: '4-Wheel Drive Direct Hub Motors' },
      { label: 'Sensory Array', value: '3D LiDAR, front cameras, bumper sensors' }
    ],
    features: [
      { title: 'High-Speed SLAM', desc: 'Maps unknown rugged environments in real-time at high velocity.' },
      { title: 'Active Suspensions', desc: 'Pivoting suspension struts keep the chassis level on rocky terrain.' },
      { title: 'Cellular Data Link', desc: 'Streams HD footage and command streams over LTE/5G secure links.' }
    ],
    applications: [
      'Industrial Site Patrolling',
      'Automated Mine Shaft Mapping',
      'Outdoor Cargo & Equipment Transport',
      'Tactical Perimeter Reconnaissance'
    ]
  },
  hologram: {
    name: 'Interactive Volumetric Projector',
    tagline: 'Interactive Volumetric Display System',
    desc: 'HoloCore Projector is a next-generation interactive volumetric display. By creating localized light scattering arrays, it projects floating 3D wireframe models, operational metrics, and telemetry diagrams directly in mid-air. Incorporating gesture tracking and LiDAR scanning modules, developers and operators can rotate, scale, and interact with the hologram using hand movements, without needing 3D glasses.',
    specs: [
      { label: 'Emitter Size', value: 'Diameter 350 mm' },
      { label: 'Projector Height', value: '220 mm' },
      { label: 'Hologram Volume', value: '600 x 600 x 600 mm projection size' },
      { label: 'Resolution', value: 'Voxel density of 500 million voxels/m³' },
      { label: 'Interface', value: 'Hand Gesture tracking, Voice command, SDK API' },
      { label: 'Data Input', value: 'Ethernet, WiFi, HDMI 3D feed' },
      { label: 'Power Consumption', value: '120 W active run' },
      { label: 'Materials', value: 'Anodized aluminum with glass core emitter' }
    ],
    features: [
      { title: 'Real-Time Volumetric Rendering', desc: 'Translates standard 3D CAD/mesh files to laser voxels instantly.' },
      { title: 'Hand Gesture Sensing', desc: 'Uses infra-red arrays to track hands, mapping movements to zoom/rotate controls.' },
      { title: 'Compact Core', desc: 'Designed to sit on meeting tables or integrate directly into control dashboards.' }
    ],
    applications: [
      'Collaborative Engineering Design',
      'Real-time Fleet Telemetry Visuals',
      'Technical Product Showcases',
      'Advanced Robotic Control Command Centers'
    ]
  }
};

// Map alternate IDs to prevent route failures
productsData.dog = productsData.quaddog;
productsData.arm = productsData.roboarm;

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = productsData[productId?.toLowerCase()];

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been relocated.</p>
        <button className={styles.backHomeBtn} onClick={() => navigate('/')}>
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Back Button */}
        <button className={styles.backBtn} onClick={() => navigate('/products')}>
          &larr; Back to Gallery
        </button>

        {/* Hero split */}
        <div className={styles.heroSplit}>
          <div className={styles.infoCol}>
            <span className={styles.categoryBadge}>Robotics hardware</span>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.tagline}>{product.tagline}</p>
            <p className={styles.desc}>{product.desc}</p>
            
            <button className={styles.demoBtn} onClick={() => navigate('/', { state: { scrollTo: '#contact' } })}>
              Book a Live Demo
            </button>
          </div>

          <div className={styles.canvasCol}>
            <div className={styles.canvasWrapper}>
              <ProductScene productId={productId} />
            </div>
            <p className={styles.canvasHint}>Interactive 3D Virtual Prototype</p>
          </div>
        </div>

        {/* Dynamic Details Split */}
        <div className={styles.detailsGrid}>
          {/* Tech Specs */}
          <div className={`${styles.specCard} glass-panel`}>
            <h3>Technical Specifications</h3>
            <div className={styles.specList}>
              {product.specs.map((spec, i) => (
                <div key={i} className={styles.specRow}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features & Applications */}
          <div className={styles.featuresCol}>
            <div className={styles.featuresSection}>
              <h3>Key Features</h3>
              <div className={styles.featuresList}>
                {product.features.map((feat, i) => (
                  <div key={i} className={styles.featureItem}>
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.appsSection}>
              <h3>Target Applications</h3>
              <ul className={styles.appsList}>
                {product.applications.map((app, i) => (
                  <li key={i}>{app}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
