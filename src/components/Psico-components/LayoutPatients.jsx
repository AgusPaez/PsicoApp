//imports
import React, { useEffect, useState } from 'react';
//import components
import { EditPatients } from './EditPatients';
import { AddPatient } from './AddPatient';
//import services
import { findPatients, deleteProfile } from '../../services/users';

export const LayoutPatients = () => {
  //states
  const [patients, setpatients] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
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
  // function to open edit modal
  const OpenEdit = (id) => {
    setOpenEdit(!openEdit);
    setSelected(id);
  };

  // function to open add modal
  const OpenAdd = () => {
    setOpenAdd(!openAdd);
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
              <th>Numero</th>
              <th>Fecha Nacimiento</th>
              <th>O.S</th>
              <th>Creada</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patients, index) => (
              <tr key={index}>
                <td>{patients.nombre}</td>
                <td>{patients.apellido}</td>
                <td>{patients.email}</td>
                <td>{patients.numero}</td>
                <td>{patients.fecha_nacimiento.substring(0, 10)}</td>
                <td>{patients.obra_social}</td>
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
        <button onClick={OpenAdd}>Agregar paciente</button>
        <div>{openAdd && <AddPatient close={OpenAdd} />}</div>
      </section>
    </>
  );
};
