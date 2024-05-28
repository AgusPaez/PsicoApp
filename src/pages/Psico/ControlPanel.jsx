import React from 'react';
//Import Components
import { NavbarPsico } from '../../components/Psico-components/NavbarPsico';
import { ControlPanelComponent } from '../../components/Psico-components/ControlPanelComponent';
export const ControlPanel = () => {
  return (
    <>
      <div className="bg-red-950 min-h-screen">
        <NavbarPsico />
        <ControlPanelComponent />
      </div>
    </>
  );
};
