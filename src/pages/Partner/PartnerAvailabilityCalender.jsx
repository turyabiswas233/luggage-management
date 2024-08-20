import React, { useEffect, useState } from 'react';
import NavbarComp from '../Home/NavbarComp';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HostAvailabilityCalendar = () => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [dates, setDates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');

    useEffect(() => {
        populateDates(month, year);
    }, [month, year]);

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const populateDates = (month, year) => {
        const daysCount = daysInMonth(month, year);
        const dateArray = [];
        for (let i = 1; i <= daysCount; i++) {
            const date = new Date(year, month, i);
            dateArray.push({
                day: i,
                isSunday: date.getDay() === 0,
                isClosed: false
            });
        }
        setDates(dateArray);
    };

    const toggleClosed = (index) => {
        setSelectedDate(dates[index]);
        setShowModal(true);
    };

    const handleSave = () => {
        setDates(dates.map((date) =>
            date.day === selectedDate.day ? { ...date, isClosed: !date.isClosed, openingTime, closingTime } : date
        ));
        setShowModal(false);
    };

    return (
        <div>
            <NavbarComp className="" />
            <div className="container mx-auto mt-24 p-6 flex flex-col items-center">
                <div className="text-center text-2xl text-white bg-blue-800 rounded-lg shadow-lg p-8 mb-8 animate-fade-in">
                    Partner: Username Availability Date
                </div>
                <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-xl animate-slide-up">
                    <div className="flex justify-between items-center mb-6 bg-blue-100 p-4 rounded-xl">
                        <select
                            name="calendar__month"
                            id="calendar__month"
                            value={month}
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                            className="appearance-none rounded-full ps-6 pe-8  bg-white shadow-md focus:outline-none"
                        >
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                                <option key={i} value={i}>{m}</option>
                            ))}
                        </select>
                        <select
                            name="calendar__year"
                            id="calendar__year"
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            className="appearance-none rounded-full  ps-6 pe-8 bg-white shadow-md focus:outline-none"
                        >
                            {[2022, 2023, 2024, 2025].map((y) => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div className="grid grid-cols-7 text-center font-semibold mb-4">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i}>{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {dates.map((date, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer relative h-12 flex items-center justify-center transition-colors duration-300 rounded-lg
                                        ${date.isSunday ? 'bg-yellow-400 text-blue-800' : 'bg-blue-50'}
                                        ${date.isClosed ? 'bg-red-700 text-white' : ''}`}
                                    onClick={() => !date.isSunday && toggleClosed(index)}
                                >
                                    {date.day}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button className="bg-gray-400 text-white rounded-full px-6 py-2 transition-colors duration-300 hover:bg-gray-500">
                            Back
                        </button>
                        <button className="bg-blue-600 text-white rounded-full px-6 py-2 transition-colors duration-300 hover:bg-blue-700">
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Opening and Closing Time for {selectedDate && selectedDate.day}/{month + 1}/{year}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formOpeningTime">
                            <Form.Label>Opening Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={openingTime}
                                onChange={(e) => setOpeningTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formClosingTime">
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={closingTime}
                                onChange={(e) => setClosingTime(e.target.value)}
                                required
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
        </div>
    );
};

export default HostAvailabilityCalendar;
