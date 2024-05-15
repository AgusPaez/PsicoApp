import React, { useState } from 'react';

export const SliderTitles = () => {
  const imagenes = [
    'https://resizer.glanacion.com/resizer/v2/la-universidad-de-buenos-aires-confeccionara-y-F5NVVQLRBVBL7ET6NHYJ6XJ3HU.jpg?auth=56dd190c6e230c66c4ca82e531393eced0ecf65c6945170af3dbb73ae6ddb49c&width=880&height=586&quality=70&smart=true',
    'https://http2.mlstatic.com/D_NQ_NP_780289-MLA46948036635_082021-O.webp',
    'https://0.academia-photos.com/attachment_thumbnails/60212991/mini_magick20190805-20952-1rnowu.png?1565061769',
    'https://tramitesargentinosadistancia.com/wp-content/uploads/2021/04/Titulo-Universitario.jpg',
    'https://lh3.googleusercontent.com/proxy/8p_Pgl3zA0Aqc8QjnDVWuVIDRnmze8ZAOd_rUBqa9h9THBGvfJvybYo8NziQWgXDwIKpbwBlP-BjAqz9Q-cK2csZxg9Nr_w1ij69bgiH4w',
  ];
  const [imagenActual, setImagenActual] = useState(0);
  const cantidad = imagenes?.length;

  if (!Array.isArray(imagenes) || cantidad === 0) return;

  const siguienteImagen = () => {
    setImagenActual(imagenActual == cantidad - 1 ? 0 : imagenActual + 1);
  };

  const anteriorImagen = () => {
    setImagenActual(imagenActual == 0 ? cantidad - 1 : imagenActual - 1);
  };

  return (
    <>
      <div className=" flex flex-row justify-center">
        <button onClick={anteriorImagen}>Izquierda</button>
        {imagenes.map((imagen, index) => {
          return (
            <div
              className={`transition-opacity duration-500 ease-in-out ${
                imagenActual === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {imagenActual === index && (
                <img
                  height={230}
                  width={240}
                  key={index}
                  src={imagen}
                  alt="imagen"
                />
              )}
            </div>
          );
        })}
        <button onClick={siguienteImagen}> derecha</button>
      </div>
    </>
  );
};
