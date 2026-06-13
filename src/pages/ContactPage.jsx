import React from 'react';
import Contact from '../components/sections/Contact';

const ContactPage = () => {
  return (
    <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)' }}>
      <Contact />
    </div>
  );
};

export default ContactPage;
