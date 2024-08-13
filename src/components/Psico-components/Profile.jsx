import React from 'react';

const data = {
  nombre: 'agustin',
  apellido: 'paez',
  email: 'example',
  rol: 'admin',
  imagenUrl: '',
};
export const Profile = () => {
  return (
    <>
      <div>
        <h1>Nombre de la cuenta:</h1>
        <>
          {data.apellido}, {data.nombre}{' '}
        </>
        <h1>Email asociado:</h1>
        <> {data.email}</>
        <h1>ROL:</h1>
        <> {data.rol} </>
        <image alt="foto de perfil" url={data.imagenUrl} />
      </div>
      <div>
        <button>Editar Datos personales</button>
      </div>
    </>
  );
};
