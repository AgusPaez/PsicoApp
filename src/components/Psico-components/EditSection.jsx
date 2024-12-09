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
        window.location.reload();
      } catch (error) {
        console.error('Failed to update study:', error);
      }
    } else {
      removeStudy();
    }
    // == false -> call removeStudy function
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
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete study:', error);
      //reset RemoveItem State
      setRemoveItem(false);
      window.location.reload();
    }
  };
  useEffect(() => {
    // exit when press ESC function
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 transition-all duration-300 transform scale-100 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-bold">Editar Estudio</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Nombre de carrera / curso"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              placeholder="Nombre de institución"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              placeholder="Año de egreso"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
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
              onClick={changueRemove}
              className="px-4 py-2 text-white transition-all duration-300 bg-red-500 rounded hover:bg-red-600 hover:tracking-widest"
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSection;
