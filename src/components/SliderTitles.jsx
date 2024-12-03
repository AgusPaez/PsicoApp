import React, { useState, useEffect, useRef } from 'react';

export const SliderTitles = () => {
  const imagenes = [
    'https://resizer.glanacion.com/resizer/v2/la-universidad-de-buenos-aires-confeccionara-y-F5NVVQLRBVBL7ET6NHYJ6XJ3HU.jpg?auth=56dd190c6e230c66c4ca82e531393eced0ecf65c6945170af3dbb73ae6ddb49c&width=880&height=586&quality=70&smart=true',
    'https://http2.mlstatic.com/D_NQ_NP_780289-MLA46948036635_082021-O.webp',
    'https://0.academia-photos.com/attachment_thumbnails/60212991/mini_magick20190805-20952-1rnowu.png?1565061769',
    'https://tramitesargentinosadistancia.com/wp-content/uploads/2021/04/Titulo-Universitario.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRq-iJFqtf2u50uOFVdd0lRzsDz0Bv7Q1iPo_fbKB3f2Qm9B_uqkoB5g4wbphCyQ6aHDs&usqp=CAU',
    'https://www.clinicasobesitas.com/wp-content/uploads/2013/04/JV20-titulo-licenciado-medicina.jpg.webp',
    'https://www.clinicasobesitas.com/wp-content/uploads/2013/04/Expert-meeting-2016.jpg.webp',
    'https://www.clinicasobesitas.com/wp-content/uploads/2013/04/JV20-titulo-licenciado-medicina.jpg.webp',
    'https://resizer.glanacion.com/resizer/v2/la-universidad-de-buenos-aires-confeccionara-y-F5NVVQLRBVBL7ET6NHYJ6XJ3HU.jpg?auth=56dd190c6e230c66c4ca82e531393eced0ecf65c6945170af3dbb73ae6ddb49c&width=880&height=586&quality=70&smart=true',
    'https://http2.mlstatic.com/D_NQ_NP_780289-MLA46948036635_082021-O.webp',
  ];

  const [mover, setMover] = useState(0);
  const [transicion, setTransicion] = useState(true);
  const cantidad = imagenes.length;
  const imagenesVisibles = 3;
  const sliderRef = useRef(null);

  // copy images
  const imagenesClonadas = [...imagenes, ...imagenes];

  // set effect for images
  useEffect(() => {
    const intervalo = setInterval(() => {
      moverSiguienteImagen();
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const moverSiguienteImagen = () => {
    setMover((prevMover) => prevMover + 1);
  };

  useEffect(() => {
    // reset carousel
    if (mover % cantidad === 0 && mover !== 0) {
      setTransicion(false);
      setTimeout(() => {
        setMover(0);
        setTransicion(true);
      }, 50);
    }
  }, [mover]);

  return (
    <div className="flex justify-center p-2 m-2 mt-24 overflow-hidden">
      <div
        ref={sliderRef}
        className={`flex flex-row ${
          transicion
            ? 'transition-transform duration-[10000ms] ease-linear'
            : ''
        }`}
        style={{
          transform: `translateX(-${
            (mover % cantidad) * (100 / imagenesVisibles)
          }%)`,
        }}
      >
        {imagenesClonadas.map((imagen, index) => (
          <div key={index} className="flex-none w-1/3 px-10">
            <img
              className="object-contain w-full h-60"
              src={imagen}
              alt={`Imagen ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
