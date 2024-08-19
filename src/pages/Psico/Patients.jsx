import React from 'react';
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { PatientsComponent } from '../../components/Psico-components/PatientsComponent';

export const Patients = () => {
  return (
    <>
      <div className="min-h-screen bg-red-950">
        <NavbarPsico />
        <PatientsComponent />
      </div>
    </>
  );
};
