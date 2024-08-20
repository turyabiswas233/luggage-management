import React from 'react';

const ErrorModal = ({ message, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-gray-200 text-gray-900 px-4 py-2">
                <h3 className="text-lg">Message</h3>
            </div>
            <div className="p-6">
                <p className="text-gray-700">{message}</p>
            </div>
            <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                    onClick={onClose}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    OK
                </button>
            </div>
        </div>
    </div>
);

export default ErrorModal;
