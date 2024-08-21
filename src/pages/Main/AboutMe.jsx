import React from 'react';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AboutmeComponent } from '../../components/AboutmeComponent';

export const AboutMe = () => {
  return (
    <>
      <Navbar />
      <AboutmeComponent />
      <Footer />
    </>
  );
};
