import React from 'react';

export const EditPatients = ({ close, deleted, selected }) => {
  console.log('selected', selected);
  return (
    <div>
      EditPatients
      <button onClick={close}>cerrar</button>
      <button onClick={() => deleted(selected._id)}>Eliminar</button>
    </div>
  );
};
