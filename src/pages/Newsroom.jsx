import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Newsroom.module.css';

const newsArticles = [
  {
    id: 1,
    title: "Oziro Tech Announces Bipedal Locomotion Breakthrough in Humanoid V1",
    excerpt: "By implementing a specialized reinforcement learning control system running on edge processors, Oziro Bipedal platform achieved self-balancing over loose gravel paths.",
    content: "Our AI Research division in Bengaluru has successfully deployed an end-to-end neural network controller on the Oziro Humanoid V1. The robot can now traverse loose gravel, steep slopes, and dynamic obstacles without losing balance. Using localized reinforcement learning loop states executing at 1000 Hz, the actuators automatically adapt to friction variations in real-time. This marks a massive leap forward for deploying humanoid robots in unstructured corporate and industrial environments.",
    date: "June 08, 2026",
    category: "Research",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Introducing RoboArm Flex: Collaborative Assembly Automation for SMBs",
    excerpt: "We are officially launching RoboArm Flex, designed specifically to help small and medium manufacturing lines automate sorting, soldering, and machine feeding.",
    content: "Oziro Tech is proud to announce the commercial release of RoboArm Flex, a collaborative 6-axis manipulator arm. Unlike traditional heavy industrial arms that require safety cages, RoboArm Flex features integrated capacitive torque sensors that stop movement instantly upon contact with human workers. The arm can be programmed via manual hand guiding—simply move the arm through the desired path, and the Python SDK automatically records and optimizes the trajectory. This opens up automated manufacturing to small businesses.",
    date: "May 20, 2026",
    category: "Product Launch",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Oziro Tech Secures Strategic Advisory Board Partnership with AI Giants",
    excerpt: "Oziro Tech AI World Pvt Ltd has closed its latest corporate advisory panel, inviting prominent researchers to guide the ethical deployment of humanoid technology.",
    content: "To guide our rapid expansion in autonomous robotics, Oziro Tech has established a new Technical Advisory Board comprised of leading figures in machine learning and cognitive science. The board will focus on safety compliance, ethical deployment frameworks, and standardization of robot-human workspace integration. 'As humanoids enter offices and homes, ensuring security and intuitive communication is our primary mandate,' stated our CEO during the partnership launch.",
    date: "April 15, 2026",
    category: "Corporate",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Inside the Code: Integrating ROS 2 and Gazebo in Oziro Simulation SDK",
    excerpt: "A technical walkthrough of our developer SDK packages, showing how to build virtual physical collision testing loops before deploying to physical robots.",
    content: "Programming a physical robot requires virtual verification to prevent hardware collision damage. The Oziro Developer SDK includes a complete simulation sandbox integrated with ROS 2 and Gazebo. Developers can import Oziro's URDF description files, write custom control scripts in Python, and simulate mechanical dynamics. This guide explains how to spin up a Gazebo simulation instance, map joint telemetry topics, and run automated path-planning tests in a smart-factory model.",
    date: "March 29, 2026",
    category: "Engineering",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Autonomous Inspection Sweeps: Deploying AeroDrone X in Solar Arrays",
    excerpt: "How our visual-thermal sensor fusion systems detected over 40 grid hotspots in an automated flight scan of the Rajasthan Desert solar farms.",
    content: "During a joint trial with renewable energy operators, a fleet of AeroDrone X quadcopters conducted fully automated thermal inspection sweeps over a 500-acre solar farm. Equipped with visual-thermal camera arrays and edge processor units, the drones mapped the fields and identified cell defects on-board in real-time. By utilizing RTK GPS, the coordinates of defective panels were cataloged with centimeter-level precision, cutting inspections times from days to under two hours.",
    date: "February 12, 2026",
    category: "Research",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Autonomous Fleet Coordination: Deploying AutoBot AGVs in Heavy Industry",
    excerpt: "We outline how our fleet management orchestration software handles path routing for over 50 AutoBot AGVs simultaneously under active factory conditions.",
    content: "Scaling autonomous mobile robots requires a centralized traffic control brain. Oziro's Fleet Orchestration Hub uses localized mesh networks and grid-based pathfinding to map and coordinate logistics. We deployed this system in a major automotive manufacturing warehouse, automating the hauling of heavy steel frames. AutoBot AGVs dynamically route around forklift traffic and charge automatically at docking pads, achieving a 99.8% material delivery schedule adherence.",
    date: "January 22, 2026",
    category: "Engineering",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    title: "Oziro Tech AI World Launches Global Robotics Expansion Initiative",
    excerpt: "Detailing our expansion plans for dedicated support centers and developer hubs across North America, Europe, and Southeast Asia.",
    content: "Following record demand for collaborative automation, Oziro Tech is establishing local engineering hubs in Tokyo, Munich, and San Francisco. These hubs will house rapid prototyping labs, support centers, and local training facilities for developers. 'Local support is key for manufacturers integrating collaborative robotic arms and AGV logistics into active assembly lines,' noted our VP of Operations during the announcement.",
    date: "January 05, 2026",
    category: "Corporate",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    title: "Designing the HoloCore: The Future of Volumetric Gesture Displays",
    excerpt: "A deep dive into our volumetric emitter technology, discussing how we project 3D wireframe visuals without needing 3D glasses.",
    content: "HoloCore Projector represents a breakthrough in control room spatial visualization. Instead of rendering 3D data on flat screens, HoloCore projects physical voxel displays in mid-air. Our hardware engineering team achieved this using ultra-high-frequency laser scattering arrays and synchronized scanning lenses. By tracking operators' hand gestures with infrared arrays, users can pinch-to-zoom and grab 3D virtual machine models to inspect parts naturally.",
    date: "December 18, 2025",
    category: "Product Launch",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80"
  }
];

const Newsroom = () => {
  const [filter, setFilter] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const categories = ['All', 'Research', 'Product Launch', 'Corporate', 'Engineering'];

  const filteredArticles = filter === 'All'
    ? newsArticles
    : newsArticles.filter(art => art.category === filter);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Oziro Newsroom</span>
          <h1 className={styles.title}>Corporate Updates & <br /><span className="text-gradient">Tech Journals</span></h1>
          <p className={styles.subtitle}>
            Explore our latest research papers, product launch announcements, and engineering breakthroughs.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filterBar}>
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Modal for reading full articles */}
        {selectedArticle && (
          <div className={styles.modalOverlay} onClick={() => setSelectedArticle(null)}>
            <div className={`${styles.modalCard} glass-panel`} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={() => setSelectedArticle(null)}>&times;</button>
              <div className={styles.modalImageWrapper}>
                <img src={selectedArticle.image} alt={selectedArticle.title} />
              </div>
              <div className={styles.modalContent}>
                <div className={styles.meta}>
                  <span className={styles.modalTag}>{selectedArticle.category}</span>
                  <span>{selectedArticle.date}</span>
                  <span className={styles.dot}>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h2>{selectedArticle.title}</h2>
                <p className={styles.articleBody}>{selectedArticle.content}</p>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className={styles.grid}>
          {filteredArticles.map((art) => (
            <motion.article 
              key={art.id} 
              className={`${styles.card} glass-panel`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.imageWrapper}>
                <img src={art.image} alt={art.title} className={styles.image} />
                <span className={styles.categoryBadge}>{art.category}</span>
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.date}>{art.date}</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.readTime}>{art.readTime}</span>
                </div>
                <h3 className={styles.cardTitle}>{art.title}</h3>
                <p className={styles.excerpt}>{art.excerpt}</p>
                <button 
                  className={styles.readMoreBtn} 
                  onClick={() => setSelectedArticle(art)}
                >
                  Read Full Article &rarr;
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Newsroom;
