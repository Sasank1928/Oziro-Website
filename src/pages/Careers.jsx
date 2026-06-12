import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsPersonCheck, BsGlobe, BsRocketTakeoff, BsHeartPulse } from 'react-icons/bs';
import styles from './Careers.module.css';

const companyValues = [
  {
    icon: BsRocketTakeoff,
    title: "Audacious Innovation",
    desc: "We push beyond iterative improvements, designing and engineering robotics architecture that shapes the coming decades."
  },
  {
    icon: BsGlobe,
    title: "Global Collaboration",
    desc: "Our team consists of scientists, engineers, and creatives from across the globe working together to build cohesive hardware."
  },
  {
    icon: BsHeartPulse,
    title: "Human-Centric Focus",
    desc: "We design AI and robots to offload dull, dirty, and dangerous tasks, elevating human safety, creativity, and potential."
  }
];

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    coverLetter: '',
    resume: null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Page Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Careers at Oziro Tech</span>
          <h1 className={styles.title}>Engineering the <br /><span className="text-gradient">Robotic Revolution</span></h1>
          <p className={styles.subtitle}>
            Join our world-class team of AI researchers, mechanical designers, and control theorists in building the future of autonomous systems.
          </p>
        </div>

        {/* Company Values */}
        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>What Drives Us</h2>
          <div className={styles.valuesGrid}>
            {companyValues.map((val, i) => (
              <div key={i} className={`${styles.valueCard} glass-panel`}>
                <div className={styles.valueIconWrapper}>
                  <val.icon className={styles.valueIcon} />
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form Section */}
        <section className={styles.formSection} id="applyForm">
          <div className={`${styles.formCard} glass-panel`}>
            {submitted ? (
              <div className={styles.successMessage}>
                <BsPersonCheck className={styles.successIcon} />
                <h2>Application Submitted!</h2>
                <p>Thank you for applying to Oziro Tech. Our recruiting team will review your credentials and get back to you shortly.</p>
                <button 
                  className={styles.resetBtn} 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      position: '',
                      coverLetter: '',
                      resume: null
                    });
                  }}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <>
                <h2>Submit Your Application</h2>
                <p className={styles.formSubtitle}>Send your resume directly to our engineering coordinators for general application considerations.</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="name">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210" 
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="position">Position / Area of Interest *</label>
                      <input 
                        type="text" 
                        id="position" 
                        name="position" 
                        required 
                        value={formData.position}
                        onChange={handleInputChange}
                        placeholder="e.g. Controls Engineer, AI Researcher" 
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="coverLetter">Cover Letter / Why Oziro? *</label>
                    <textarea 
                      id="coverLetter" 
                      name="coverLetter" 
                      required 
                      rows="5"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Tell us about your passion for AI and robotics engineering..."
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Upload CV / Resume (PDF) *</label>
                    <div className={styles.uploadBox}>
                      <input 
                        type="file" 
                        required 
                        accept=".pdf"
                        onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.files[0] }))}
                      />
                      <span>Select PDF File</span>
                    </div>
                    {formData.resume && <p className={styles.fileName}>Selected: {formData.resume.name}</p>}
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Careers;
