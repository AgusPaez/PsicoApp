import React from 'react';
//import Background
import { BackgroundMain } from '../../components/Backgrounds/BackgroundMain';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AboutmeComponent } from '../../components/AboutmeComponent';

export const AboutMe = () => {
  return (
    <>
      <BackgroundMain>
        <Navbar />
        <AboutmeComponent />
        <Footer />
      </BackgroundMain>
    </>
  );
};
