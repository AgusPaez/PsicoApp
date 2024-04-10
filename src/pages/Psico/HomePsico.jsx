import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { Welcome } from '../../components/Psico-components/Welcome';

export const HomePsico = () => {
  return (
    <>
      <div className="bg-red-950 min-h-screen">
        <NavbarPsico />
        <Welcome />
      </div>
    </>
  );
};
