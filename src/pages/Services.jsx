import React from 'react';
import { motion } from 'framer-motion';
import { FiShare2, FiMic, FiCpu, FiGlobe, FiUsers } from 'react-icons/fi';
import styles from './Services.module.css';

const Services = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Company Overview Hero */}
        <section className={styles.heroSection}>
          <span className={styles.badge}>Ozirotech AI World Private Limited</span>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Building the Future of Education Through <span className="text-gradient">Intelligent Laboratory Ecosystems</span>
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            At OZIROTECH AI WORLD Private Limited, we go beyond traditional technology solutions by designing and delivering complete, future-ready laboratory environments for schools, colleges, universities, and research institutions. Our mission is to bridge the gap between academic learning and real-world innovation through immersive, hands-on technology experiences.
            <br /><br />
            From concept and planning to procurement, installation, and training, we provide end-to-end laboratory solutions tailored to curriculum requirements, institutional goals, available space, and budget considerations.
          </motion.p>
        </section>

        {/* Key Laboratory Architectures */}
        <section className={styles.architecturesSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>Our Core Services</span>
            <h2>Laboratory <span className="text-gradient">Architectures</span></h2>
          </div>

          <div className={styles.architectureGrid}>
            {/* AI Infrastructure Lab */}
            <motion.div 
              className={`${styles.archCard} glass-panel`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.archIconWrapper}>
                <FiCpu className={styles.archIcon} />
              </div>
              <h3>AI Infrastructure Laboratory</h3>
              <p className={styles.archDesc}>
                Empowering students to develop, train, deploy, and interact with next-generation Artificial Intelligence systems. Our AI Infrastructure Labs are designed to provide practical exposure to machine learning, robotics, autonomous systems, computer vision, and intelligent automation technologies.
              </p>
              <div className={styles.archSubHeader}>Key Components:</div>
              <ul className={styles.featureList}>
                <li><strong>Edge AI Computing Platforms:</strong> High-performance AI development systems equipped with advanced NPUs, embedded processors, microcontroller development boards, and optimization toolchains for real-time AI deployment.</li>
                <li><strong>Autonomous Vehicle Research Systems:</strong> Lidar-enabled smart vehicles, ultrasonic navigation modules, and autonomous driving simulation platforms for testing intelligent path-planning algorithms.</li>
                <li><strong>AI Surveillance & Computer Vision:</strong> Smart camera networks capable of object detection, facial recognition, behavioral analytics, and real-time monitoring applications.</li>
                <li><strong>Robotics & Automation:</strong> Industrial robotic arms, humanoid robotics kits, precision actuators, servo systems, and programmable automation platforms that provide practical robotics training.</li>
                <li><strong>Machine Learning Development Environment:</strong> Integrated software and hardware ecosystems for model training, deployment, testing, and performance optimization.</li>
              </ul>
            </motion.div>

            {/* Content Creation Lab */}
            <motion.div 
              className={`${styles.archCard} glass-panel`}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={styles.archIconWrapper}>
                <FiMic className={styles.archIcon} />
              </div>
              <h3>Content Creation & Immersive Media Laboratory</h3>
              <p className={styles.archDesc}>
                Creating the next generation of digital creators, media innovators, and immersive technology developers. Our Content Creation Labs combine advanced media production technologies with virtual and augmented reality systems to enable experiential learning and creative innovation.
              </p>
              <div className={styles.archSubHeader}>Key Components:</div>
              <ul className={styles.featureList}>
                <li><strong>Professional Podcast & Audio Studios:</strong> Acoustically optimized recording environments equipped with condenser microphones, audio mixers, monitoring systems, and professional production workflows.</li>
                <li><strong>AR & VR Development Platforms:</strong> Advanced virtual and augmented reality headsets, immersive content development environments, and spatial computing systems for next-generation digital experiences.</li>
                <li><strong>Smart IoT Innovation Zone:</strong> Connected sensor ecosystems featuring temperature, humidity, motion, environmental, and smart-home automation devices for real-world IoT applications.</li>
                <li><strong>Digital Media Processing Centers:</strong> High-performance rendering workstations capable of handling video production, visual effects, animation workflows, graphic design, and real-time content processing.</li>
                <li><strong>Interactive Content Development:</strong> Tools and platforms for creating immersive educational experiences, virtual simulations, interactive presentations, and digital storytelling solutions.</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Global Procurement */}
        <section className={`${styles.techStack} glass-panel`}>
          <FiGlobe className={styles.icon} style={{ margin: '0 auto 20px', width: '50px', height: '50px' }} />
          <h2>Global Technology Procurement & Integration</h2>
          <p>Leveraging a worldwide sourcing network to provide institutions with access to the latest innovations from leading technology manufacturers across North America, Europe, and Asia.</p>
          <div className={styles.stackGrid}>
            <div className={styles.stackItem}>
              <h4>Our Procurement Services</h4>
              <ul className={styles.simpleList}>
                <li>International technology sourcing</li>
                <li>Hardware evaluation and selection</li>
                <li>Vendor management and procurement</li>
                <li>Quality assurance and testing</li>
                <li>Logistics coordination and installation</li>
                <li>Infrastructure integration and commissioning</li>
              </ul>
            </div>
            <div className={styles.stackItem} style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ textAlign: 'left', marginBottom: 0 }}>Our global supply chain ensures that institutions receive industry-grade equipment that meets both educational and professional standards.</p>
            </div>
          </div>
        </section>

        {/* Workshops & Consultation Grid */}
        <div className={styles.architectureGrid} style={{ marginTop: '0' }}>
          <section className={`${styles.techStack} glass-panel`} style={{ padding: '40px' }}>
            <FiUsers className={styles.icon} style={{ margin: '0 auto 15px' }} />
            <h2 style={{ fontSize: '1.8rem' }}>Educational Workshops & Industry Training</h2>
            <p style={{ fontSize: '1rem' }}>We conduct expert-led workshops, technical bootcamps, innovation summits, and hands-on training programs designed to equip students and educators with practical industry skills.</p>
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              <h4 style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>Training Areas:</h4>
              <ul className={styles.simpleList}>
                <li>Artificial Intelligence & Machine Learning</li>
                <li>Robotics & Automation</li>
                <li>Internet of Things (IoT)</li>
                <li>Computer Vision</li>
                <li>Content Creation & Digital Media</li>
                <li>AR/VR Development</li>
                <li>Emerging Technology Trends</li>
                <li>Industry Readiness Programs</li>
              </ul>
            </div>
          </section>

          <section className={`${styles.techStack} glass-panel`} style={{ padding: '40px' }}>
            <FiShare2 className={styles.icon} style={{ margin: '0 auto 15px' }} />
            <h2 style={{ fontSize: '1.8rem' }}>Laboratory Consultation & Commissioning</h2>
            <p style={{ fontSize: '1rem' }}>Every institution has unique academic objectives. Our consultation team works closely with administrators, faculty members, and technical departments to design laboratories that align with educational outcomes and future industry demands.</p>
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              <h4 style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>Our Process:</h4>
              <ol className={styles.numberedList}>
                <li>Requirement Analysis</li>
                <li>Infrastructure Planning</li>
                <li>Laboratory Design</li>
                <li>Technology Selection</li>
                <li>Procurement & Installation</li>
                <li>Faculty Training</li>
                <li>Ongoing Technical Support</li>
              </ol>
            </div>
          </section>
        </div>

        {/* Why Choose Us */}
        <section className={styles.navStructure}>
          <h2>Why Choose <span className="text-gradient">OZIROTECH AI WORLD?</span></h2>
          <p className={styles.navDesc}>Transforming Classrooms into Innovation Centers</p>
          
          <div className={styles.stackGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <ul className={styles.featureList} style={{ margin: 0 }}>
              <li><strong>End-to-End</strong> Laboratory Solutions</li>
              <li><strong>Curriculum-Aligned</strong> Infrastructure</li>
              <li><strong>Industry-Grade</strong> Hardware & Equipment</li>
              <li><strong>Global</strong> Procurement Network</li>
            </ul>
            <ul className={styles.featureList} style={{ margin: 0 }}>
              <li><strong>Expert</strong> Technical Consultation</li>
              <li><strong>Future-Ready</strong> Learning Environments</li>
              <li><strong>Dedicated</strong> Installation & Support Services</li>
              <li><strong>Scalable Solutions</strong> for Schools, Colleges & Universities</li>
            </ul>
          </div>
          
          <p style={{ marginTop: '40px', textAlign: 'center', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            At OZIROTECH AI WORLD, we are committed to empowering educational institutions with intelligent laboratory ecosystems that inspire creativity, innovation, research, and technological excellence for the next generation of learners.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Services;
