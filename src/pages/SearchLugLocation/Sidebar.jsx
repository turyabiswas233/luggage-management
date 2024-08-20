import React, { useState, useEffect } from 'react';
import StorageSpot from './StorageSpot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';

const Sidebar = ({ storageSpots, visibleLocations }) => {
    const [dropOffTime, setDropOffTime] = useState('');
    const [pickUpTime, setPickUpTime] = useState('');
    const [filteredSpots, setFilteredSpots] = useState([]);

    useEffect(() => {
        const now = moment.tz("Australia/Sydney");
        const defaultDropOff = now.clone().add(3, 'hours').format('YYYY-MM-DDTHH:mm');
        const defaultPickUp = now.clone().add(7, 'hours').format('YYYY-MM-DDTHH:mm');

        setDropOffTime(defaultDropOff);
        setPickUpTime(defaultPickUp);

        // Automatically trigger the search with default times and visible locations
        handleSearch(defaultDropOff, defaultPickUp, visibleLocations);
    }, [visibleLocations]);

    const handleSearch = (dropOff = dropOffTime, pickUp = pickUpTime, locations = visibleLocations) => {
        const dropOffMoment = moment.tz(dropOff, "Australia/Sydney");
        const pickUpMoment = moment.tz(pickUp, "Australia/Sydney");

        const filtered = locations.filter(spot => {
            const availableFrom = moment.tz(spot.availableFrom, "Australia/Sydney");
            const availableTo = moment.tz(spot.availableTo, "Australia/Sydney");
            return availableFrom.isSameOrBefore(dropOffMoment) && availableTo.isSameOrAfter(pickUpMoment);
        });

        setFilteredSpots(filtered);
    };

    return (
        <div className="w-full lg:w-1/3 bg-white p-8 lg:p-6 shadow-lg rounded">
            <div className="filters">
                <div className="flex flex-col lg:flex-row justify-between">
                    <label className="w-full lg:w-1/2 lg:pr-2 mb-2 lg:mb-0">
                        Drop off:
                        <input
                            type="datetime-local"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            value={dropOffTime}
                            onChange={(e) => setDropOffTime(e.target.value)}
                        />
                    </label>
                    <label className="w-full lg:w-1/2 lg:pl-2">
                        Pick up:
                        <input
                            type="datetime-local"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                            value={pickUpTime}
                            onChange={(e) => setPickUpTime(e.target.value)}
                        />
                    </label>
                </div>
                <button
                    className="w-full py-2 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition duration-300"
                    onClick={() => handleSearch()}
                >
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Search
                </button>
            </div>
            <div className="storage-spots overflow-y-auto h-[28rem] mt-4 pt-2 lg:mt-16">
                {filteredSpots.length > 0 ? (
                    filteredSpots.map((spot, index) => (
                        <StorageSpot
                            key={index}
                            id={spot._id}
                            title={spot.name}
                            details={spot.description}
                            price={`A$${spot.regularPrice.toFixed(2)} / 24h `}
                            regularprice={spot.regularPrice}
                            link={spot.url} 
                            lat={spot.coordinates.coordinates[1]}
                            lng={spot.coordinates.coordinates[0]}
                            image={spot.pictures[0] || 'https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg'}
                            availableFrom={spot.availableFrom}
                            availableTo={spot.availableTo}
                            discountPercentage={spot.discountPercentage}
                            openTime={spot.openTime}
                            closeTime={spot.closeTime}
                            notes={spot.notes}
                        />
                    ))
                ) : (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faBoxOpen} className="text-gray-400 text-6xl mb-4" />
                        <p className="text-gray-500 mb-4">No stores available at the moment</p>
                        <p className="text-gray-700 mb-6">Urlocker is available in 2+ cities with more added every week. We hope we can serve you wherever you go next!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
