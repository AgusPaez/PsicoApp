import React, { useEffect, useState } from 'react';

//import services
import { updateStudy, deleteStudy } from '../../services/StudiesService';

const EditSection = ({ select, onClose }) => {
  //delete?
  const [removeItem, setRemoveItem] = useState(false);

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

    if (removeItem === false) {
      //try update
      try {
        const updatedStudy = await updateStudy(id, data);
        console.log('Study updated successfully:', updatedStudy);
      } catch (error) {
        console.error('Failed to update study:', error);
      }
    }
    // == false -> call removeStudy function
    removeStudy();
  };

  //modify RemoveItem State
  const changueRemove = () => {
    setRemoveItem(true);
  };
  // delete studies function
  const removeStudy = async () => {
    try {
      const remove = await deleteStudy(id);
      console.log('Study deleted successfully');
      //reset RemoveItem State
      setRemoveItem(false);
    } catch (error) {
      console.error('Failed to delete study:', error);
      //reset RemoveItem State
      setRemoveItem(false);
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
        <button onClick={changueRemove}> eliminar</button>
      </form>
      <button onClick={onClose}>cerrar</button>
    </div>
  );
};

export default EditSection;
