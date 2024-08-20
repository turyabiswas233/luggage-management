import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../../config';
import moment from 'moment';
import PartnerNavbarComp from './PartnerNavbarComp';

const EditSpecialClosedDays = () => {
    const { locationId } = useParams();
    const [specialClosedDays, setSpecialClosedDays] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDates, setSelectedDates] = useState([null, null]); 
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [loading, setLoading] = useState(false); // Loading state added
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSave = () => {
        const [startDate, endDate] = selectedDates;
        const datesInRange = [];
        
        let currentDate = startDate;
        while (currentDate <= endDate) {
            datesInRange.push(moment(currentDate).format('YYYY-MM-DD'));
            currentDate = moment(currentDate).add(1, 'days').toDate();
        }

        const newDates = datesInRange.map(date => ({
            date,
            openTime: openingTime,
            closeTime: closingTime
        }));

        setSpecialClosedDays(prevDays => [...prevDays, ...newDates]);
        setShowModal(false);
        setSelectedDates([null, null]);
        setOpeningTime('');
        setClosingTime('');
    };

    const handleSubmit = async () => {
        setLoading(true); // Start loading
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${config.API_BASE_URL}/api/v1/locations/${locationId}/special-closed-days`, {
                specialClosedDays
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setShowSuccessModal(true); // Show success modal
    
        } catch (error) {
            console.error('Error updating special closed days:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleDateChange = (dates) => {
        setSelectedDates(dates || [null, null]); 
    };

    return (
        <div>
            <PartnerNavbarComp />
            <div className="container mx-auto mt-24 p-6 flex flex-col items-center">
                <div className="text-center text-2xl font-semibold text-white bg-blue-800 rounded-lg shadow-lg p-8 mb-8 w-full max-w-3xl">
                    Edit Special Closed Days
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
                    <div className="flex justify-center mb-6">
                        <DatePicker
                            selected={selectedDates[0]}
                            onChange={handleDateChange}
                            startDate={selectedDates[0]}
                            endDate={selectedDates[1]}
                            selectsRange
                            inline
                            required
                            className="w-full rounded-lg border-gray-300"
                        />
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 transition duration-300 hover:bg-blue-700">
                            Set Times for Selected Dates
                        </button>
                    </div>
                    {specialClosedDays.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                            {specialClosedDays.map((day, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-50 text-center p-4 rounded-lg shadow-sm border border-gray-200 hover:bg-blue-100 transition duration-300"
                                >
                                    <div className="text-lg font-semibold text-gray-800">{moment(day.date).format('MM/DD/YYYY')}</div>
                                    <div className="text-sm text-gray-600">Open: {day.openTime}</div>
                                    <div className="text-sm text-gray-600">Close: {day.closeTime}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end items-center mt-8">
                        <button 
                            onClick={handleSubmit} 
                            className="bg-green-600 text-white font-semibold rounded-lg px-6 py-2 transition duration-300 hover:bg-green-700"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> 
                                    Updating...
                                </>
                            ) : (
                                "Update Calendar"
                            )}
                        </button>
                    </div>
                </div>
            </div>
    
            {/* Modal to set opening and closing times */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Set Opening and Closing Times</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formOpeningTime" className="mb-4">
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={openingTime}
                                onChange={(e) => setOpeningTime(e.target.value)}
                                required
                                className="rounded-lg border-gray-300"
                            />
                        </Form.Group>
                        <Form.Group controlId="formClosingTime">
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={closingTime}
                                onChange={(e) => setClosingTime(e.target.value)}
                                required
                                className="rounded-lg border-gray-300"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    
            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <p>Updated successfully!</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-center">
                    <Button 
                        className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-2 transition duration-300 hover:bg-blue-700"
                        onClick={() => {
                            setShowSuccessModal(false);
                            navigate('/partner/locations'); // Redirect to another route
                        }}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    
};

export default EditSpecialClosedDays;
