import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function UserServiceAgency() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Main content */}
        <div className="flex items-center justify-center h-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Banner */}
            <div className="banner-area two">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="banner-text">
                      <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold">The Best <span className="text-blue-500">Luggage</span> Service Agency Near You</h1>
                      <p className="text-lg text-center mt-4 md:text-xl lg:text-2xl">Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever.</p>
                      <div className="banner-form mt-6 md:mt-8 lg:mt-10">
                        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">Looking For Luggage Services! We Are Here...</h2>
                        <form className="mt-5 border-2 border-purple-500 rounded-lg bg-gray-100 p-4">
                          {/* Main input fields */}
                          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center mb-4">
                            <div className="w-full md:w-3/5 lg:w-3/5 mb-4 md:mb-0 lg:mb-0 md:pr-2 lg:pr-2">
                              <div className="form-group">
                                <label className="flex items-center">
                                  <input type="text" className="form-control py-2 px-4 rounded-lg border-gray-300 w-full" placeholder="Your Name" />
                                </label>
                              </div>
                            </div>
                            <div className="w-full md:w-2/5 lg:w-2/5 md:pl-2 lg:pl-2">
                              <div className="form-group">
                                <select className="form-select py-2 px-4 rounded-lg border-gray-300 w-full">
                                  <option>Choose Your Service</option>
                                  <option>Home Luggage</option>
                                  <option>Office Luggage</option>
                                  <option>Shop Luggage</option>
                                  <option>Car Washing</option>
                                  <option>Carpet Luggage</option>
                                  <option>Windows Luggage</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center mb-4">
                            <div className="w-full md:w-3/5 lg:w-3/5 mb-4 md:mb-0 lg:mb-0 md:pr-2 lg:pr-2">
                              <div className="form-group">
                                <select className="form-select py-2 px-4 rounded-lg border-gray-300 w-full">
                                  <option>Choose Date</option>
                                  {/* Populate options with dates */}
                                  <option>Date 1</option>
                                  <option>Date 2</option>
                                  <option>Date 3</option>
                                  {/* Add more dates as needed */}
                                </select>
                              </div>
                            </div>
                            <div className="w-full md:w-2/5 lg:w-2/5 md:pl-2 lg:pl-2">
                              <div className="form-group">
                                <select className="form-select py-2 px-4 rounded-lg border-gray-300 w-full">
                                  <option>Choose Country</option>
                                  <option>Australia</option>
                                  <option>Option 1B</option>
                                  {/* Add more options as needed */}
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Additional input fields for booking */}
                          <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center mb-4">
                            <div className="w-full md:w-3/5 lg:w-3/5 mb-4 md:mb-0 lg:mb-0 md:pr-2 lg:pr-2">
                              <div className="form-group">
                                <select className="form-select py-2 px-4 rounded-lg border-gray-300 w-full">
                                  <option>Choose City</option>
                                  <option>Tasmania</option>
                                  <option>Sydney</option>
                                  {/* Add more options as needed */}
                                </select>
                              </div>
                            </div>
                            <div className="w-full md:w-2/5 lg:w-2/5 md:pl-2 lg:pl-2"></div>
                          </div>
                          {/* Booking button */}
                          <div className="flex justify-center">
                            <button type="submit" className="btn cmn-btn py-2 px-6 md:py-3 md:px-8 lg:py-3 lg:px-8 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600">Book Now</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Banner */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserServiceAgency;
