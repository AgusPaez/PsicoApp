import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import ListAppointment from '../../components/Psico-components/ListAppointments';
export const AppointmentPsico = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-[#3d3763] to-[#69666e]">
        <NavbarPsico />
        <ListAppointment />
      </div>
    </>
  );
};
