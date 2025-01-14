import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "/files/img/home-two/logo3.svg"; // Import the logo
import config from "../../config";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import EditLocationModal from "./EditLocationModal";
import AssignPartnerModal from "./AssignPartnerModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { MdChargingStation, MdDelete, MdEdit } from "react-icons/md";
import { LuLoader } from "react-icons/lu";

const AllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [partners, setPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage] = useState(50);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fetchingQRCode, setFetchingQRCode] = useState(false);
  const [qrCodeError, setQrCodeError] = useState(null);
  const [qrCodeDetails, setQrCodeDetails] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // To differentiate between soft and hard delete

  const navigate = useNavigate();

  const formatTime = (timeStr) => {
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(`1970-01-01T${timeStr}Z`)
      .toLocaleTimeString("en-AU", {
        ...options,
        timeZone: "UTC",
      })
      .toString()
      .toUpperCase();
  };

  useEffect(() => {
    fetchLocations();
    fetchPartners();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/logout";
      return null;
    }
    return token;
  };

  const handleUnauthorized = () => {
    navigate("/logout");
  };

  const fetchLocations = async () => {
    setLoading(true);
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/locations/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data)) {
        setLocations(response.data);
      } else {
        setLocations([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      } else {
        setError("Failed to fetch locations");
      }
    }
  };

  const fetchPartners = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/users/all-partners`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data)) {
        setPartners(response.data);
      } else if (
        response.data.status === "success" &&
        Array.isArray(response.data.data)
      ) {
        setPartners(response.data.data);
      } else {
        setError("Failed to fetch partner data");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleUnauthorized();
      } else {
        setError("Failed to fetch partner data");
      }
    }
  };

  const confirmDeleteLocation = (id, type) => {
    setLocationToDelete(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const deleteLocation = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const url =
        deleteType === "soft"
          ? `${config.API_BASE_URL}/api/v1/locations/soft-delete/${locationToDelete}`
          : `${config.API_BASE_URL}/api/v1/locations/${locationToDelete}/hard`;

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        fetchLocations();
      } else {
        alert("Failed to delete location.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const getPartnerDetails = (partnerId) => {
    const partner = partners.find(
      (p) => p._id === partnerId || (p.user && p.user._id === partnerId)
    );
    if (partner) {
      const username = partner.user?.username || partner.username;
      const email = partner.user?.email || partner.email;
      return { username, email };
    }
    return { username: "", email: "" };
  };

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = filteredLocations.slice(
    indexOfFirstLocation,
    indexOfLastLocation
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const updateLocation = (updatedLocation) => {
    setLocations(
      locations.map((location) =>
        location._id === updatedLocation._id ? updatedLocation : location
      )
    );
    setIsEditing(false);
  };
  const updateImage = (imageFile) => {
    // i will update image here
  };

  const updateCharging = async (locId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${config.API_BASE_URL}/api/v1/charging/locations/toggle/${locId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Charging Location updated successfully.");
      } else {
        alert("Failed to update charging.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const assignPartner = async (locationId, partnerId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${config.API_BASE_URL}/api/v1/locations/assign`,
        {
          locationId,
          partnerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchLocations();
      } else {
        alert("Failed to assign partner.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleURLClick = async (url, location) => {
    setFetchingQRCode(true);
    setQrCodeError(null);
    try {
      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/qr-code/${url}`
      );
      setQrCode(response.data.qrCode);
      setQrCodeDetails({
        address: location?.address,
        name: location?.name,
      });
      setShowModal(true);
    } catch (error) {
      setQrCodeError("Unable to fetch QR code. Please try again later.");
    } finally {
      setFetchingQRCode(false);
    }
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById("qrCodeModal");
    const originalClass = input.className;

    // Hide buttons before generating PDF
    input.className = `${originalClass} hide-buttons`;

    // Increase the scale to improve quality
    const scale = 3; // Increase this value to improve resolution
    html2canvas(input, { scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Use PNG for better quality
      const pdf = new jsPDF();

      // Calculate X and Y positions to center the content
      const imgWidth = 190; // PDF width in mm
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Keep aspect ratio
      const yPosition = (pageHeight - imgHeight) / 2; // Center vertically

      pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight); // Use 'PNG' format
      pdf.save("QRCode.pdf");

      // Restore original class
      input.className = originalClass;
    });
  };

  // toggle-charging-station
  const toggleChargingStation = async (locId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${config.API_BASE_URL}/api/v1/superadmin/locations/${locId}/toggle-charging-station`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Charging Station Status toggled successfully.");
      } else {
        alert("Failed to update store keys.");
      }
    } catch (error) {
      alert(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };
  // toggle-store-keys
  const toggleStoreKeys = async (locId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${config.API_BASE_URL}/api/v1/superadmin/locations/${locId}/toggleCanStoreKeys`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Store Keys toggled successfully.");
      } else {
        alert("Failed to update store keys.");
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };

  // can-store-luggage
  const toggleCanStoreLuggage = async (locId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${config.API_BASE_URL}/api/v1/superadmin/locations/${locId}/toggle-can-store-luggage`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Can Store Luggage toggled successfully.");
      } else {
        alert("Failed to update store keys.");
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response.data.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
        {/* Site header */}
        <SuperAdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Buttons */}
            <div className="mb-4 flex justify-between">
              <button
                onClick={() => navigate("/superadmin/create-location")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Create Location
              </button>
            </div>

            {/* Search bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by Location Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
              />
            </div>

            {/* Location List Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              {loading ? (
                <div className="flex justify-center items-center p-8">
                  <LuLoader size={34} className="animate-spin" />
                </div>
              ) : error ? (
                <div className="flex justify-center items-center p-8 text-red-500">
                  {error}
                </div>
              ) : (
                <table className="min-w-full">
                  <thead className="bg-teal-def text-white">
                    <tr>
                      <th className="py-3 px-6 text-left font-bold">Name</th>
                      <th className="py-3 px-6 text-left font-bold">Address</th>
                      <th className="py-3 px-6 text-left font-bold">
                        Open Time
                      </th>
                      <th className="py-3 px-6 text-left font-bold">
                        Close Time
                      </th>
                      <th className="py-3 px-6 text-left font-bold">QRCode</th>
                      <th className="py-3 px-6 text-left font-bold">Partner</th>
                      <th className="py-3 px-6 text-left font-bold">Actions</th>
                      <th className="py-3 px-6 text-left font-bold hidden">
                        Trash
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-800">
                    {currentLocations.map((location) => {
                      const { username, email } = getPartnerDetails(
                        location.partner
                      );
                      return (
                        <tr
                          key={location._id}
                          className="hover:bg-gray-100 transition duration-150"
                        >
                          <td
                            className="py-3 px-6 border-b text-blue-500 cursor-pointer"
                            onClick={() =>
                              navigate(`/superadmin/reviews/${location._id}`)
                            }
                          >
                            {location.name}
                          </td>
                          <td className="py-3 px-6 border-b max-w-52">
                            {`${location.address.street},  ${location.address.city}, ${location.address.state}, ${location.address.zipCode}, ${location.address.country}`}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {formatTime(location.openTime)}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {formatTime(location.closeTime)}
                          </td>
                          <td className="py-3 px-6 border-b">
                            <button
                              className="underline text-blue-400"
                              onClick={() => {
                                handleURLClick(location.url, location);
                              }}
                            >
                              {location.url}
                            </button>
                          </td>
                          <td className="py-3 px-6 border-b text-wrap">
                            {location.partner ? (
                              <>
                                {username} ({email})
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  setCurrentLocation(location);
                                  setIsAssigning(true);
                                }}
                                className="px-4 py-2 rounded-lg bg-blue-500 text-white transition duration-150"
                              >
                                Assign Partner
                              </button>
                            )}
                          </td>
                          <td className="py-3 pr-5 border-b flex flex-nowrap justify-start gap-1 text-xs h-full">
                            <button
                              onClick={() => {
                                toggleChargingStation(location?._id);
                              }}
                              className="p-2 w-fit mx-auto rounded-lg bg-green-400 text-white transition duration-150 flex justify-center items-center"
                            >
                              <MdChargingStation size={15} />
                            </button>
                            <button
                              onClick={() => {
                                setCurrentLocation(location);
                                setIsEditing(true);
                              }}
                              className="p-2 w-fit mx-auto rounded-lg bg-teal-500 text-white transition duration-150 flex justify-center items-center"
                            >
                              <MdEdit size={15} />
                            </button>
                            <button
                              onClick={() =>
                                confirmDeleteLocation(location._id, "hard")
                              }
                              className="p-2 w-fit mx-auto rounded-lg bg-red-500 text-white transition duration-150 flex justify-center items-center"
                            >
                              <MdDelete size={15} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm"
                aria-label="Pagination"
              >
                {[
                  ...Array(
                    Math.ceil(filteredLocations.length / locationsPerPage)
                  ).keys(),
                ].map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition duration-300 ${
                      currentPage === number + 1 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {number + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </main>
        {isEditing && (
          <EditLocationModal
            location={currentLocation}
            onClose={() => setIsEditing(false)}
            onUpdate={updateLocation}
            onUpdateImage={updateImage}
            toggleCanStoreLuggage={toggleCanStoreLuggage}
            toggleStoreKeys={toggleStoreKeys}
          />
        )}
        {isAssigning && (
          <AssignPartnerModal
            location={currentLocation}
            partners={partners}
            onClose={() => setIsAssigning(false)}
            onAssign={assignPartner}
          />
        )}
        {showDeleteModal && (
          <DeleteConfirmationModal
            onClose={() => setShowDeleteModal(false)}
            onDelete={deleteLocation}
          />
        )}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
            <div className="bg-white rounded-lg p-8 z-10 shadow-lg w-full max-w-md">
              {fetchingQRCode ? (
                <div className="flex justify-center">
                  <div className="loader"></div>
                </div>
              ) : qrCodeError ? (
                <div className="text-red-500">{qrCodeError}</div>
              ) : (
                <div className="text-center">
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="mb-4 mx-auto"
                    width={400}
                    height={400}
                  />
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                  >
                    OK
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* for qrcode */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-300 bg-opacity-75"></div>{" "}
            {/* Updated background color */}
            <div
              id="qrCodeModal"
              className="bg-cyan-900 rounded-lg p-8 z-10 shadow-lg w-full max-w-md"
            >
              {fetchingQRCode ? (
                <div className="flex justify-center">
                  <div className="loader"></div>
                </div>
              ) : qrCodeError ? (
                <div className="text-red-500">{qrCodeError}</div>
              ) : (
                <div className="text-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="-mt-4 mb-4 w-48 mx-auto"
                    width={190}
                    height={190}
                  />{" "}
                  {/* Larger logo */}
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="mb-4 w-48 mx-auto rounded-md"
                    width={190}
                    height={190}
                  />{" "}
                  {/* Smaller QR Code */}
                  {qrCodeDetails && (
                    <div className="text-slate-100 font-medium">
                      <p className="text-yellow-400 font-medium text-xl">
                        {qrCodeDetails?.name}
                      </p>
                      <p className="text-sm">
                        {qrCodeDetails?.address?.street},{" "}
                        {qrCodeDetails?.address?.state}
                      </p>
                      <p className="text-sm">
                        {qrCodeDetails?.address?.city}-{" "}
                        {qrCodeDetails?.address?.zipCode},
                        {qrCodeDetails?.address?.country}
                      </p>
                    </div>
                  )}
                  <p className="px-2 mx-32  text-xl  text-white rounded-lg mt-4  transition duration-150">
                    Book Now
                  </p>
                  <div className="buttons mt-4">
                    {" "}
                    {/* Group buttons in a div */}
                    <button
                      onClick={handleDownloadPDF}
                      className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition duration-150"
                    >
                      Download as PDF
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition duration-150 ml-2"
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLocations;
