// imports
import React, { useState, useEffect } from 'react';
// import service
import { getUserByEmail } from '../../services/users';
import { updateAppointment } from '../../services/appointmentService';
// import Styles
import { estadoConsultaStyles } from './ListAppointments';
//import Spinner
import { LoadingSpinner } from '../LoadingSpinner';
import { useNavigate } from 'react-router-dom';

export const RightAside = ({ isOpen, onClose, appointment }) => {
  //states
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [dataUser, setDataUser] = useState('');
  const [inEmail, setInEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    edad: '',
    motivo_consulta: '',
    derivacion: '',
    numero: '',
    email: '',
    fecha_consulta: '',
    detalle_consulta: '',
    estado_consulta: '',
  });
  //set data
  useEffect(() => {
    if (appointment) {
      const formattedDate = appointment.fecha_consulta
        ? new Date(new Date(appointment.fecha_consulta).getTime())
            .toISOString()
            .slice(0, 16)
        : '';
      setFormData({
        nombre: appointment.nombre || '',
        apellido: appointment.apellido || '',
        dni: appointment.dni || '',
        edad: appointment.edad || '',
        motivo_consulta: appointment.motivo_consulta || '',
        derivacion: appointment.derivacion || '',
        numero: appointment.numero || '',
        email: appointment.email || '',
        fecha_consulta: formattedDate || '',
        detalle_consulta: appointment.detalle_consulta || '',
        estado_consulta: appointment.estado_consulta || '',
      });
      setInEmail(appointment.email || '');
    }
  }, [appointment]);
  console.log('formdata', formData);
  // fetch user by email if it matches
  useEffect(() => {
    if (inEmail) {
      const getUserByEmailFunction = async () => {
        try {
          const response = await getUserByEmail(inEmail);
          // update status
          setIsUser(true);
          // set user
          setDataUser(response);
        } catch (error) {
          console.error('Error al conectarse con la API:', error);
          // update status
          setIsUser(false);
        }
      };
      getUserByEmailFunction();
    }
  }, [inEmail]);

  //handle form input changes
  const handleChange = (e) => {
    // destructure the name and value from the event target
    const { name, value } = e.target;
    // update the formData state with the new value for the corresponding input field
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // call service and send data + id
      setTimeout(async () => {
        const updatedAppointment = await updateAppointment(
          appointment._id,
          formData
        );
        setLoading(false);
        onClose();
        window.location.reload();
        console.log('Cita actualizada:', updatedAppointment);
      }, 4000);
    } catch (error) {
      console.error('error', error);
    }
  };

  //Calculate Age function
  const calculateAge = (birthDate) => {
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
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

  const handleClick = () => {
    const Section = 3;
    navigate('/ControlPanel', { state: { formData, Section } });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50"
          onClick={onClose}
        ></div>
      )}

      {/* Aside */}
      <aside
        className={`fixed top-0 right-0 h-full w-[100%] overflow-auto md:w-5/12 z-50 bg-gradient-to-r from-[#e7e7e7fb] to-[#fdfdfdfd] shadow-lg transform transition-transform duration-700 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={() => {
              onClose();
            }}
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
          <div className="md:flex place-content-between">
            <h2 className="mx-6 mb-4 text-2xl font-bold">
              Detalles de la Cita
            </h2>
            {isUser ? (
              <h2 className="my-2 ml-6 md:ml-0 md:mr-12">
                {' '}
                ✔️ este user tiene cuenta
              </h2>
            ) : (
              <h2 className="my-2 ml-6 md:ml-0 md:mr-12">
                {' '}
                ❌ este user NO tiene cuenta
              </h2>
            )}
          </div>

          {appointment ? (
            <form
              onSubmit={handleSubmit}
              className="gap-6 m-2 space-y-4 md:m-6 "
            >
              <div className="w-full md:space-x-8 md:flex">
                <div className="flex items-center justify-center w-24 h-20 overflow-hidden bg-gray-200 border rounded-full shadow-sm ">
                  {dataUser?.imagenUrl ? (
                    <img
                      src={dataUser.imagenUrl}
                      alt="Imagen de usuario"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">Sin imagen</span>
                  )}
                </div>

                <div className=" md:w-1/3">
                  <label className="block text-gray-700">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={isUser ? dataUser?.nombre || '' : formData.nombre}
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser
                        ? 'text-gray-400 bg-slate-100'
                        : 'text-black  hover:shadow-md hover:shadow-[#846bcacc]'
                    } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  />
                </div>
                <div className="md:w-1/3">
                  <label className="block text-gray-700">Apellido:</label>
                  <input
                    type="text"
                    name="apellido"
                    value={
                      isUser ? dataUser?.apellido || '' : formData.apellido
                    }
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser
                        ? 'text-gray-400 bg-slate-100'
                        : 'text-black  hover:shadow-md hover:shadow-[#846bcacc]'
                    } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  />
                </div>
                <div className="md:w-16">
                  <label className="block text-gray-700">Edad:</label>
                  <input
                    type="number"
                    name="edad"
                    value={
                      isUser && dataUser?.fecha_nacimiento
                        ? calculateAge(dataUser.fecha_nacimiento.split('T')[0])
                        : formData.edad
                    }
                    onChange={handleChange}
                    className={`${
                      isUser
                        ? 'text-gray-400 bg-slate-100'
                        : 'text-black  hover:shadow-md hover:shadow-[#846bcacc]'
                    } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                    disabled={
                      isUser && dataUser?.fecha_nacimiento ? true : false
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700">
                  Motivo de Consulta:
                </label>
                <textarea
                  name="motivo_consulta"
                  value={formData.motivo_consulta}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg shadow-sm  min-h-16 md:min-h-11 max-h-24 shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-shadow duration-300"
                />
              </div>
              {isUser && (
                <>
                  <div className="w-full md:space-x-8 md:flex">
                    <div>
                      <label className="block text-gray-700">
                        Fecha de Nacimiento:
                      </label>
                      <input
                        type="text"
                        value={dataUser?.fecha_nacimiento.split('T')[0] || ''}
                        className={`${
                          isUser
                            ? 'text-gray-400 bg-slate-100'
                            : 'text-black hover:shadow-md hover:shadow-[#846bcacc] '
                        } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                        disabled={
                          isUser && dataUser?.fecha_nacimiento ? true : false
                        }
                      />
                    </div>
                    <div className="">
                      <label className="block text-gray-700">D.N.I. :</label>
                      <input
                        type="number"
                        name="dni"
                        value={isUser ? dataUser?.dni || '' : formData.dni}
                        disabled={isUser}
                        onChange={handleChange}
                        className={`${
                          isUser
                            ? 'text-gray-400 bg-slate-100'
                            : 'text-black hover:shadow-md hover:shadow-[#846bcacc] '
                        } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                      />
                    </div>
                    <div className="">
                      <label className="block text-gray-700">
                        Obra Social:
                      </label>
                      <input
                        type="text"
                        value={dataUser?.obra_social || ''}
                        className={`${
                          isUser
                            ? 'text-gray-400 bg-slate-100'
                            : 'text-black hover:shadow-md hover:shadow-[#846bcacc] '
                        } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                        disabled
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="w-full gap-6 md:flex">
                <div className="md:w-1/2">
                  <label className="block text-gray-700">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={isUser ? dataUser?.email || '' : formData.email}
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser
                        ? 'text-gray-400 bg-slate-100'
                        : 'text-black hover:shadow-md hover:shadow-[#846bcacc] '
                    } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  />
                </div>
                {isUser === false && (
                  <div className="">
                    <label className="block text-gray-700">D.N.I. :</label>
                    <input
                      type="number"
                      name="dni"
                      value={isUser ? dataUser?.dni || '' : formData.dni}
                      disabled={isUser}
                      onChange={handleChange}
                      className={`${
                        isUser
                          ? 'text-gray-400 bg-slate-100'
                          : 'text-black hover:shadow-md hover:shadow-[#846bcacc] '
                      } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                    />
                  </div>
                )}

                <div className="md:w-1/2">
                  <label className="block text-gray-700">Numero:</label>
                  <input
                    type="string"
                    name="numero"
                    value={isUser ? dataUser?.numero || '' : formData.numero}
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser
                        ? 'text-gray-400 bg-slate-100'
                        : 'text-black hover:shadow-md hover:shadow-[#846bcacc] '
                    } w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] transition-all duration-300`}
                  />
                </div>
              </div>
              <div className="md:flex place-content-between">
                <div>
                  <label className="block text-gray-700">
                    Fecha de Consulta:
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha_consulta"
                    value={formData.fecha_consulta}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Derivacion:</label>
                  <input
                    type="string"
                    name="derivacion"
                    value={formData.derivacion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Estado:</label>
                  <select
                    name="estado_consulta"
                    value={formData.estado_consulta}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc] transition-all duration-300"
                  >
                    {Object.entries(estadoConsultaStyles).map(
                      ([key, { text }]) => (
                        <option key={key} value={key}>
                          {text}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">
                  Detalle de Consulta:
                </label>
                <textarea
                  name="detalle_consulta"
                  value={formData.detalle_consulta}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border max-h-28 min-h-20 rounded-lg shadow-sm shadow-[#846bcaf3] hover:shadow-md hover:shadow-[#846bcacc]  transition-shadow duration-300"
                />
              </div>
              <div className="flex pr-2 place-content-between">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] hover:tracking-widest transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Guardar Cambios'}
                </button>
                {loading && (
                  <div className="mt-4">
                    <LoadingSpinner />
                  </div>
                )}
                {isUser && (
                  <button
                    onClick={handleClick}
                    className="px-4 py-2 text-white transition-all duration-300 bg-orange-600 rounded hover:tracking-wider hover:bg-orange-700"
                  >
                    Editar perfil
                  </button>
                )}

                {isUser == false && (
                  <button
                    onClick={handleClick}
                    className="px-4 py-2 text-white transition-all duration-300 bg-orange-600 rounded hover:tracking-wider hover:bg-orange-700"
                  >
                    Crear perfil
                  </button>
                )}
              </div>
            </form>
          ) : (
            <p>No se seleccionó ninguna cita.</p>
          )}
        </div>
      </aside>
    </>
  );
};
