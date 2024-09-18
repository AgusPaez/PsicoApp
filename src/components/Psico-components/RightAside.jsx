// imports
import React, { useState, useEffect } from 'react';
// import service
import { getUserByEmail } from '../../services/users';
import { updateAppointment } from '../../services/appointmentService';
// import Styles
import { estadoConsultaStyles } from './ListAppointments';

export const RightAside = ({ isOpen, onClose, appointment }) => {
  //states
  const [isUser, setIsUser] = useState(false);
  const [dataUser, setDataUser] = useState('');
  const [inEmail, setInEmail] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
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
      setFormData({
        nombre: appointment.nombre || '',
        apellido: appointment.apellido || '',
        edad: appointment.edad || '',
        motivo_consulta: appointment.motivo_consulta || '',
        derivacion: appointment.derivacion || '',
        numero: appointment.numero || '',
        email: appointment.email || '',
        fecha_consulta: appointment.fecha_consulta || '',
        detalle_consulta: appointment.detalle_consulta || '',
        estado_consulta: appointment.estado_consulta || '',
      });
      setInEmail(appointment.email || '');
    }
  }, [appointment]);
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
    try {
      // call service and send data + id
      const updatedAppointment = await updateAppointment(
        appointment._id,
        formData
      );
      console.log('Cita actualizada:', updatedAppointment);
    } catch (error) {
      console.error('error', error);
    }
  };

  //Calculate Age function
  const calculateAge = (birthDate) => {
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
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
        className={`fixed top-0 right-0 h-full w-5/12 z-50 bg-gradient-to-r from-[#e7e7e7fb] to-[#fdfdfdfd] shadow-lg transform transition-transform duration-700 ${
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
          <div className="flex place-content-between">
            <h2 className="mx-6 mb-4 text-2xl font-bold">
              Detalles de la Cita
            </h2>
            {isUser ? (
              <h2 className="my-2 mr-12"> ✔️ este user tiene cuenta</h2>
            ) : (
              <h2 className="my-2 mr-12"> ❌ este user NO tiene cuenta</h2>
            )}
          </div>

          {appointment ? (
            <form onSubmit={handleSubmit} className="gap-6 m-6 space-y-4 ">
              <div className="flex space-x-10">
                {isUser && (
                  <div>
                    <img
                      src={dataUser?.imagenUrl || ''}
                      alt="Imagen de usuario"
                      className="h-20 border rounded-full shadow-sm w-36 "
                    />
                  </div>
                )}
                <div>
                  <label className="text-lg font-semibold">Nombre:</label>
                  <input
                    type="text"
                    name="nombre"
                    value={isUser ? dataUser?.nombre || '' : formData.nombre}
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser ? 'text-gray-400 bg-slate-100' : 'text-black'
                    } w-full p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]`}
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold">Apellido:</label>
                  <input
                    type="text"
                    name="apellido"
                    value={
                      isUser ? dataUser?.apellido || '' : formData.apellido
                    }
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser ? 'text-gray-400 bg-slate-100' : 'text-black'
                    } w-full p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]`}
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold">Edad:</label>
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
                      isUser ? 'text-gray-400 bg-slate-100' : 'text-black'
                    } w-12 p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]`}
                    disabled={
                      isUser && dataUser?.fecha_nacimiento ? true : false
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-lg font-semibold ">
                  Motivo de Consulta:
                </label>
                <textarea
                  name="motivo_consulta"
                  value={formData.motivo_consulta}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-xl min-h-11 max-h-24 shadow-sm shadow-[#00000069]"
                />
              </div>
              {isUser && (
                <>
                  <div className="flex">
                    <div>
                      <label className="text-lg font-semibold">
                        Fecha de Nacimiento:
                      </label>
                      <input
                        type="text"
                        value={dataUser?.fecha_nacimiento.split('T')[0] || ''}
                        className={`${
                          isUser ? 'text-gray-400 bg-slate-100' : 'text-black'
                        } w-32 p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]`}
                        disabled={
                          isUser && dataUser?.fecha_nacimiento ? true : false
                        }
                      />
                    </div>
                    <div className="ml-8">
                      <label className="text-lg font-semibold">
                        Obra Social:
                      </label>
                      <input
                        type="text"
                        value={dataUser?.obra_social || ''}
                        className={`${
                          isUser ? 'text-gray-400 bg-slate-100' : 'text-black'
                        } w-2/3 p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]`}
                        disabled
                      />
                    </div>
                  </div>
                </>
              )}
              <div className="flex gap-6 place-content-evenly">
                <div>
                  <label className="text-lg font-semibold">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={isUser ? dataUser?.email || '' : formData.email}
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser ? 'text-gray-400 bg-slate-100' : 'text-black'
                    } w-full p-2 border border-gray-300  rounded-xl shadow-sm shadow-[#00000069]`}
                  />
                </div>
                <div className="">
                  <label className="text-lg font-semibold text-center">
                    Numero:
                  </label>
                  <input
                    type="string"
                    name="numero"
                    value={isUser ? dataUser?.numero || '' : formData.numero}
                    disabled={isUser}
                    onChange={handleChange}
                    className={`${
                      isUser ? 'text-gray-400 bg-slate-100' : 'text-black'
                    } w-2/3 p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]`}
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold">Derivacion:</label>
                  <input
                    type="string"
                    name="derivacion"
                    value={formData.derivacion}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]"
                  />
                </div>
              </div>
              <div className="flex place-content-between">
                <div>
                  <label className="text-lg font-semibold">
                    Fecha de Consulta:
                  </label>
                  <input
                    type="date"
                    name="fecha_consulta"
                    value={formData.fecha_consulta.split('T')[0]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]"
                  />
                </div>
                <div>
                  <label className="text-lg font-semibold">Estado:</label>
                  <select
                    name="estado_consulta"
                    value={formData.estado_consulta}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-xl shadow-sm shadow-[#00000069]"
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
                <label className="text-lg font-semibold">
                  Detalle de Consulta:
                </label>
                <textarea
                  name="detalle_consulta"
                  value={formData.detalle_consulta}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 max-h-28 min-h-20 rounded-xl  shadow-sm shadow-[#00000069]"
                />
              </div>
              <div className="flex pr-2 place-content-between">
                <button
                  type="submit"
                  className="px-4 py-2 text-white transition-all duration-300 bg-blue-500 rounded hover:tracking-wider hover:bg-blue-600"
                >
                  Guardar Cambios
                </button>
                {isUser && (
                  <button className="px-4 py-2 text-white transition-all duration-300 bg-orange-600 rounded hover:tracking-wider hover:bg-orange-700">
                    Editar perfil
                  </button>
                )}
                {isUser == false && (
                  <button className="px-4 py-2 text-white transition-all duration-300 bg-orange-600 rounded hover:tracking-wider hover:bg-orange-700">
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
