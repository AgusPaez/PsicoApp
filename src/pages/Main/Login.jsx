//imports
import React from 'react';
//import Background
import { BackgroundMain } from '../../components/Backgrounds/BackgroundMain';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LogIn } from '../../components/LogIn';
export const Login = () => {
  return (
    <>
      <BackgroundMain>
        <Navbar></Navbar>
        <LogIn></LogIn>
        <Footer></Footer>
      </BackgroundMain>
    </>
  );
};
