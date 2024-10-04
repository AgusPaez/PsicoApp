//imports
import React from 'react';
//import component
import { NavbarPatient } from '../../components/Patient-components/NavbarPatient';
import { HomePatientComponent } from '../../components/Patient-components/HomePatientComponent';
import { FooterPatient } from '../../components/Patient-components/FooterPatient';

export const HomePatient = () => {
  return (
    <>
      <div className="relative min-h-screen bg-[#f5f0e1] text-[#4a4a4a]">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-30 blur-[2px]"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/vector-gratis/hierbas-botanicas-minimalistas-flores-silvestres-estilo-vintage_23-2148424504.jpg')",
          }}
        ></div>
        <NavbarPatient />
        <HomePatientComponent />
        <FooterPatient />
      </div>
    </>
  );
};
