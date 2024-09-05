import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import EditLocationForm from "./EditLocationForm";
import config from "../../../config";
import PartnerNavbarComp from "../PartnerNavbarComp";

const EditPartnerLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const locationData = useLocation(); // Get location data passed from PartnerLocations

  useEffect(() => {
    if (locationData.state && locationData.state.location) {
      setLocation(locationData.state.location);
      console.log("Editing location:", locationData.state.location); // Log the location data
    } else {
      setMessage({
        text: "Location data is missing. Please go back and select a location to edit.",
        type: "error",
      });
    }
  }, [locationData]);

  const handleSubmit = async (values) => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    setErrors({});

    // Perform validation (as you have done previously)
    const formErrors = {};
    if (!values.name) formErrors.name = "Name is required";
    // ... (Other validation code)
    if (!location.coordinates)
      formErrors.location = "Map location must be selected";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    // Prepare the JSON object with the data to send to the server
    const updatedLocation = {
      name: values.name,
      description: values.description,
      address: {
        street: values.street,
        city: values.city,
        state: values.state,
        zipCode: values.zipCode,
        country: values.country,
      },
      files: values.files,
      capacity: values.capacity,
      regularPrice: values.regularPrice,
      discountPercentage: values.discountPercentage,
      availableFrom: values.availableFrom,
      availableTo: values.availableTo,
      openTime: values.openTime,
      closeTime: values.closeTime,
      closedDays: values.closedDays,
      specialClosedDays: values.specialClosedDays,
      locationType: values.locationType,
      timezone: location.timezone,
      notes: values.notes,
    };

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("address[street]", values.street);
    formData.append("address[city]", values.city);
    formData.append("address[state]", values.state);
    formData.append("address[zipCode]", values.zipCode);
    formData.append("address[country]", values.country);
    formData.append("capacity", values.capacity);
    formData.append("availableSpace", 10000); // Default value
    formData.append("regularPrice", 1000); // Default value
    formData.append("discountPercentage", 10); // Default value
    formData.append("availableFrom", new Date().toISOString().split("T")[0]); // Today's date
    formData.append(
      "availableTo",
      new Date(new Date().setFullYear(new Date().getFullYear() + 20))
        .toISOString()
        .split("T")[0]
    ); // 20 years from now
    formData.append("amenities", JSON.stringify(["Wi-Fi", "Parking"])); // Default value
    formData.append("notes", "Default notes"); // Default value
    formData.append("specialClosedDays", values.specialClosedDays); // Default value
    formData.append("openTime", values.openTime);
    formData.append("closeTime", values.closeTime);
    formData.append("closedDays", values.closedDays);
    formData.append("locationType", values.locationType);
    formData.append("timezone", location.timezone);

    if (values.files)
      Array.from(values.files).forEach((file) => {
        formData.append("files", file);
      });

    const token = localStorage.getItem("token");
    const url = `${config.API_BASE_URL}/api/v1/locations/${location._id}`;
    // formData.forEach(e=> console.log(e));
    // setLoading(false);
    // return;
    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setMessage({ text: "Location updated successfully!", type: "success" });
        navigate("/partner/locations");
      } else {
        setMessage({ text: "Failed to update location.", type: "error" });
      }
    } catch (error) {
      if (error.response) {
        setMessage({
          text:
            error.response.data.message ||
            "An error occurred. Please try again.",
          type: "error",
        });
      } else {
        setMessage({
          text: "An error occurred. Please try again.",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <PartnerNavbarComp />
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto mt-24 px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
          {message.text && (
            <div
              className={`alert ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } p-4 mb-6 rounded`}
            >
              {message.text}
            </div>
          )}
          {location ? (
            <div className="bg-white shadow-lg rounded p-6">
              <EditLocationForm
                onSubmit={handleSubmit}
                location={location}
                loading={loading}
                errors={errors}
              />
            </div>
          ) : (
            <div className="text-red-500">Loading location data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPartnerLocation;
