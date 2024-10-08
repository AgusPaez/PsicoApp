import React from 'react';
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { PatientsComponent } from '../../components/Psico-components/PatientsComponent';

export const Patients = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-[#4e4075] to-[#3d315c]">
        <NavbarPsico />
        <PatientsComponent />
      </div>
    </>
  );
};
