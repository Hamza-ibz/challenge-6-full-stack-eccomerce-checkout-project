import React from 'react';

const InfoModal = ({ closeModal, message }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Info</h3>
                    <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ×
                    </button>
                </div>
                <p className="text-lg text-gray-800">{message}</p>
                <button
                    onClick={closeModal}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InfoModal;
