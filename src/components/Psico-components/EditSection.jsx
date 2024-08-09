import React from 'react';
const EditSection = ({ select, onClose }) => {
  return (
    <div className="h-48 w-44 text-green-600">
      <form>
        <input type="text" />
        <button> guardar</button>
      </form>
      EditSection
      {select._id}
      <button onClick={onClose}>cerrar</button>
    </div>
  );
};

export default EditSection;
