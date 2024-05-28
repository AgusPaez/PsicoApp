import React from 'react';
// imports components
import { LayoutAboutMe } from '../Psico-components/LayoutAboutMe';
export const ControlPanelComponent = () => {
  return (
    <>
      <section className="bg-black text-gray-400 p-5 m-12 mt-20 flex justify-center rounded-full ">
        <h2>Panel de control</h2>
      </section>
      <section className="bg-black text-gray-400 p-5 m-12 mb-2 mt-20 flex justify-center rounded-full ">
        <div className="">
          <button className="p-2 m-2 border hover:opacity-50">
            Personalizar "Sobre Mi"
          </button>
          <button className="p-2 m-2 border hover:opacity-50">
            Personalizar "Citas"
          </button>
          <button className="p-2 m-2 border hover:opacity-50">
            Personalizar "Estudios"
          </button>
          <button className="p-2 m-2 border hover:opacity-50">
            Personalizar "Citas"
          </button>
        </div>
      </section>

      <LayoutAboutMe />
      {/* <section className="bg-black text-gray-400 p-5 my-12 m-8  flex justify-center rounded-full "> */}
      {/* Agregar componente */}
      {/* <form>
          <input type="text" />
          <label htmlFor=""></label>
          <input type="text" />
          <label htmlFor=""></label>
          <input type="text" />
          <label htmlFor=""></label>
        </form> */}
      {/* </section> */}
    </>
  );
};
