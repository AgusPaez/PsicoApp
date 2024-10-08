import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import ListAppointment from '../../components/Psico-components/ListAppointments';
export const AppointmentPsico = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-[#4e4075] to-[#3d315c]">
        <NavbarPsico />
        <ListAppointment />
      </div>
    </>
  );
};
