import React from 'react';
//import Background
import { BackgroundMain } from '../../components/Backgrounds/BackgroundMain';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AboutmeComponent } from '../../components/AboutmeComponent';
// import Fondo from '../../assets/images/fondo.jpg';
import Aboutme from '../../assets/images/aboutme.jpg';

export const AboutMe = () => {
  return (
    <>
      <div className="relative z-0 min-h-screen">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-30 blur-[2px] z-0"
          style={{ backgroundImage: `url(${Aboutme})` }}
        ></div>
        <BackgroundMain>
          <Navbar />
          <AboutmeComponent />
          <Footer />
        </BackgroundMain>
      </div>
    </>
  );
};
