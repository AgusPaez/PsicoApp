import React, { useEffect } from 'react';

//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StudiesComponent } from '../../components/StudiesComponent';

export const Studies = () => {
  return (
    <>
      <Navbar></Navbar>
      <StudiesComponent></StudiesComponent>
      <Footer></Footer>
    </>
  );
};
