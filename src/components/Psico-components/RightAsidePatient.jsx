//imports
import React, { useEffect, useState } from 'react';
//import services
import { updateMyProfile } from '../../services/users';
import { getAppointmentsByEmail } from '../../services/appointmentService';
//import Spinner
import { LoadingSpinner } from '../LoadingSpinner';
export const RightAsidePatient = ({ isOpen, user, onClose }) => {
  //states
  const [countAppointments, setCountAppointments] = useState(0);
  const [loading, setLoading] = useState(false);
  //set data
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    dni: user?.dni || '',
    fecha_nacimiento: user?.fecha_nacimiento?.slice(0, 10) || 0,
    email: user?.email || '',
    numero: user?.numero || '',
    rol: user?.rol || 'paciente',
    obra_social: user?.obra_social || 'NO TIENE',
  });
  //set data
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || '',
        apellido: user.apellido || '',
        dni: user.dni || '',
        fecha_nacimiento: user.fecha_nacimiento?.slice(0, 10) || 0,
        email: user.email || '',
        numero: user.numero || '',
        rol: user.rol || 'paciente',
        obra_social: user.obra_social || 'NO TIENE',
      });
    }
  }, [user]);
  //calculate age function
  const calculateAge = (birthDate) => {
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };
  //desconstruct
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //call service and send data
      setLoading(true);
      setTimeout(async () => {
        const UpdateProfile = await updateMyProfile(user._id, formData);
        console.log('Perfil Actualizado:', UpdateProfile);
        setLoading(false);
        onClose();
        window.location.reload();
      }, 4000);
    } catch (error) {
      console.log('Error al actualizar el perfil', error);
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

  //get appointments
  useEffect(() => {
    const GetAppointments = async () => {
      try {
        //call service (Get appointments for email)
        const GetAppointmentsForUser = await getAppointmentsByEmail(user.email);
        if (Array.isArray(GetAppointmentsForUser)) {
          //add to count
          setCountAppointments(GetAppointmentsForUser.length);
        } else {
          setCountAppointments(0);
        }
      } catch (error) {
        console.log('Error al traer las appointments:', error);
        if (error.response && error.response.status === 404) {
          setCountAppointments(0);
        } else {
          setCountAppointments(0);
        }
      }
    };

    GetAppointments();
  }, []);
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-700 ${
            isOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={onClose}
        ></div>
      )}

      {/* Aside */}
      <aside
        className={`fixed top-0 right-0 h-full w-5/12 z-50 bg-gradient-to-r from-[#e7e7e7fb] to-[#fdfdfdfd] shadow-lg transform transition-transform duration-700 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full p-4">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex place-content-between">
            <h2 className="mx-6 mb-4 text-2xl font-bold">
              Detalles del Paciente
            </h2>
          </div>

          {user ? (
            <form className="gap-6 m-6 space-y-4 h-5/6" onSubmit={handleSubmit}>
              <div className="flex w-full space-x-10">
                <div className="w-1/5">
                  <img
                    src={user?.imagenUrl || ''}
                    alt="Imagen de usuario"
                    className="w-24 h-24 border rounded-full shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Apellido:</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex w-full gap-6 pt-2 place-content-between">
                <div className="w-1/2">
                  <label className="block text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700">Número:</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  />
                </div>
                <div className="w-16">
                  <label className="block text-gray-700">Edad:</label>
                  <input
                    type="number"
                    name="edad"
                    value={calculateAge(formData.fecha_nacimiento)}
                    disabled
                    className="w-full px-3 py-2 text-gray-400 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex w-full gap-6 pt-10 place-content-between">
                <div className="w-1/4">
                  <label className="block text-gray-700">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    type="date"
                    name="fecha_nacimiento"
                    value={formData.fecha_nacimiento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  />
                </div>
                <div className="w-1/5 mb-4">
                  <label className="block text-gray-700">DNI:</label>
                  <input
                    type="number"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="w-full text-gray-700 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300"
                  />
                </div>
                <div className="w-1/6 mb-4">
                  <label className="block text-gray-700">Rol:</label>
                  <input
                    type="text"
                    name="rol"
                    value={formData.rol}
                    onChange={handleInputChange}
                    disabled
                    className="w-full text-gray-400 px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300"
                  />
                </div>
                <div className="w-1/4">
                  <label className="block text-gray-700">Obra Social</label>
                  <select
                    name="obra_social"
                    value={formData.obra_social}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  >
                    <option className="block text-gray-700" value="NO TIENE">
                      NO TIENE
                    </option>
                    <option className="text-gray-700 " value="SANCOR">
                      SANCOR
                    </option>
                    <option className="text-gray-700 " value="SANCOR SALUD">
                      SANCOR SALUD
                    </option>
                    <option className="text-gray-700 " value="PROVINCIA">
                      PROVINCIA
                    </option>
                    <option className="text-gray-700 " value="SWISS">
                      SWISS
                    </option>
                    <option className="text-gray-700 " value="OSECAC">
                      OSECAC
                    </option>
                    <option className="text-gray-700" value="JERARQUICOS">
                      JERARQUICOS
                    </option>
                  </select>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Cuenta creada: {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-0 text-sm text-gray-500">
                Ultima actualizacion:{' '}
                {new Date(user.updatedAt).toLocaleDateString()}
              </p>

              <p className="mt-0 text-sm text-gray-500">
                Citas solicitadas: {countAppointments}
              </p>

              {/* Botones section */}
              <div className="flex flex-col justify-between h-1/4">
                <div className="flex-grow" />
                <div className="flex justify-between pb-8 pr-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Guardar cambios'}
                  </button>
                  {loading && (
                    <div className="mt-4">
                      <LoadingSpinner />
                    </div>
                  )}
                  <button
                    type="button"
                    className="px-4 py-2 text-white transition-all duration-300 bg-orange-600 rounded hover:tracking-wider hover:bg-orange-700"
                    onClick={() => console.log('Crear perfil')}
                  >
                    Crear perfil
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p>No se seleccionó ningun paciente.</p>
          )}
        </div>
      </aside>
    </>
  );
};
