import React from 'react';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { AppointmentForm } from '../../components/AppointmentForm';

export const Appointment = () => {
  return (
    <>
      <div className="bg-rose-200 min-h-screen">
        <Navbar></Navbar>
        <AppointmentForm></AppointmentForm>
        <Footer></Footer>
      </div>
    </>
  );
};
