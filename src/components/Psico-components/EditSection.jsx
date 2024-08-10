import React from 'react';
const EditSection = ({ select, onClose }) => {
  return (
    <div className="h-48 w-44 text-green-600">
      <form>
        <input type="text" placeholder={select.titulo} />
        <input type="text" placeholder={select.institucion} />
        <input type="number" placeholder={select.anio} />
        <button> guardar</button>
        <button> eliminar</button>
      </form>
      <button onClick={onClose}>cerrar</button>
    </div>
  );
};

export default EditSection;
