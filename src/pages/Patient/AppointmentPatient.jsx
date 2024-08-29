//imports
import React from 'react';
//import components
import { NavbarPatient } from '../../components/Patient-components/NavbarPatient';
import { FooterPatient } from '../../components/Patient-components/FooterPatient';
import { AppointmentFormPatient } from '../../components/Patient-components/AppointmentFormPatient';

export const AppointmentPatient = () => {
  return (
    <>
      <NavbarPatient />
      <AppointmentFormPatient />
      <FooterPatient />
    </>
  );
};
