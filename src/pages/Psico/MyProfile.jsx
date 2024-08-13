import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { Profile } from '../../components/Psico-components/Profile';
export const MyProfile = () => {
  return (
    <>
      <div className="bg-red-950 min-h-screen">
        <NavbarPsico />
        <Profile />
      </div>
    </>
  );
};
