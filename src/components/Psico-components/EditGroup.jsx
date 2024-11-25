//imports
import React, { useEffect, useState } from 'react';
//import rhf
import { useForm } from 'react-hook-form';
//import services
import { updateBond, deleteBond } from '../../services/bond';
import { findPatients } from '../../services/users';
import { getBond } from '../../services/bond';

export const EditGroup = ({ groupData, onClose }) => {
  //states
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bond, setBond] = useState([]);

  //rhf
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //get patients function
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await findPatients();
        const response = await getBond(groupData);
        setBond(response);
        setPatients(data);
      } catch (error) {
        console.log('Error fetch patients', error);
      }
    };
    fetchPatients();
  }, []);

  // set data
  useEffect(() => {
    if (bond) {
      reset({
        id: bond._id || '',
        nombre_vinculo: bond.nombre_vinculo || '',
        tipo: bond.tipo || '',
        pareja: bond.pareja || '',
        titular: bond.titular || '',
        ...[1, 2, 3, 4, 5].reduce(
          (acc, i) => ({ ...acc, [`hijo_${i}`]: bond[`hijo_${i}`] || '' }),
          {}
        ),
      });
    }
  }, [bond, reset]);

  // Actualizar función de eliminación
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteBond(bond._id);
      console.log('Grupo eliminado exitosamente');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
    } finally {
      setLoading(false);
    }
  };

  //update group
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateBond(bond._id, data);
      console.log('Grupo actualizado exitosamente');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error al conectarse con la API:', error);
    } finally {
      setLoading(false);
    }
  };

  //escape function
  useEffect(() => {
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
        <h2 className="mb-4 text-lg font-bold">Editar grupo familiar</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full">
            <div className="mb-4">
              <label className="block text-gray-700">Nombre</label>
              <input
                type="text"
                placeholder="Nombre del vínculo"
                {...register('nombre_vinculo', { required: true })}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.nombre_vinculo && (
                <span className="text-xs text-red-500">
                  El nombre del vínculo es obligatorio
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo de vínculo</label>
              <select
                {...register('tipo', { required: true })}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar tipo</option>
                <option value="no tiene">No tiene</option>
                <option value="pareja">Pareja</option>
                <option value="familia">Familia</option>
              </select>
              {errors.tipo && (
                <span className="text-xs text-red-500">
                  El tipo de vínculo es obligatorio
                </span>
              )}
            </div>
          </div>
          <div className="flex w-full">
            <div className="mb-4">
              <label className="block text-gray-700">Titular</label>
              <select
                {...register('titular', { required: true })}
                defaultValue={groupData.titular}
                className="w-full p-2 border rounded"
              >
                {/* <option value="">Seleccionar titular</option> */}
                <option defaultValue={groupData?.titular}>
                  {groupData?.titular}
                </option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.nombre} {patient.apellido}
                  </option>
                ))}
              </select>
              {errors.titular && (
                <span className="text-xs text-red-500">
                  Seleccionar el titular es obligatorio
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Pareja</label>
              <select
                {...register('pareja')}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar pareja</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.nombre} {patient.apellido}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="mb-2" key={`hijo_${i}`}>
              <label className="block text-gray-700">Hijo {i} (opcional)</label>
              <select
                {...register(`hijo_${i}`)}
                className="w-full p-2 border rounded"
              >
                <option value="">Seleccionar hijo</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.nombre} {patient.apellido}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 transition-all duration-300 bg-gray-400 rounded hover:bg-gray-500 hover:tracking-widest"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-white transition-all duration-300 bg-red-500 rounded hover:bg-red-600 hover:tracking-widest"
              disabled={loading}
            >
              {loading ? 'Eliminando...' : 'Eliminar'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
