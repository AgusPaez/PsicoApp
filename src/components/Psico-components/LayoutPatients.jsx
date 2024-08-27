//imports
import React, { useEffect, useState } from 'react';
//import services
import { findPatients, deleteProfile } from '../../services/users';
export const LayoutPatients = () => {
  //states
  const [patients, setpatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        //call service
        const response = await findPatients();
        setpatients(response);
      } catch (error) {}
    };
    fetchPatients();
  }, []);
  //delete patient function
  const deleted = (id) => {
    try {
      const responsed = deleteProfile(id);
      console.log('user eliminado');
    } catch (error) {
      console.log('erro al tratar de elimnar el user');
    }
    console.log(id);
  };
  return (
    <>
      <section>
        <div>Pacientes Registrados</div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Creada</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patients, index) => (
              <tr key={index}>
                <td>{patients.nombre}</td>
                <td>{patients.apellido}</td>
                <td>{patients.email}</td>
                <td>{patients.createdAt.substring(0, 10)}</td>
                <td>
                  <button>Editar</button>
                </td>
                <td>
                  <button onClick={() => deleted(patients._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <form>Agregar paciente</form>
      </section>
    </>
  );
};
