import React from "react";

const ItemDetailsModal = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-transparent  flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{item.title}</h2>
        <p className="text-gray-600">{item.body}</p>
        <button 
          onClick={onClose} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemDetailsModal;
