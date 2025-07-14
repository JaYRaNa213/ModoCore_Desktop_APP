// src/components/ui/Modal.jsx
import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        {children}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 absolute top-2 right-3"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
