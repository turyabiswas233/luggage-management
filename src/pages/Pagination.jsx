// Pagination.js

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className="flex justify-center mt-8">
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`mx-1 px-3 py-2 rounded-lg cursor-pointer ${
            currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
