import React from 'react';

export const LayoutStudies = () => {
  return (
    <form className="bg-black text-gray-400 p-5 my-12 m-8 flex flex-col justify-center rounded-full  ">
      <label className="flex flex-col" htmlFor="">
        Nombre del/la Psicologo/a
      </label>
      <input></input>
      <label className="flex flex-col" htmlFor="">
        Formacion
      </label>
      <input></input>
      <label className="flex flex-col" htmlFor="">
        Imagenes
      </label>
      <input></input>
    </form>
  );
};
