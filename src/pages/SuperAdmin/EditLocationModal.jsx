import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";

const EditLocationModal = ({ location, onClose, onUpdate, onUpdateImage }) => {
  const [formData, setFormData] = useState({
    openTime: "",
    closeTime: "",
    image: null,
  });

  useEffect(() => {
    if (location) {
      setFormData({
        openTime: location.openTime || "",
        closeTime: location.closeTime || "",
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
      console.log(e.target.files[0]);
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${config.API_BASE_URL}/api/v1/locations/${location._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        onUpdate(response.data);
        onClose();
      } else {
        alert("Failed to update location.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  // image update not set yet
  const handleUpdateImage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${config.API_BASE_URL}/api/v1/locations/${location._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        onUpdateImage(response.data);
        onClose();
      } else {
        alert("Failed to update location.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transform transition-all sm:w-1/2 sm:scale-100 scale-95">
        <h2 className="text-3xl mb-6 font-bold text-gray-800">
          Edit Location Image, Open and Close Time
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Banner Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              multiple={false}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {/* if image then show <img /> tag */}
            {formData.image && (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Banner"
                width={100}
                height={100}
                className="mt-2 rounded-lg object-cover aspect-square"
              />
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Open Time
            </label>
            <input
              type="time"
              name="openTime"
              value={formData.openTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Close Time
            </label>
            <input
              type="time"
              name="closeTime"
              value={formData.closeTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 transition duration-200 ease-in-out transform hover:bg-gray-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg transition duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLocationModal;
