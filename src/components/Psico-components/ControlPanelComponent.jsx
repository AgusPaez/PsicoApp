import React, { useState } from 'react';
// Importar componentes
import { LayoutAboutMe } from '../Psico-components/LayoutAboutMe';
import { LayoutStudies } from './LayoutStudies';

export const ControlPanelComponent = () => {
  // Estados
  const [section, setSection] = useState(0);
  // console.log("USE STATE PRIMERO = ", section)
  //cambia la variable de la section
  const changeSection = (nro) => {
    setSection(nro);
  };
  //se selecciona que layout se renderiza
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
  // console.log("USE STATE  = ", section)
  return (
    <>
      <section className="bg-black text-gray-400 p-5 m-12 mt-20 flex justify-center rounded-full ">
        <h2>Panel de control</h2>
      </section>
      <section className="bg-black text-gray-400 p-5 m-12 mb-2 mt-20 flex justify-center rounded-full ">
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
      {/* <section className="bg-black text-gray-400 p-5 my-12 m-8  flex justify-center rounded-full ">
        <form>
          <input type="text" />
          <label htmlFor=""></label>
          <input type="text" />
          <label htmlFor=""></label>
          <input type="text" />
          <label htmlFor=""></label>
        </form>
      </section> */}
    </>
  );
};
