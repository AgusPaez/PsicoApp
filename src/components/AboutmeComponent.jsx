// imports
import React, { useEffect, useState } from 'react';

//import components
import { PhotoDescription } from './PhotoDescription';
import { Approach } from './Approach';
import { Vision } from './Vision';
import { Pay } from './Pay';
import { Contact } from './Contact';

//imports Services
import { getContent } from '../services/contentMainService';

export const AboutmeComponent = () => {
  // states
  const [content, setContent] = useState([]);

  useEffect(() => {
    // call service
    const fetchContent = async () => {
      try {
        const response = await getContent();
        setContent(response[0]);
      } catch (error) {}
    };
    fetchContent();
  }, []);

  return (
    <div className="z-30 w-full h-full ">
      {/* bg-gradient-to-br from-purple-700/40 to-blue-500/40 */}
      <div className="relative w-full h-auto min-h-screen p-8 ">
        <PhotoDescription
          content={content.descripcionAboutMe}
          photo={content.fotoPiscologo}
          objetivo={content.objetivo}
          content1={content.contenido2}
        />
        {/* <Vision content={content.contenido1} /> */}
        {/* Sección de Estudios y Abordaje */}
        <Approach content={content.descripcionEstudioAbordaje} />
        {/* Métodos de Pago */}
        <Pay content={content.medioPago} />
        {/* Sección de Contacto */}
        <Contact
          contentMail={content.contactoMail}
          contentNro={content.contactoNumero}
        />
      </div>
    </div>
  );
};
