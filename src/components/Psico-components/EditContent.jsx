//imports
import React, { useEffect, useState } from 'react';
//import services
import { updateContent } from '../../services/contentMainService';

export const EditContent = ({ select, onClose }) => {
  // states
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
    } catch (error) {
      console.log('failed to update Content', error);
    }
  };

  return (
    <div className="grid grid-cols-2 bg-green-600 ">
      <form onSubmit={handleSubmit}>
        <label>Sobre mí:</label>
        <input
          type="text"
          value={descripcionAboutMe}
          onChange={(e) => setDescripcionAboutMe(e.target.value)}
        />

        <label>Estudio y Abordaje:</label>
        <input
          type="text"
          value={descripcionEstudioAbordaje}
          onChange={(e) => setDescripcionEstudioAbordaje(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="email"
          value={contactoMail}
          onChange={(e) => setContactoMail(e.target.value)}
        />

        <label>Teléfono:</label>
        <input
          type="text"
          value={contactoNumero}
          onChange={(e) => setContactoNumero(e.target.value)}
        />

        <label>Objetivo:</label>
        <input
          type="text"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
        />

        <label>Contenido 1:</label>
        <input
          type="text"
          value={contenido1}
          onChange={(e) => setContenido1(e.target.value)}
        />

        <label>Contenido 2:</label>
        <input
          type="text"
          value={contenido2}
          onChange={(e) => setContenido2(e.target.value)}
        />

        <label>
          Foto disponible:
          <input
            type="checkbox"
            checked={fotoPiscologo}
            onChange={(e) => setFotoPiscologo(e.target.checked)}
          />
        </label>

        <label>
          Métodos de pago disponibles:
          <input
            type="checkbox"
            checked={medioPago}
            onChange={(e) => setMedioPago(e.target.checked)}
          />
        </label>

        <button type="submit">Guardar</button>
      </form>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};
