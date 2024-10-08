//imports
import React from 'react';
//import components
import { NavbarPatient } from '../../components/Patient-components/NavbarPatient';
import { FooterPatient } from '../../components/Patient-components/FooterPatient';
import { AppointmentFormPatient } from '../../components/Patient-components/AppointmentFormPatient';

export const AppointmentPatient = () => {
  return (
    <>
      <div className="relative  flex-col min-h-screen bg-[#f5f0e1] text-[#4a4a4a]">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-30 blur-[2px] "
          style={{
            backgroundImage:
              "url('https://img.freepik.com/vector-gratis/hierbas-botanicas-minimalistas-flores-silvestres-estilo-vintage_23-2148424504.jpg')",
          }}
        ></div>
        <NavbarPatient />
        <AppointmentFormPatient />
        <FooterPatient />
      </div>
    </>
  );
};
