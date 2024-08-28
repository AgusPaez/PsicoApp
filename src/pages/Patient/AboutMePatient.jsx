//imports
import React from 'react';
// import components
import { NavbarPatient } from '../../components/Patient-components/NavbarPatient';
import { FooterPatient } from '../../components/Patient-components/FooterPatient';
import { AboutMePatientComponent } from '../../components/Patient-components/AboutMePatientComponent';

export const AboutMePatient = () => {
  return (
    <>
      <NavbarPatient />
      <AboutMePatientComponent />
      <FooterPatient />
    </>
  );
};
