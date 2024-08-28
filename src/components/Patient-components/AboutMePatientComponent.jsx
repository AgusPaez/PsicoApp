//imports
import React from 'react';
//import context
import { useAuth } from '../../context/AuthProvider';

export const AboutMePatientComponent = () => {
  //context
  const { dataLogin } = useAuth();

  return (
    <>
      <section>
        datos sobre el perfil (citas, datos personales, cambiar la contraseña ,
        eliminar cuenta)
      </section>
    </>
  );
};
