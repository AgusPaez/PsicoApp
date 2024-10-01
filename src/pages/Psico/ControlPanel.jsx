import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { ControlPanelComponent } from '../../components/Psico-components/ControlPanelComponent';
export const ControlPanel = () => {
  return (
    <>
      <div className="min-h-[100vh] bg-gradient-to-tr from-[#4e4075] to-[#3d315c]">
        <NavbarPsico />
        <ControlPanelComponent />
      </div>
    </>
  );
};
