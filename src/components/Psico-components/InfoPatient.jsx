//imports
import React, { useEffect } from 'react';

export const InfoPatient = ({ patient, closeModal }) => {
  useEffect(() => {
    // exit when press ESC function
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 animate-opacity"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-lg p-8 transition-opacity duration-300 bg-white rounded-lg shadow-lg opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
          onClick={closeModal}
        >
          &#x2715; {/* 'X' para cerrar el modal */}
        </button>

        <h2 className="mb-4 text-2xl font-bold">
          {patient.nombre} {patient.apellido}
        </h2>
        <p>
          <strong>Email:</strong> {patient.email}
        </p>
        <p>
          <strong>Rol:</strong> {patient.rol}
        </p>
        <p>
          <strong>Número:</strong> {patient.numero || 'No especificado'}
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong>{' '}
          {new Date(patient.fecha_nacimiento).toLocaleDateString()}
        </p>
        <p>
          <strong>Obra social:</strong> {patient.obra_social}
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Cuenta creada: {new Date(patient.createdAt).toLocaleDateString()}
        </p>
        <p className="mt-0 text-sm text-gray-500">
          Ultima actualizacion:{' '}
          {new Date(patient.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
