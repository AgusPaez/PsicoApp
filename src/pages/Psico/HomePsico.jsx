import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { Welcome } from '../../components/Psico-components/Welcome';

export const HomePsico = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-[#4e4075] to-[#3d315c]">
        <NavbarPsico />
        <Welcome />
      </div>
    </>
  );
};
