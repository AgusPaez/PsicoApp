import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import ListAppointment from '../../components/Psico-components/ListAppointments';
export const AppointmentPsico = () => {
  return (
    <>
      <div className="bg-red-950 min-h-screen">
        <NavbarPsico />
        <ListAppointment />
      </div>
    </>
  );
};
