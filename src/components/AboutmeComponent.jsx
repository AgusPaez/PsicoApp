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
    <div className="w-full h-full font-libre">
      {/* bg-gradient-to-br from-purple-700/40 to-blue-500/40 */}
      <PhotoDescription
        content={content.descripcionAboutMe}
        photo={content.fotoPiscologo}
      />
      <Approach content={content.descripcionEstudioAbordaje} />
      <Vision content={content.contenido1} />
      <Pay content={content.medioPago} />
      <Contact
        contentMail={content.contactoMail}
        contentNro={content.contactoNumero}
      />
    </div>
  );
};
