// imports
import React, { useEffect, useState } from 'react';
// import services
import { updateContent } from '../../services/contentMainService';
import { TextModal } from './TextModal';

export const EditContent = ({ select, onClose }) => {
  // states
  const [modalContent, setModalContent] = useState({
    field: '',
    value: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [descripcionAboutMe, setDescripcionAboutMe] = useState('');
  const [descripcionEstudioAbordaje, setDescripcionEstudioAbordaje] =
    useState('');
  const [contactoMail, setContactoMail] = useState('');
  const [contactoNumero, setContactoNumero] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [contenido1, setContenido1] = useState('');
  const [contenido2, setContenido2] = useState('');
  const [fotoPiscologo, setFotoPiscologo] = useState(false);
  const [medioPago, setMedioPago] = useState(false);

  useEffect(() => {
    if (select) {
      setDescripcionAboutMe(select.descripcionAboutMe || '');
      setDescripcionEstudioAbordaje(select.descripcionEstudioAbordaje || '');
      setContactoMail(select.contactoMail || '');
      setContactoNumero(select.contactoNumero || '');
      setObjetivo(select.objetivo || '');
      setContenido1(select.contenido1 || '');
      setContenido2(select.contenido2 || '');
      setFotoPiscologo(select.fotoPiscologo || false);
      setMedioPago(select.medioPago || false);
    }
  }, [select]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedContent = {
      descripcionAboutMe,
      descripcionEstudioAbordaje,
      contactoMail,
      contactoNumero,
      objetivo,
      contenido1,
      contenido2,
      fotoPiscologo,
      medioPago,
    };
    try {
      const response = await updateContent(updatedContent);
      console.log('Content updated successfully:', response);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log('failed to update Content', error);
    }
  };
  const openModal = (field, value) => {
    setModalContent({ field, value });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

    // Actualizar el estado del campo según el que estaba siendo editado
    switch (modalContent.field) {
      case 'Sobre mi':
        setDescripcionAboutMe(modalContent.value);
        break;
      case 'Estudio y Abordaje':
        setDescripcionEstudioAbordaje(modalContent.value);
        break;
      case 'Objetivo':
        setObjetivo(modalContent.value);
        break;
      case 'Contenido (PARTE 1)':
        setContenido1(modalContent.value);
        break;
      case 'Contenido (PARTE 2)':
        setContenido2(modalContent.value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // exit when press ESC function
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        if (!isModalOpen) {
          onClose();
        }
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
      <div className="w-7/12 h-auto p-6 transition-all duration-300 transform scale-100 bg-white rounded-lg shadow-lg ">
        <h2 className="mb-4 text-lg font-bold">Editar Contenido</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Sobre mí:</label>
            <input
              type="text"
              defaultValue={descripcionAboutMe}
              onFocus={() => openModal('Sobre mi', descripcionAboutMe)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Estudio y Abordaje:</label>
            <input
              type="text"
              defaultValue={descripcionEstudioAbordaje}
              onFocus={() =>
                openModal('Estudio y Abordaje', descripcionEstudioAbordaje)
              }
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Objetivo:</label>
            <input
              type="text"
              defaultValue={objetivo}
              onFocus={() => openModal('Objetivo', objetivo)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contenido 1:</label>
            <input
              type="text"
              defaultValue={contenido1}
              onFocus={() => openModal('Contenido (PARTE 1)', contenido1)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Contenido 2:</label>
            <input
              type="text"
              defaultValue={contenido2}
              onFocus={() => openModal('Contenido (PARTE 2)', contenido2)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-between">
            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                defaultValue={contactoMail}
                onChange={(e) => setContactoMail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Teléfono:</label>
              <input
                type="text"
                defaultValue={contactoNumero}
                onChange={(e) => setContactoNumero(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Foto disponible:
                <input
                  type="checkbox"
                  checked={fotoPiscologo}
                  onChange={(e) => setFotoPiscologo(e.target.checked)}
                  className="ml-2"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Métodos de pago disponibles:
                <input
                  type="checkbox"
                  checked={medioPago}
                  onChange={(e) => setMedioPago(e.target.checked)}
                  className="ml-2"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 transition-all duration-300 bg-gray-400 rounded hover:bg-gray-500 hover:tracking-widest"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] transition-all duration-300  hover:tracking-widest"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <TextModal
          //isOpen={isModalOpen}
          modalContent={modalContent}
          onClose={closeModal}
          onSave={setModalContent}
        />
      )}
    </div>
  );
};
