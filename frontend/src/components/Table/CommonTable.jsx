import React, { useState } from "react";
import ItemDetailsModal from "./ItemDetailsModal";

const CommonTable = ({ columns, data, currentPage, setCurrentPage, itemsPerPage }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [selectedItem, setSelectedItem] = useState(null);

  const paginateData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="relative overflow-x-auto shadow-lg rounded-lg p-4 bg-white dark:bg-gray-900">
      <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
        <thead className="bg-blue-500 text-white uppercase">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 text-center">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginateData().map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
              onClick={() => setSelectedItem(row)}
            >
              <td className="px-6 py-4 text-center">{row.id}</td>
              <td className="px-6 py-4 text-center">{row.title}</td>
              <td className="px-6 py-4 text-center">{row.body.substring(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <nav aria-label="Page navigation">
          <ul className="flex items-center space-x-2">
            <li>
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                {"<<"}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                {"<"}
              </button>
            </li>
            <li>
              <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            </li>
            <li>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                {">"}
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                {">>"}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Item Details Modal */}
      {selectedItem && <ItemDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default CommonTable;
