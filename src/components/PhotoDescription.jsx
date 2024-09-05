// imports
import React, { useEffect, useState } from 'react';
// import services
import { getMyProfile } from '../services/users';
//import image
import image from '../assets/images/firma.png';
export const PhotoDescription = ({ content, photo }) => {
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
      <section className="flex h-auto mx-10 mt-auto ">
        <div className="flex items-center justify-center flex-1 my-16 mt-10 ml-4 text-center">
          <div className="flex flex-col items-center">
            <span className="m-4 mt-20 text-4xl">
              {info.nombre}, {info.apellido}
            </span>
            <div className="flex items-center justify-center m-4 mt-8 ml-40">
              <img src={image} width={250} height={250} />
            </div>
          </div>
          <div className="absolute flex flex-1 w-60 border-r-2 border-r-[#d4d4d4] rounded-[185px] rounded-br-lg h-[10rem] left-[16.2rem] top-20 px-14"></div>
        </div>

        <div className="relative flex items-center justify-center flex-1 px-2 mx-10 mt-0">
          {photo ? (
            <img
              className="rounded-b-[180px] w-full h-96 top-0 px-4 absolute"
              src="https://www.shutterstock.com/image-photo/happy-professional-middle-eastern-female-260nw-2101132801.jpg"
              alt="imagen del profesional"
              width={550}
              height={550}
            />
          ) : (
            <h2>Imagen no disponible!</h2>
          )}
          <div className="absolute flex flex-1 w-full border-b-4 border-b-[#d4d4d4] rounded-[185px] h-[25rem] top-0 px-14"></div>
        </div>
        <div className="flex items-center justify-center flex-1 m-2 mt-24 mr-4">
          {content}
          <div className="absolute flex flex-1 w-60 border-l-2 border-l-[#d4d4d4] rounded-[185px] rounded-bl-lg h-[10rem] right-[16.5rem] top-20 px-14"></div>
        </div>
      </section>
    </>
  );
};
