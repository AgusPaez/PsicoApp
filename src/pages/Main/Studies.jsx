//imports
import React, { useEffect } from 'react';
//import Background
import { BackgroundMain } from '../../components/Backgrounds/BackgroundMain';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { StudiesComponent } from '../../components/StudiesComponent';

export const Studies = () => {
  return (
    <>
      <BackgroundMain>
        <Navbar></Navbar>
        <StudiesComponent></StudiesComponent>
        <Footer></Footer>
      </BackgroundMain>
    </>
  );
};
