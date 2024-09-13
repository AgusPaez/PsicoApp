//imports
import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { Profile } from '../../components/Psico-components/Profile';
export const MyProfile = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-[#3d3763] to-[#69666e] ">
        <NavbarPsico />
        <Profile />
      </div>
    </>
  );
};
