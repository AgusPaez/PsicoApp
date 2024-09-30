// imports
import React, { useState } from 'react';
// imports components
import { LayoutAboutMe } from '../Psico-components/LayoutAboutMe';
import { LayoutStudies } from './LayoutStudies';
import { LayoutPatients } from './LayoutPatients';
import { AsideControlPanel } from './AsideControlPanel';

export const ControlPanelComponent = () => {
  // states
  const [section, setSection] = useState(1);

  //changue variables sections
  const changeSection = (nro) => {
    setSection(nro);
  };
  //select layout
  const renderSection = () => {
    switch (section) {
      case 1:
        return <LayoutAboutMe />;
        break;
      case 2:
        return <LayoutStudies />;
        break;
      case 3:
        return <LayoutPatients />;
    }
  };
  return (
    <>
      <section className="flex w-full h-[92vh]">
        <AsideControlPanel changeSection={changeSection} section={section} />
        {renderSection()}
      </section>
    </>
  );
};
