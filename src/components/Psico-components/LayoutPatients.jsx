//imports
import React, { useEffect, useState } from 'react';
//import components
import { EditPatients } from './EditPatients';
//import services
import { findPatients, deleteProfile } from '../../services/users';
export const LayoutPatients = () => {
  //states
  const [patients, setpatients] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

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
  const deleted = async (id) => {
    try {
      await deleteProfile(id);
      console.log('user eliminado');
      //refresh the patients list after deletion
      //setPatients(patients.filter(patient => patient._id !== id));
    } catch (error) {
      console.log('erro al tratar de elimnar el user');
    }
    console.log(id);
  };
  // function to open the edit modal
  const OpenEdit = (id) => {
    setOpenEdit(!openEdit);
    setSelected(id);
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
                  <button onClick={() => OpenEdit(patients)}>Editar</button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div>
        {openEdit && (
          <EditPatients
            close={OpenEdit}
            deleted={deleted}
            selected={selected}
          />
        )}
      </div>
      <section>
        <form>Agregar paciente</form>
      </section>
    </>
  );
};
