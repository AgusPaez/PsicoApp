// imports
import React, { useEffect, useState } from 'react';

// import services
import { getMyProfile } from '../services/users';

export const PhotoDescription = ({ content }, { photo }) => {
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
  console.log(info);

  return (
    <>
      <section className="flex m-5">
        <div className="m-2">
          {info.nombre}, {info.apellido}
        </div>
        <div className="m-2">
          {/* {info.imagenUrl} */}
          {{ photo } ? (
            <img
              src="https://www.shutterstock.com/image-photo/happy-professional-middle-eastern-female-260nw-2101132801.jpg"
              alt="imagen del profesional"
            />
          ) : (
            <h2>Imagen no disponible!</h2>
          )}
        </div>
        <div className="m-2">{content} </div>
      </section>
    </>
  );
};
