import React, { useState, useRef } from "react";
import { LuLoader } from "react-icons/lu";

import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";

const Finance = () => {
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "Partner1",
      monthlySales: 5000,
      totalBookings: 50,
      earnings: 4500,
      statusPaid: false,
    },
    {
      id: 2,
      name: "Partner2",
      monthlySales: 3000,
      totalBookings: 30,
      earnings: 2700,
      statusPaid: false,
    },
    {
      id: 3,
      name: "Partner3",
      monthlySales: 8000,
      totalBookings: 80,
      earnings: 7200,
      statusPaid: false,
    },
    // More dummy data...
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const togglePaymentStatus = (id) => {
    setPartners(
      partners.map((partner) =>
        partner.id === id
          ? { ...partner, statusPaid: !partner.statusPaid }
          : partner
      )
    );
  };

  const openPaymentModal = (partner) => {
    setCurrentPartner(partner);
    setPrice(partner.monthlySales);
    setPaymentModalOpen(true);
  };

  const handlePaymentFormSubmit = () => {
    console.log(`Price: ${price}`);
    setPaymentModalOpen(false);
  };

  const handleAddPriceClick = () => {
    setPrice("");
    setDiscount("");
    setPriceModalOpen(true);
  };

  const handlePriceFormSubmit = () => {
    console.log(`Price: ${price}, Discount: ${discount}`);
    setPriceModalOpen(false);
  };

  const handleCancel = () => {
    setPaymentModalOpen(false);
    setPriceModalOpen(false);
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
            <h3 className="text-red-600 font-bold text-xl mb-10 bg-red-200/60 rounded-md p-2 ring-1 ring-red-500">NB:- This page is under development</h3>
            {/* Add Price Button */}
            <div className="mb-4">
              <button
                onClick={handleAddPriceClick}
                className="px-4 py-2 rounded-lg bg-green-500 text-white transition duration-150"
              >
                Add Price
              </button>
            </div>

            {/* Partner List Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="min-w-full">
                <thead className="bg-[#4A686A] text-white">
                  <tr>
                    <th className="w-1/8 py-3 px-6 text-left">ID</th>
                    <th className="w-1/8 py-3 px-6 text-left">Name</th>
                    <th className="w-1/8 py-3 px-6 text-left">Monthly Sales</th>
                    <th className="w-1/8 py-3 px-6 text-left">
                      Total Bookings
                    </th>
                    <th className="w-1/8 py-3 px-6 text-left">
                      Earnings After Service Charge
                    </th>
                    <th className="w-1/8 py-3 px-6 text-left">
                      Payment Status
                    </th>
                    <th className="w-1/8 py-3 px-6 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody className="text-gray-800">
                  {partners.map((partner) => (
                    <tr
                      key={partner.id}
                      className="bg-white hover:bg-gray-200 transition duration-150"
                    >
                      <td className="w-1/8 py-3 px-6 border">{partner.id}</td>
                      <td className="w-1/8 py-3 px-6 border">{partner.name}</td>
                      <td className="w-1/8 py-3 px-6 border">
                        ${partner.monthlySales}
                      </td>
                      <td className="w-1/8 py-3 px-6 border">
                        {partner.totalBookings}
                      </td>
                      <td className="w-1/8 py-3 px-6 border">
                        ${partner.earnings}
                      </td>
                      <td className="w-1/8 py-3 px-6 border text-center">
                        <button
                          onClick={() => togglePaymentStatus(partner.id)}
                          className={`px-4 py-2 rounded-lg ${
                            partner.statusPaid ? "bg-green-500" : "bg-red-500"
                          } text-white transition duration-150`}
                        >
                          {partner.statusPaid ? "Paid" : "Unpaid"}
                        </button>
                      </td>
                      <td className="w-1/8 py-3 px-6 border text-center">
                        <button
                          onClick={() => openPaymentModal(partner)}
                          className="px-4 py-2 rounded-lg bg-blue-500 text-white transition duration-150"
                        >
                          Price Adjustment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Price Adjustment for {currentPartner.name}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentFormSubmit}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Price Modal */}
      {priceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Price and Discount</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Discount</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handlePriceFormSubmit}
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const convertToDollars = (amountInCents) =>
  ((38.095 / 100) * amountInCents).toFixed(2);
const CheckPaymentStatus = ({ months, partner, setSlipStatus, setQRBonus }) => {
  const { id } = useParams();
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [load, setLoading] = useState(false);
  const [payStatus, setStatus] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let cy = new Date().getFullYear();
    setYears([]);
    for (let i = cy; i > cy - 100; i--) {
      setYears((pre) => [...pre, i]);
      if (i < 1971) break;
    }
  }, []);

  const checkPaymentStatus = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      console.log("Fetching partner payment status...");
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/analytics/check-payment-status?partnerId=${id}&month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // get qrcode bonus info
      const qrres = await axios.get(
        `${config.API_BASE_URL}/api/v1/analytics/partner/qr-code-bookings-bonus?partnerId=${id}&month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API response:", qrres.data);
      setQRBonus(qrres.data?.data);

      if (response.status === 200 && response.data) {
        setStatus(response.data?.data);
        console.log(response.data);
        setSlipStatus({
          ...response.data?.data?.isPaid?.earningsBreakdown,
          partnerName: partner?.user?.username,
          address: partner?.businessAddress,
          abnNumber: partner?.tradeLicenseNumber,
          month: month - 1,
          year,
        });
      } else {
        setError("Failed to fetch partner details");
      }
    } catch (err) {
      setError("Failed to fetch partner details");
      console.log("API error:", err);
    } finally {
      setLoading(false);
      console.log("Fetching completed");
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-4 items-center"
      onSubmit={checkPaymentStatus}
    >
      <section className="grid">
        <label htmlFor="month">Month: </label>
        <select
          className="rounded-md bg-white text-black border-2 outline-none"
          name="month"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((m) => (
            <option value={m} key={`month_${m}`}>
              {m}
            </option>
          ))}
        </select>
      </section>
      <section className="grid">
        <label htmlFor="year">Year: </label>
        <select
          className="rounded-md bg-white text-black border-2 outline-none"
          name="year"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((m) => (
            <option value={m} key={`year_${m}`}>
              {m}
            </option>
          ))}
        </select>
      </section>
      {payStatus && (
        <section
          className={`col-span-2 w-full border text-center rounded-md ${
            payStatus?.isPaid?.paymentStatus == "paid"
              ? "bg-green-50 border-green-500 text-green-400"
              : "bg-red-50 border-red-500 text-red-400"
          }`}
        >
          <span className="py-2 capitalize">
            {payStatus?.isPaid?.paymentStatus}
          </span>
        </section>
      )}
      {error && (
        <section
          className={`col-span-2 w-full border text-center rounded-md bg-red-50 border-red-500 text-red-400`}
        >
          <p className="py-2">{error}</p>
        </section>
      )}
      <button
        className="px-6 py-2 col-span-2 bg-[#1a73a7] text-white rounded-full hover:bg-[#15628e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
        type="submit"
        disabled={load}
      >
        Generate
      </button>
    </form>
  );
};
const PaymentSlip = ({ paymentSlip, qrBonus }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const slipref = useRef(null);
  const [load, setLoad] = useState(false);
  const handleDownloadPDF = () => {
    const paySlip = slipref.current;

    html2canvas(paySlip, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Use PNG for better quality
      const pdf = new jsPDF("p", "mm", "a4");

      // Calculate X and Y positions to center the content
      const imgWidth = 210; // PDF width in mm
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Keep aspect ratio
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position + 5, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position + 5, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("payment-slip-location.pdf");
    });
  };

  if (!paymentSlip) return;
  return (
    <div className="bg-teal-50 p-10 rounded-xl shadow-xl shadow-gray-200 w-full md:col-span-2">
      <div
        className="mx-auto max-w-screen-md bg-white shadow-lg rounded-lg overflow-hidden"
        ref={slipref}
      >
        <img className="bg-white" src={logo} width={85} height={85} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl text-center mb-10">
            Payment Slip
          </div>
          <div className="mb-4 text-sm">
            <h2 className="text-lg font-semibold">Partner Details</h2>
            <p>
              <strong>Name:</strong> {paymentSlip?.partnerName}
            </p>
            <p>
              <strong>ABN:</strong> {paymentSlip?.abnNumber}
            </p>
            <p>
              <strong>Address:</strong>
              {`${paymentSlip.address.street}, ${paymentSlip.address.district}, ${paymentSlip.address.city}, ${paymentSlip.address.state}, ${paymentSlip.address.zipCode}, ${paymentSlip.address.country}`}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="mb-4 text-sm">
              <h2 className="text-base font-semibold">Payment Details</h2>
              <p>
                <strong>Month - Year:</strong> {months[paymentSlip?.month]} -{" "}
                {paymentSlip?.year}
              </p>
              <p>
                <strong>Earning from QR Code Booking:</strong> $
                {convertToDollars(paymentSlip?.totalQrCodeEarnings)}
              </p>
              <p>
                <strong>Earning from Online Booking:</strong> $
                {convertToDollars(paymentSlip?.totalOnlineEarnings)}
              </p>
              <p>
                <strong>Keys Earning:</strong> $
                {convertToDollars(paymentSlip?.totalKeyBookingsEarnings)}
              </p>
              <p>
                <strong>Total Earning:</strong> $
                {convertToDollars(paymentSlip?.totalEarnings)}
              </p>
            </div>
            <div className="mb-4">
              {/* generate qrBonus only show bonus amount with total booking */}
              {qrBonus && (
                <div className="P-3 text-sm rounded-md border p-2">
                  <h2 className="text-base font-semibold">QR Code Booking</h2>
                  <p>
                    <strong>Total Booking[QR]:</strong> {qrBonus?.totalBookings}
                  </p>
                  <p>
                    <strong>Total Bonus:</strong> ${qrBonus?.bonus}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-teal-500 text-white rounded-full px-6 py-2 mt-3 disabled:pointer-events-none disabled:opacity-40 min-w-48 text-center"
        disabled={load}
        onClick={handleDownloadPDF}
      >
        {load ? <LuLoader className="animate-spin mx-auto" /> : "Donwload"}
      </button>
    </div>
  );
};
export default Finance;
