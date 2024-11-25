// imports
import React, { useEffect, useState } from 'react';
// import services
import { getMyProfile } from '../services/users';
//import image
import image from '../assets/images/firma.png';
import { useNavigate } from 'react-router-dom';
export const PhotoDescription = ({
  content,
  photo,
  content1,
  objetivo,
  profesionalRegistration,
}) => {
  //states
  const [info, setInfo] = useState([]);

  useEffect(() => {
    //call service
    const fetchInfo = async () => {
      try {
        const id = '67291ac4daf65b986d34e3c4';
        const response = await getMyProfile(id);
        setInfo(response.data);
      } catch (error) {
        console.log('error get info (name)', error);
      }
    };
    fetchInfo();
  }, []);
  const navigate = useNavigate();
  const Nav = () => navigate('/Appointment');

  return (
    <>
      <div className="flex flex-wrap justify-between md:px-4 ">
        <div className="items-center w-full pt-0 mb-2 rounded-lg md:pt-8 md:mb-8 md:w-1/2 ">
          {photo ? (
            <img
              className="object-cover mx-auto  md:mb-6 border-2 border-[#9cbcfc] rounded-full w-44 h-44 md:w-72 md:h-72"
              src="https://www.shutterstock.com/image-photo/happy-professional-middle-eastern-female-260nw-2101132801.jpg"
              alt="imagen del profesional"
            />
          ) : (
            <div className="justify-center w-full h-20 text-center md:h-36">
              Imagen no disponible
            </div>
          )}

          <div className="absolute flex items-center justify-center m-4 mt-8 ml-40 top-72"></div>
          <div className="flex justify-center mx-auto mt-4 ">
            <button
              onClick={Nav}
              className="px-6 py-2 mb-8 bg-[#8cabe7] rounded-full border border-[#7491c7] hover:bg-[#7491c7] hover:border-[#627daf] tracking-wide hover:tracking-widest transition-all duration-300 animate-pulse "
            >
              CONTACTAR
            </button>
          </div>
        </div>

        {/* Columna derecha: Misión y Visión */}
        {/* 
        <div className="w-full p-2 border-l-2 border-r-2 border-[#8cabe7] pt-1 mt-1">
          <h2 className="mt-4 mb-2 text-2xl font-bold text-center ">
            Lic. {info.nombre}, {info.apellido}
          </h2>
          <p className="px-3 pt-2 mt-4 mb-6 text-lg text-center text-gray-700">
            {content}
          </p>
        </div> */}

        <div className="w-full md:p-8 border-l-2 border-r-2 md:border-r-0 border-[#8cabe7] lg md:w-1/2 md:pt-8 md:mt-8">
          <h2 className="mb-4 text-3xl font-bold text-center md:mt-8 ">
            Lic. {info.nombre}, {info.apellido}
          </h2>
          <h4 className="p-2 m-2 text-center">
            Matricula : {profesionalRegistration}
          </h4>
          <p className="px-3 pt-2 mt-4 mb-6 text-lg text-center text-gray-700">
            {content}
          </p>
        </div>
      </div>

      {/* Contenido de abajo (MISION) */}
      <div className="relative my-10 md:my-16 border-t-2 md:mx-28 border-[#8cabe7]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3.5em"
          height="3.5em"
          viewBox="0 0 24 24"
          className="absolute left-6 top-6"
        >
          <path
            fill="#8cabe7"
            d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-1.16-.21-2.31-.61-3.39l-1.6 1.6c.14.59.21 1.19.21 1.79a8 8 0 0 1-8 8a8 8 0 0 1-8-8a8 8 0 0 1 8-8c.6 0 1.2.07 1.79.21L15.4 2.6C14.31 2.21 13.16 2 12 2m7 0l-4 4v1.5l-2.55 2.55C12.3 10 12.15 10 12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-.15 0-.3-.05-.45L16.5 9H18l4-4h-3zm-7 4a6 6 0 0 0-6 6a6 6 0 0 0 6 6a6 6 0 0 0 6-6h-2a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4z"
          />
        </svg>
        <h1 className="m-2 my-10 text-3xl md:text-3xl ml-28 ">Misión</h1>
        <p className="px-4 mb-2 text-lg text-center text-gray-700 md:px-16">
          {objetivo}
        </p>
        <p className="px-4 mt-4 text-lg text-center text-gray-700 md:px-16 ">
          {content1}
        </p>
      </div>
    </>
  );
};
