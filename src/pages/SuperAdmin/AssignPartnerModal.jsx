import React, { useState } from 'react';

const AssignPartnerModal = ({ location, partners, onClose, onAssign }) => {
    const [selectedPartner, setSelectedPartner] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleAssign = () => {
        if (selectedPartner) {
            onAssign(location._id, selectedPartner);
            onClose();
        } else {
            alert('Please select a partner.');
        }
    };

    const filteredPartners = partners.filter(partner =>
        partner.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-2xl font-semibold mb-4">Assign Partner to {location.name}</h2>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search partner username..."
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <select
                    value={selectedPartner}
                    onChange={(e) => setSelectedPartner(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4"
                >
                    <option value="">Select a Partner</option>
                    {filteredPartners.map(partner => (
                        <option key={partner._id} value={partner._id}>
                            {partner.user.username} - {partner.tradeLicenseNumber}
                        </option>
                    ))}
                </select>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAssign}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Assign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignPartnerModal;
