import React, { useEffect, useState } from 'react';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AboutmeComponent } from '../../components/AboutmeComponent';
import { Approach } from '../../components/Approach';
import { Vision } from '../../components/Vision';
import { Pay } from '../../components/Pay';
import { Contact } from '../../components/Contact';
//imports Services
import { getContent } from '../../services/contentMainService';

export const AboutMe = () => {
  // states
  const [content, setContent] = useState([]);

  useEffect(() => {
    // call service
    const fetchContent = async () => {
      try {
        const response = await getContent();
        setContent(response);
      } catch (error) {}
    };
    fetchContent();
  }, []);
  console.log('CONTENT:', content);
  return (
    <>
      <Navbar />
      <AboutmeComponent />
      <Approach />
      <Vision />
      <Pay />
      <Contact />
      <Footer />
    </>
  );
};
