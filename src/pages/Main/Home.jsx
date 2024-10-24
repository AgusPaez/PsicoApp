//import
import React from 'react';
//import background
import { BackgroundMain } from '../../components/Backgrounds/BackgroundMain';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import Fondo from '../../assets/images/home-.jpg';
export const Home = () => {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh bg-rose-200">
        <div
          className="absolute inset-0 bg-center bg-cover opacity-60 blur-[4px] z-0"
          style={{ backgroundImage: `url(${Fondo})` }}
        ></div>
        <BackgroundMain>
          <Navbar />
          <div>hola</div>
          <Footer />
        </BackgroundMain>
      </div>
    </>
  );
};
