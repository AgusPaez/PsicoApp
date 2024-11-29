//imports
import React, { useEffect, useState } from 'react';
//imports icons
import { AboutMeICON } from '../../assets/icons/AboutMeICON';
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
      <section className="flex flex-col w-11/12 min-h-[80vh] p-3 mx-auto mt-5 border border-blue-500 md:h-auto md:w-5/6 md:p-5 md:m-5 md:ml-10 rounded-xl">
        <div className="flex items-center justify-center gap-4 p-2 m-4 ">
          <AboutMeICON h={40} w={40} color={'#edf0ea'} />
          <h2 className="font-semibold text-black">
            EDICION SECCION: SOBRE MI
          </h2>
          <AboutMeICON h={40} w={40} color={'#edf0ea'} />
        </div>

        {/* Sobre mi */}
        <div className="relative p-1 m-1 mx-auto text-black group">
          <h3 className="relative inline-block text-xl font-semibold transition-all duration-700 animate-pulse group-hover:scale-110">
            Sobre mí:
            <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-bottom-right group-hover:origin-bottom-left"></span>
          </h3>
          <p>{content.descripcionAboutMe}</p>
        </div>
        {/* Estudio y abordaje */}
        <div className="relative p-1 m-1 mx-auto text-black group">
          <h3 className="relative inline-block text-xl font-semibold transition-all duration-700 animate-pulse group-hover:scale-110">
            Estudio y abordaje:
            <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-bottom-right group-hover:origin-bottom-left"></span>
          </h3>
          <p>{content.descripcionEstudioAbordaje}</p>
        </div>
        {/* Objetivo */}
        <div className="relative p-1 m-1 mx-auto text-black group">
          <h3 className="relative inline-block text-xl font-semibold transition-all duration-700 animate-pulse group-hover:scale-110">
            Objetivo:
            <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-bottom-right group-hover:origin-bottom-left"></span>
          </h3>
          <p>{content.objetivo}</p>
        </div>
        {/* Contenido */}
        <div className="relative p-1 m-1 mx-auto text-black group">
          <h3 className="relative inline-block text-xl font-semibold transition-all duration-700 animate-pulse group-hover:scale-110">
            Contenido:
            <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-bottom-right group-hover:origin-bottom-left"></span>
          </h3>
          <p>{content.contenido1}</p>
          <p>{content.contenido2}</p>
        </div>

        {/* Contacto */}
        <div className="flex ">
          <div className="relative p-1 m-1 mx-auto text-black group">
            <h3 className="relative inline-block text-xl font-semibold transition-all duration-700 animate-pulse group-hover:scale-110">
              Contacto:
              <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-bottom-right group-hover:origin-bottom-left"></span>
            </h3>
            <p>
              <strong className="font-semibold">Email:</strong>{' '}
              {content.contactoMail}
            </p>

            <p>
              <strong className="font-semibold">Teléfono:</strong>{' '}
              {content.contactoNumero}
            </p>
          </div>
          {/* Otros detalles */}
          <div className="relative p-1 m-1 mx-auto text-black group">
            <h3 className="relative inline-block text-xl font-semibold transition-all duration-700 animate-pulse group-hover:scale-110">
              Otros detalles:
              <span className="block absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-bottom-right group-hover:origin-bottom-left"></span>
            </h3>
            <p>
              <strong className="font-semibold">Foto disponible:</strong>{' '}
              {content.fotoPiscologo ? 'Sí' : 'No'}
            </p>

            <p>
              <strong className="font-semibold">
                Métodos de pago disponibles:
              </strong>{' '}
              {content.medioPago ? 'Sí' : 'No'}
            </p>
          </div>
        </div>
        <button
          className="text-center py-1 px-2 mx-auto text-[#0084f0] hover:font-semibold hover:text-[#64b9ff] animate-pulse ease-in-out transition-all duration-500 hover:tracking-widest hover:scale-110"
          onClick={() => OpenEdit(content)}
        >
          EDITAR
        </button>
      </section>
      <div>
        {edit && (
          <EditContent select={selected} onClose={CloseEdit}></EditContent>
        )}
      </div>
    </>
  );
};
