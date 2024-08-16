// imports
import React, { useState } from 'react';
// imports components
import { LayoutAboutMe } from '../Psico-components/LayoutAboutMe';
import { LayoutStudies } from './LayoutStudies';

export const ControlPanelComponent = () => {
  // states
  const [section, setSection] = useState(0);

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
      default:
      case 2:
        return <LayoutStudies />;
        break;
        break;
    }
  };
  return (
    <>
      <section className="flex justify-center p-5 m-12 mt-20 text-gray-400 bg-black rounded-full ">
        <h2>Panel de control</h2>
      </section>
      <section className="flex justify-center p-5 m-12 mt-20 mb-2 text-gray-400 bg-black rounded-full ">
        <div>
          <button
            className="p-2 m-2 border hover:opacity-50"
            onClick={() => changeSection(1)}
          >
            Personalizar "Sobre Mi"
          </button>
          <button
            className="p-2 m-2 border hover:opacity-50"
            onClick={() => changeSection(2)}
          >
            Personalizar "Citas"
          </button>
          <button
            className="p-2 m-2 border hover:opacity-50"
            onClick={() => changeSection(3)}
          >
            Personalizar "Estudios"
          </button>
          <button
            className="p-2 m-2 border hover:opacity-50"
            onClick={() => changeSection(4)}
          >
            Personalizar "Citas"
          </button>
        </div>
      </section>
      {renderSection()}
      {/* Sección adicional si es necesario */}
    </>
  );
};
