//imports
import React from 'react';
//import Background
import { BackgroundMain } from '../../components/Backgrounds/BackgroundMain';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AppointmentForm } from '../../components/AppointmentForm';
import Fondo from '../../assets/images/fondo.jpg';
import Fondo1 from '../../assets/images/home-.jpg';
export const Appointment = () => {
  return (
    <div className="relative z-0 grid grid-rows-[auto_1fr_auto] min-h-dvh">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-center bg-cover opacity-60 blur-[2.5px] z-0 "
        style={{ backgroundImage: `url(${Fondo1})` }}
      ></div>
      <BackgroundMain>
        <Navbar />
        <AppointmentForm />
        <Footer />
      </BackgroundMain>
    </div>
  );
};
