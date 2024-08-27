//imports
import React from 'react';
//import component
import { NavbarPatient } from '../../components/Patient-components/NavbarPatient';
import { HomePatientComponent } from '../../components/Patient-components/HomePatientComponent';
import { FooterPatient } from '../../components/Patient-components/FooterPatient';

export const HomePatient = () => {
  return (
    <>
      <NavbarPatient />
      <HomePatientComponent />
      <FooterPatient />
    </>
  );
};
