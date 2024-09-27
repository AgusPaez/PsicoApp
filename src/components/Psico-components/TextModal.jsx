import React from 'react';

export const TextModal = ({ isOpen, modalContent, onClose, onSave }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-lg font-bold">
            EDITAR: {modalContent.field}
          </h2>
          <textarea
            value={modalContent.value}
            onChange={(e) => onSave({ ...modalContent, value: e.target.value })}
            className="w-full h-48 p-2 border border-gray-300 rounded min-h-[20vh] max-h-[50vh]"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white bg-[#5b45ff] rounded hover:bg-[#4837ca] transition-all duration-300 hover:tracking-widest"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
