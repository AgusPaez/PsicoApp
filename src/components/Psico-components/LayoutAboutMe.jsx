//imports
import React, { useEffect, useState } from 'react';
//import components
//import EditSection from './EditSection';
import { EditContent } from './EditContent';
//import service
import { getContent } from '../../services/contentMainService';

export const LayoutAboutMe = () => {
  //states
  const [content, setContent] = useState({});
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        //call service
        const response = await getContent();
        //update content Main
        setContent(response[0]);
      } catch (error) {
        console.log('Error fetching content Main', error);
      }
    };
    fetchContent();
  }, []);
  console.log('CONTENTMAIN: ', content);

  // open menu to edit function - save contentMain
  // const OpenEdit = (prop, prop2) => {
  //   setEdit(true);
  //   setSelected({ prop, prop2 });
  // };

  const OpenEdit = (object) => {
    setEdit(true);
    setSelected(object);
  };

  console.log(selected);
  // close menu to edit function
  const CloseEdit = () => {
    setEdit(false);
  };

  const OpenAdd = () => {
    setAdd(true);
  };
  const CloseAdd = () => {
    setAdd(false);
  };

  return (
    <>
      <div className="flex justify-center p-5 m-8 my-12 text-gray-400 bg-black rounded-full ">
        <h2>About Me</h2>

        <div className="p-2 m-4">
          <h3>Sobre mí:</h3>
          <p>{content.descripcionAboutMe}</p>
        </div>

        <div className="p-2 m-4">
          <h3>Estudio y Abordaje:</h3>
          <p>{content.descripcionEstudioAbordaje}</p>
        </div>

        <div className="p-2 m-4">
          <h3>Contacto:</h3>
          <p>
            <strong>Email:</strong> {content.contactoMail}
          </p>
          <p>
            <strong>Teléfono:</strong> {content.contactoNumero}
          </p>
        </div>

        <div className="p-2 m-4">
          <h3>Objetivo:</h3>
          <p>{content.objetivo}</p>
        </div>

        <div className="p-2 m-4">
          <h3>Contenido:</h3>
          <p>{content.contenido1}</p>
          <p>{content.contenido2}</p>
        </div>

        <div className="p-2 m-4">
          <h3>Otros detalles:</h3>
          <p>
            <strong>Foto disponible:</strong>{' '}
            {content.fotoPiscologo ? 'Sí' : 'No'}
          </p>
          <p>
            <strong>Métodos de pago disponibles:</strong>{' '}
            {content.medioPago ? 'Sí' : 'No'}
          </p>
        </div>
        <button className="m-2" onClick={() => OpenEdit(content)}>
          Editar
        </button>
      </div>
      <div>
        {edit && (
          <EditContent select={selected} onClose={CloseEdit}></EditContent>
        )}
      </div>
    </>
  );
};
