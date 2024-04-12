import React from 'react';
//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LogIn } from '../../components/LogIn';
export const Login = () => {
  return (
    <>
      <Navbar></Navbar>
      <LogIn></LogIn>
      <Footer></Footer>
    </>
  );
};
