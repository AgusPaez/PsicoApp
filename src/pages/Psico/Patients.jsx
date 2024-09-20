import React from 'react';
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { PatientsComponent } from '../../components/Psico-components/PatientsComponent';

export const Patients = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-[#3d3763] to-[#69666e]">
        <NavbarPsico />
        <PatientsComponent />
      </div>
    </>
  );
};
