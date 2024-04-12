import React from 'react';

//Imports Components
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

export const Home = () => {
  return (
    <>
      <div className="bg-rose-200 min-h-screen">
        <Footer></Footer>
        <Navbar></Navbar>
      </div>
    </>
  );
};
