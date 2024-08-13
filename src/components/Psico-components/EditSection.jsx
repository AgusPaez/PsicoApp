import React, { useEffect, useState } from 'react';

//import services
import { updateStudy } from '../../services/StudiesService';

const EditSection = ({ select, onClose }) => {
  // required states for the form
  const [titulo, setTitulo] = useState('');
  const [institucion, setInstitucion] = useState('');
  const [anio, setAnio] = useState('');
  const [id, setId] = useState('');
  // update the imputs values
  useEffect(() => {
    if (select) {
      setId(select._id || '');
      setTitulo(select.titulo || '');
      setInstitucion(select.institucion || '');
      setAnio(select.anio || '');
    }
  }, [select]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...(titulo && { titulo }),
      ...(institucion && { institucion }),
      ...(anio && { anio }),
    };
    try {
      const updatedStudy = await updateStudy(id, data);
      console.log('Study updated successfully:', updatedStudy);
    } catch (error) {
      console.error('Failed to update study:', error);
    }
  };

  return (
    <div className="h-48 w-44 text-green-600">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          //defaultValue={select.titulo}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          type="text"
          //defaultValue={select.institucion}
          value={institucion}
          onChange={(e) => setInstitucion(e.target.value)}
        />

        <input
          type="number"
          //valuealue={select.anio}
          value={anio}
          onChange={(e) => setAnio(e.target.value)}
        />

        <button type="submit"> guardar</button>
        <button> eliminar</button>
      </form>
      <button onClick={onClose}>cerrar</button>
    </div>
  );
};

export default EditSection;
