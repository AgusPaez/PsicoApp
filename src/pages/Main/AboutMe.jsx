import React from 'react';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AboutmeComponent } from '../../components/AboutmeComponent';
import { Approach } from '../../components/Approach';
import { Vision } from '../../components/Vision';
import { Pay } from '../../components/Pay';
import { Contact } from '../../components/Contact';

export const AboutMe = () => {
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
