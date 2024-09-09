//imports
import React from 'react';
//import Background
import { BackgroundMain } from '../../components/Backgrounds/BackgroundMain';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AppointmentForm } from '../../components/AppointmentForm';

export const Appointment = () => {
  return (
    <>
      <BackgroundMain>
        <Navbar></Navbar>
        <AppointmentForm></AppointmentForm>
        <Footer></Footer>
      </BackgroundMain>
    </>
  );
};
