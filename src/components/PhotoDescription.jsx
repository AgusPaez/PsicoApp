// imports
import React, { useEffect, useState } from 'react';
// import services
import { getMyProfile } from '../services/users';
//import image
import image from '../assets/images/firma.png';
export const PhotoDescription = ({ content, photo, content1, objetivo }) => {
  //states
  const [info, setInfo] = useState([]);

  useEffect(() => {
    //call service
    const fetchInfo = async () => {
      try {
        const id = '66bcc06f93afd85e1c31f15b';
        const response = await getMyProfile(id);
        setInfo(response.data);
      } catch (error) {
        console.log('error get info (name)', error);
      }
    };
    fetchInfo();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-between ">
        {/* Columna izquierda: Imagen y Descripción */}
        <div className="w-full p-8 mb-8 rounded-lg md:w-1/2 md:mb-0">
          {photo ? (
            <img
              className="object-cover mx-auto mb-6 border-2 border-[#9cbcfc] rounded-full w-72 h-72"
              src="https://www.shutterstock.com/image-photo/happy-professional-middle-eastern-female-260nw-2101132801.jpg"
              alt="imagen del profesional"
            />
          ) : (
            <h2>Imagen no disponible!</h2>
          )}

          <h2 className="mt-8 mb-4 text-3xl font-bold text-center ">
            Lic. {info.nombre}, {info.apellido}
          </h2>
          <div className="absolute flex items-center justify-center m-4 mt-8 ml-40 top-72"></div>
          <p className="px-3 pt-2 mt-4 mb-6 text-lg text-center text-gray-700">
            {content}
          </p>
          <div className="text-center">
            <button className="px-6 py-2  bg-[#8cabe7] rounded-full border border-[#7491c7] hover:bg-[#7491c7] hover:border-[#627daf] tracking-wide hover:tracking-widest transition-all duration-300 animate-pulse ">
              CONTACTAR
            </button>
          </div>
        </div>

        {/* Columna derecha: Misión y Visión */}
        <div className="w-full p-8  border-l-2 border-[#8cabe7] lg md:w-1/2 py-20 my-20">
          <h2 className="mb-4 text-3xl font-bold ">Misión</h2>
          <p className="mb-6 text-lg text-gray-700">{objetivo}</p>
          <p className="mb-6 text-lg text-gray-700">{content1}</p>
        </div>
      </div>
    </>
  );
};
