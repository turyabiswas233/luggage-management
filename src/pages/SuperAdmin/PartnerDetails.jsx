import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/img/home-two/logo3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillCreditCard } from "react-icons/ai";
import {
  faEnvelope,
  faMapMarkerAlt,
  faIdBadge,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { LuLoader } from "react-icons/lu";
import config from "../../config";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PartnerDetails = () => {
  const { id } = useParams();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paySlipStatus, setSlipStatus] = useState(null);
  const [qrBonus, setQRBonus] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchPartnerDetails = async () => {
      setLoading(true);
      try {
        console.log("Fetching partner details...");
        const response = await axios.get(
          `${config.API_BASE_URL}/api/v1/users/partners/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Partner All Info:", response);

        if (response.status === 200 && response.data) {
          setPartner(response.data);
          console.log("Partner data:", response.data);
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

    fetchPartnerDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex items-center justify-center h-screen">
        No partner details found
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <SuperAdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <SuperAdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg duration-300">
              <h1 className="text-4xl break-all font-bold mb-6 text-center text-[#1a73a7]">
                Details
              </h1>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                  {partner.user.username}
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 flex items-center">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mr-2 text-[#1a73a7]"
                    />
                    <strong className="font-medium text-gray-700">
                      Email:
                    </strong>{" "}
                    {partner.user.email}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="mr-2 text-[#1a73a7]"
                    />
                    <strong className="font-medium text-gray-700">
                      Business Address:
                    </strong>{" "}
                    {`${partner.businessAddress.street}, ${partner.businessAddress.district}, ${partner.businessAddress.city}, ${partner.businessAddress.state}, ${partner.businessAddress.zipCode}, ${partner.businessAddress.country}`}
                  </p>
                  <div className="text-gray-600">
                    <p className="font-medium text-gray-700 flex items-center gap-2">
                      <AiFillCreditCard color="#1a73a7" /> Bank Details:
                    </p>
                    <div className="grid-cols-2 grid gap-2 text-sm px-3">
                      <p>Bank Name: {partner.bankDetails?.bankName || "---"}</p>
                      <p>
                        AC Holder:{" "}
                        {partner.bankDetails?.accountHolderName || ""}
                      </p>
                      <p>
                        AC Number: {partner.bankDetails?.accountNumber || ""}
                      </p>
                      <p>BSB No: {partner.bankDetails?.bsbNumber || ""}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 flex items-center">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      className="mr-2 text-[#1a73a7]"
                    />
                    <strong className="font-medium text-gray-700">
                      ABN Number:
                    </strong>{" "}
                    {partner.tradeLicenseNumber}
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => navigate("/superadmin/partners")}
                  className="px-6 py-2 bg-[#1a73a7] text-white rounded-full hover:bg-[#15628e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:-translate-y-1 flex items-center"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  Back
                </button>
                <button
                  onClick={() =>
                    navigate(`/superadmin/partners/${id}/urlokerkey`)
                  }
                  className="px-6 py-2 bg-[#1a73a7] text-white rounded-full hover:bg-[#15628e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:-translate-y-1 flex items-center"
                >
                  Keys Info
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="max-w-3xl mx-auto w-full">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center text-[#1a73a7]">
                  Update Payment Status
                </h1>
                <h1 className="text-xl font-bold mb-6 text-center text-red-500"></h1>

                {/* check payment */}
                <UpdatePaymentStatus months={months} />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row md:col-span-2 gap-4">
            <div className="max-w-3xl mx-auto w-full">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center text-[#1a73a7]">
                  Get Payment Slip
                </h1>
                <h1 className="text-xl font-bold mb-6 text-center text-red-500"></h1>
                {/* check payment */}
                <CheckPaymentStatus
                  months={months}
                  partner={partner}
                  setSlipStatus={setSlipStatus}
                  setQRBonus={setQRBonus}
                />
              </div>
            </div>
            <PaymentSlip paymentSlip={paySlipStatus} qrBonus={qrBonus} />
          </div>
        </main>
      </div>
    </div>
  );
};

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
const UpdatePaymentStatus = ({ months }) => {
  const { id } = useParams();
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const [amountPaid, setAmount] = useState(0);
  const [load, setLoading] = useState(false);
  const [payStatus, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [toggleHistory, setToggleHistory] = useState(false);
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
    if (0 >= amountPaid) {
      setError("Payment amount cannot be 0$");
      setLoading(false);
      return;
    }
    try {
      console.log("Fetching partner payment status...");
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${config.API_BASE_URL}/api/v1/analytics/mark-paid`,
        {
          partnerId: id,
          month: month,
          year: year,
          amountPaid: Number(amountPaid),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("API response:", response);

      if (response.status === 200 && response.data) {
        setStatus(response.data?.message);
        console.log("Partner data:", response.data);
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
      className="grid grid-cols-3 gap-4 items-center"
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
      <section className="grid">
        <label htmlFor="amount">Amount: </label>
        <input
          className="rounded-md bg-white text-black border-2 outline-none w-full placegolder"
          name="amount"
          id="amount"
          type="number"
          min={0}
          max={100000}
          step={0.01}
          value={amountPaid}
          onChange={(e) => setAmount(e.target.value)}
          required
          placeholder="Partner's payment amount"
        />
      </section>
      {payStatus && (
        <section
          className={`col-span-3 w-full border text-center rounded-md bg-green-50 border-green-500 text-green-400`}
        >
          <p className="py-2">{payStatus}</p>
        </section>
      )}
      {error && (
        <section
          className={`col-span-3 w-full border text-center rounded-md bg-red-50 border-red-500 text-red-400`}
        >
          <p className="py-2">{error}</p>
        </section>
      )}
      <div className="grid grid-cols-2 gap-3 col-span-3">
        <button
          className="px-6 py-2 bg-[#1a73a7] text-white rounded-full hover:bg-[#15628e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
          type="submit"
          disabled={load}
        >
          Pay ${amountPaid || "0.00"}
        </button>
        <button
          className="px-6 py-2 bg-[#1a73a7] text-white rounded-full hover:bg-[#15628e] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
          type="button"
          onClick={() => setToggleHistory((pre) => !pre)}
        >
          History
        </button>
      </div>
      {toggleHistory && <PaymentHistory id={id} month={month} year={year} />}
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
const PaymentHistory = ({ id, month, year }) => {
  const [history, setHistory] = useState([]);
  const [load, setLoading] = useState(false);
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoading(true);
      try {
        console.log("Fetching partner payment history...");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${config.API_BASE_URL}/api/v1/analytics/payment-records/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200 && response.data) {
          setHistory(response.data?.data);
          console.log("Partner data:", response.data);
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

    fetchPaymentHistory();
  }, []);
  const filteredHistory = history.filter(
    (h) => h.month == month && h.year == year
  );

  return (
    <div className="col-span-3">
      <h3 className="text-2xl text-center font-semibold text-[#1a73a7] mb-4">
        Payment History
      </h3>
      {/* use luloader to show loading */}
      {load ? (
        <LuLoader className="animate-spin mx-auto" size={"2em"} />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredHistory?.length > 0 ? (
            filteredHistory?.map((h, i) => (
              <div
                key={`hi-${i}`}
                className=" bg-white border-2 rounded-lg px-4 py-2 grid gap-2 grid-cols-2"
              >
                <div>
                  <p className="text-gray-700 font-semibold">
                    Month: {h?.month}
                  </p>
                  <p className="text-gray-700 font-semibold">Year: {h?.year}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">
                    Amount Paid: ${h?.amountPaid}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-700 text-lg font-semibold text-center">
              No history found {month}-{year}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const convertToDollars = (amountInCents) =>
  ((38.095 / 100) * amountInCents).toFixed(2);
export default PartnerDetails;
