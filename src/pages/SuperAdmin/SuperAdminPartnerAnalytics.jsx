import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { LuAlertTriangle } from "react-icons/lu";
import { MdCheck, MdClose } from "react-icons/md";
import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import config from "../../config";
import html2pdf from "html2pdf.js";
import logo from "/img/home-two/logo3.svg";
import { ClipLoader } from "react-spinners";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

Chart.register(...registerables);

const SuperAdminPartnerAnalytics = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [adminEarning, setAdminEarning] = useState({
    monthlyEarnings: [],
    last7DaysEarnings: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [partnersPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [dataToMonth, setDataToMonth] = useState(null);
  const [dataM, setDataM] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [slipType, setSlipType] = useState("");

  useEffect(() => {
    try {
      const URL = `${config.API_BASE_URL}/api/v1/analytics/all-partner-earnings`;
      axios
        .get(URL)
        .then((res) => {
          console.log(res);
          if (res.data.success) setPartners(res?.data?.data);
          else {
            setPartners([]);
            setErrMsg("No data found");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrMsg("An unexpected error occured. Try refreshing the page.");
        });
    } catch (err) {
      console.log(err);
      setErrMsg("An unexpected error occured. Try refreshing the page.");
    }
    // try to fetch super-admin analytics
    try {
      const URL = `${config.API_BASE_URL}/api/v1/analytics/superadmin/earnings`;
      const token = localStorage.getItem("token");
      axios
        .get(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);

          if (res.data.success) {
            setData(res.data?.data);
            setDataM(
              res?.data?.data?.months?.sort((a, b) =>
                new Date(a?.monthStart).getTime() >
                new Date(b?.monthStart).getTime()
                  ? 1
                  : -1
              )
            );
            setAdminEarning(res?.data?.data);
          } else {
            setAdminEarning(null);
            setErrMsg("No data found");
          }
        })
        .catch((err) => {
          console.log(err);
          setErrMsg("An unexpected error occured. Try refreshing the page.");
        });
    } catch (err) {
      console.log(err);
      setErrMsg("An unexpected error occured. Try refreshing the page.");
    }
  }, []);

  // superadmin monthly earning
  const getChartDataAdminMonth = () => {
    return {
      labels:
        dataM
          .sort((a, b) =>
            new Date(a?.monthStart).getTime() >
            new Date(b?.monthStart).getTime()
              ? 1
              : -1
          )
          ?.map((d) => d?.month) || [],

      datasets: [
        {
          label: "Average Monthly Earnings by Urloker ($AUD)",
          data:
            dataM
              ?.sort((a, b) =>
                new Date(a?.monthStart).getTime() >
                new Date(b?.monthStart).getTime()
                  ? 1
                  : -1
              )
              ?.map((p) => convertToDollars(p?.earned)) || [],
          backgroundColor: "#f79616",
        },
      ],
    };
  };
  // superadmin 7days earning
  const getChartDataAdminDays = () => {
    return {
      labels: adminEarning?.last7DaysEarnings?.map((p) => p.period) || [],
      datasets: [
        {
          label: "Last 7 Days Earnings by Super-Admin",
          data:
            adminEarning?.last7DaysEarnings?.map((p) => p.totalEarnings) || [],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };
  // partner
  const getChartData = () => {
    return {
      labels: partners.map((partner) =>
        partner.partnerEmail
          .slice(0, partner.partnerEmail.indexOf("@"))
          .toUpperCase()
      ),
      datasets: [
        {
          label: "Average Monthly Earnings by Urloker",
          data: partners.map((partner) =>
            partner.earnings.length > 0
              ? partner.earnings.reduce(
                  (p, c) => p + (c.totalEarnings * 38.095) / 100,
                  0
                )
              : 0
          ),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };
  };

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = partners.slice(
    indexOfFirstPartner,
    indexOfLastPartner
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(errMsg);
  const convertToDollars = (amountInCents) =>
    (((100 - 38.095) / 100) * amountInCents).toFixed(2);
  // Prepare data for the graph
  // Calculate total pending earnings in dollars
  const totalEarnings = convertToDollars(data?.totalEarnings);
  const totalPendingEarnings = convertToDollars(data?.totalPending);

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
            {errMsg}

            {/* Partner Analytics Table PENDING*/}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg mb-6">
              <table className="min-w-full">
                <thead className="bg-[#4A686A] text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Partner ID</th>
                    <th className="py-3 px-6 text-left">Partner Email</th>
                    <th className="py-3 px-6 text-left">Total Earnings</th>
                    <th className="py-3 px-6 text-left">Total Paid</th>
                    <th className="py-3 px-6 text-left">
                      Income Indicator ({">10000"})
                    </th>
                  </tr>
                </thead>

                <tbody className="text-gray-800">
                  {currentPartners.map((partner, pid) => {
                    let earning = partner.earnings.reduce(
                      (p, c) => p + ((c.totalEarnings * 38.095) / 100 || 0),
                      0
                    );
                    let paid = partner.earnings.reduce(
                      (p, c) => p + ((c.amountPaid * 38.095) / 100 || 0),
                      0
                    );
                    return (
                      <tr
                        key={partner.partnerId}
                        className="bg-white hover:bg-gray-200 transition duration-150"
                      >
                        <td className="py-3 px-6 border text-center">
                          {pid + 1}
                        </td>
                        <td className="py-3 px-6 border">
                          {partner.partnerEmail}
                        </td>
                        <td className="py-3 px-6 border">
                          ${earning.toFixed(2)}
                        </td>
                        <td className="py-3 px-6 border">${paid.toFixed(2)}</td>

                        <td className="py-3 px-6 border text-center">
                          {earning >= 10000 ? (
                            <span className="text-green-600 font-semibold">
                              Good
                            </span>
                          ) : (
                            <span className="text-red-600 font-semibold">
                              Bad
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex justify-end p-4">
                <Pagination
                  partnersPerPage={partnersPerPage}
                  totalPartners={partners.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>

            {/* Total Earnings and Indicators DONE */}
            <div className="flex justify-center items-center mb-8">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center underline underline-offset-2">
                  Total Completed Earnings by Urloker
                </h2>
                <p className="text-xl font-semibold text-green-900">
                  Total Earned: $
                  <span className="text-3xl text-green-500">
                    {isNaN(totalEarnings) ? "0.00" : totalEarnings} AUD
                  </span>
                </p>
                <p className="text-xl font-semibold text-orange-900">
                  Total Pending: $
                  <span className="text-3xl text-orange-500">
                    {isNaN(totalPendingEarnings)
                      ? "0.00"
                      : totalPendingEarnings}{" "}
                    AUD
                  </span>
                </p>
              </div>
            </div>

            {/* Partner Analytics Graph DONE*/}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Bar
                data={getChartDataAdminMonth()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={500}
              />
            </div>

            {/* booking status by month */}
            <div className="w-full p-10 flex flex-col gap-5 min-h-svh">
              <h2 className="font-bold text-4xl text-center underline">
                Check Payment Status By Month
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <section className="p-2 h-fit grid gap-2 bg-white rounded-md ring ring-black">
                  <select
                    className="bg-transparent border-none outline-none"
                    name="month"
                    id="month"
                    onChange={(e) => setDataToMonth(dataM[e.target.value])}
                    defaultValue={""}
                  >
                    <option className="uppercase" value="" disabled>
                      Select a month
                    </option>
                    {months.map((m, mi) => {
                      return (
                        <option className="uppercase" value={mi} key={mi}>
                          {m}
                        </option>
                      );
                    })}
                  </select>
                </section>
                <section
                  className="p-2 h-fit grid gap-2 bg-white rounded-md ring ring-black aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  aria-disabled={!dataToMonth}
                >
                  <select
                    className="bg-transparent border-none outline-none"
                    name="slipType"
                    id="slipType"
                    onChange={(e) => setSlipType(e.target.value)}
                    defaultValue={""}
                  >
                    <option className="uppercase" value="" disabled>
                      Select Pay-slip type
                    </option>

                    <option className="uppercase" value={"Booking"}>
                      Booking
                    </option>
                    <option className="uppercase" value={"Location"}>
                      Location
                    </option>
                  </select>
                </section>
              </div>
              {dataToMonth ? (
                slipType === "Booking" ? (
                  <PaymentDetailsByMonthB
                    convertToDollars={convertToDollars}
                    data={dataToMonth}
                  />
                ) : slipType === "Location" ? (
                  <PaymentDetailsByMonthL
                    convertToDollars={convertToDollars}
                    data={dataToMonth}
                  />
                ) : (
                  <p className="bg-yellow-100 text-yellow-600 font-medium text-lg px-4 py-2 rounded-md border-2 border-yellow-500 flex items-center gap-2">
                    <LuAlertTriangle /> Choose a PaySlip Type to see details
                  </p>
                )
              ) : (
                <p className="bg-yellow-100 text-yellow-600 font-medium text-lg px-4 py-2 rounded-md border-2 border-yellow-500 flex items-center gap-2">
                  <LuAlertTriangle /> Please choose a correct month to view
                  payment status. You may see nothing if you choose a future
                  month.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({
  partnersPerPage,
  totalPartners,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPartners / partnersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 border rounded ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SuperAdminPartnerAnalytics;

const PaymentDetailsByMonthB = ({ data, convertToDollars }) => {
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false);
  const paymentSlip = useRef(null);

  const handleDownloadPDF = () => {
    const paySlip = paymentSlip.current;

    const opt = {
      margin: 0.5,
      filename: "payment-slip-booking.pdf",
      image: { type: "jpeg", quality: 1 },

      html2canvas: { scale: 3, dpi: 192, letterRendering: true },
      jsPDF: { unit: "cm", format: "a4", orientation: "portrait" }, //landscape
    };
    try {
      setLoad(true);
      html2pdf().from(paySlip).set(opt).save();
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };
  return (
    <div className="flex-1 h-fit text-black">
      <div className="grid">
        <table className="table h-fit rounded-md overflow-hidden ring-2 ring-black">
          <thead className="table-header-group text-center">
            <tr>
              <th className="border border-black" colSpan={2}>
                PAYMENT DETAILS
              </th>
            </tr>
          </thead>
          {/* BODY */}
          <tbody>
            <tr>
              <td className="border border-black">Month</td>
              <td className="border border-black">{data.month}</td>
            </tr>
            <tr>
              <td className="border border-black">
                Earning from IN-Store (QR-CODE) Booking
              </td>
              <td className="border border-black">
                ${" "}
                {data.earned == 0
                  ? "0.00"
                  : ((Number(data?.earned) * 38.095) / 100).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-black">
                Earning from ONLINE Booking
              </td>
              <td className="border border-black">
                ${" "}
                {data.earned == 0
                  ? "0.00"
                  : (
                      (Number(data?.earned) *
                        38.095 *
                        (data?.totalLuggageCount - data?.qrCodeLuggageCount)) /
                      data?.totalLuggageCount /
                      100
                    ).toFixed(2)}{" "}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th className="border border-black">Total Earning</th>
              <th className="border border-black">
                $ {convertToDollars(data?.earned)}
              </th>
            </tr>
          </tfoot>
        </table>

        <table className="h-fit w-full rounded-md overflow-hidden ring-2 ring-black">
          <thead className="table-header-group text-center">
            <tr>
              <th className="border border-black py-3 bg-white" colSpan={6}>
                BOOKING INFO
              </th>
            </tr>
            <tr className="bg-gray-800 text-white">
              <th className="border border-white">
                {" "}
                bookingId (Luggage Count)
              </th>
              <th className="border border-white">paymentAmount ($AUD)</th>
              <th className="border border-white">locationName</th>
              <th className="border border-white">source</th>
              <th className="border border-white">Status</th>
            </tr>
          </thead>
          {/* BODY */}
          <tbody className="text-center">
            {data?.bookings?.map((b, bid) => {
              if (b.status == "paid")
                return (
                  <tr
                    className={`px-3 text-sm border border-black ${
                      bid % 2 == 0 ? "bg-gray-200" : "bg-gray-100"
                    } hover:bg-gray-800 hover:text-white`}
                    key={`booking_${bid}`}
                  >
                    <td className="border border-black">
                      {b.bookingId} ({b.luggageCount})
                    </td>
                    <td className="border border-black">{b.paymentAmount}</td>
                    <td className="border border-black">{b.locationName}</td>
                    <td className="border border-black">
                      {b.source == "qr_code" ? "QR CODE" : "ONLINE"}
                    </td>
                    <td className="flex justify-center items-center py-2">
                      <span
                        className={`${
                          b.status === "paid"
                            ? "bg-green-200 text-green-600"
                            : "bg-yellow-200 text-yellow-600"
                        } rounded-full px-3 py-1 w-32 flex justify-center items-center`}
                      >
                        {b.status === "paid" ? <MdCheck /> : <MdClose />}{" "}
                        {b.status}
                      </span>
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className={`z-50 bg-white fixed top-0 left-0 w-screen h-screen delay-500 p-5 overflow-auto`}
        >
          <div className="flex gap-4 items-center justify-center">
            <button
              className="w-fit px-5 py-2 rounded-md bg-teal-700 text-teal-100 my-5 hover:bg-teal-600 shadow-md shadow-teal-500/50 transition-colors flex items-center gap-3"
              title={`Download payment status for ${data.month}`}
              onClick={handleDownloadPDF}
              disabled={load}
            >
              Download {load && <ClipLoader color="white" size={"1.5em"} />}
            </button>
            <button
              className="w-fit px-5 py-2 rounded-md bg-red-700 text-red-100 my-5 hover:bg-red-600 shadow-md shadow-red-500/50 transition-colors flex items-center gap-3"
              title={`Download payment status for ${data.month}`}
              onClick={(e) => setShowModal(false)}
            >
              Close
            </button>
          </div>
          <div
            ref={paymentSlip}
            className="grid gap-2 bg-white text-black inset-0 rounded-md p-2 border w-full max-w-screen-lg mx-auto h-full overflow-y-scroll"
          >
            <img
              className="aspect-square mx-10 mt-10"
              src={logo}
              alt="logo1"
              width={125}
              height={125}
            />

            <h2 className="font-bold text-4xl text-center">
              Payment Status in {data.month}
            </h2>
            <table className="table h-fit rounded-md w-full border border-black mx-auto">
              <thead className="table-header-group text-center">
                <tr>
                  <th className="border border-black" colSpan={2}>
                    PAYMENT DETAILS
                  </th>
                </tr>
              </thead>
              {/* BODY */}
              <tbody>
                <tr>
                  <td className="border border-black">Month</td>
                  <td className="border border-black">{data.month}</td>
                </tr>
                <tr>
                  <td className="border border-black">
                    Earning from IN-Store (QR-CODE) Booking
                  </td>
                  <td className="border border-black">
                    ${" "}
                    {isNaN(data.earned)
                      ? 0
                      : ((Number(data?.earned) * 38.095) / 100).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black">
                    Earning from ONLINE Booking
                  </td>
                  <td className="border border-black">
                    ${" "}
                    {isNaN(data.earned)
                      ? 0
                      : (
                          (Number(data?.earned) *
                            38.095 *
                            (data?.totalLuggageCount -
                              data?.qrCodeLuggageCount)) /
                          data?.totalLuggageCount /
                          100
                        ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="border border-black">Total Earning</th>
                  <th className="border border-black">
                    $ {convertToDollars(data?.earned)}
                  </th>
                </tr>
              </tfoot>
            </table>
            <div className="html2pdf__page-break"></div>
            <table className="h-fit rounded-md w-full border border-black">
              <thead className="table-header-group text-center">
                <tr>
                  <th className="border border-black py-3 bg-white" colSpan={6}>
                    BOOKING INFO
                  </th>
                </tr>
                <tr className="bg-gray-800 text-white">
                  <th className="p-2 border border-black">
                    {" "}
                    Booking Id (Luggage Count)
                  </th>
                  <th className="p-2 border border-black">
                    paymentAmount ($AUD)
                  </th>
                  <th className="p-2 border border-black">locationName</th>
                  <th className="p-2 border border-black">source</th>
                  <th className="p-2 border border-black">Status</th>
                </tr>
              </thead>
              {/* BODY */}
              <tbody className="text-center">
                {data?.bookings?.map((b, bid) => {
                  if (b.status == "paid")
                    return (
                      <>
                        <tr
                          className={`p-3 text-sm border border-black ${
                            bid % 2 == 0 ? "bg-gray-200" : "bg-gray-100"
                          } hover:bg-gray-800 hover:text-white`}
                          key={`booking_${bid}`}
                        >
                          <td className="border p-2 border-black">
                            {b.bookingId} ({b.luggageCount})
                          </td>

                          <td className="border p-2 border-black">
                            {b.paymentAmount}
                          </td>
                          <td className="border p-2 border-black">
                            {b.locationName}
                          </td>
                          <td className="border p-2 border-black">
                            {b.source == "qr_code" ? "QR CODE" : "ONLINE"}
                          </td>
                          <td className="flex justify-center items-center p-2">
                            <span
                              className={`${
                                b.status === "paid"
                                  ? "bg-green-200 text-green-600"
                                  : "bg-yellow-200 text-yellow-600"
                              } rounded-full px-3 py-1 w-32 flex justify-center items-center`}
                            >
                              <span>
                                {b.status === "paid" ? (
                                  <MdCheck />
                                ) : (
                                  <MdClose />
                                )}{" "}
                              </span>
                              <span>{b.status}</span>
                            </span>
                          </td>
                        </tr>
                        {bid > 20 && bid % 16 == 0 ? (
                          <div className="html2pdf__page-break"></div>
                        ) : (
                          bid > 10 &&
                          bid % 13 == 0 && (
                            <div className="html2pdf__page-break"></div>
                          )
                        )}
                      </>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button
        className="w-fit px-5 py-2 rounded-md bg-blue-700 text-blue-100 mx-auto my-5 hover:bg-blue-600 shadow-md shadow-blue-500/50 transition-colors"
        title={`Download payment status for ${data.month}`}
        onClick={() => setShowModal(true)}
      >
        Download Payment Status
      </button>
    </div>
  );
};
const PaymentDetailsByMonthL = ({ data, convertToDollars }) => {
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false);
  const paymentSlip = useRef(null);

  const handleDownloadPDF = () => {
    const paySlip = paymentSlip.current;

    const opt = {
      margin: 1,
      filename: "payment-slip-location.pdf",
      image: { type: "jpeg", quality: 0.98 },

      html2canvas: { scale: 4, dpi: 192, letterRendering: true },
      jsPDF: { unit: "cm", format: "a4", orientation: "landscape" },
    };
    try {
      setLoad(true);
      html2pdf().from(paySlip).set(opt).save();
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };
  return (
    <div className="flex-1 h-fit text-black">
      <div className="grid">
        <table className="table h-fit rounded-md overflow-hidden ring-2 ring-black">
          <thead className="table-header-group text-center">
            <tr>
              <th className="border border-black" colSpan={2}>
                PAYMENT DETAILS
              </th>
            </tr>
          </thead>
          {/* BODY */}
          <tbody>
            <tr>
              <td className="border border-black">Month</td>
              <td className="border border-black">{data.month}</td>
            </tr>
            <tr>
              <td className="border border-black">
                Earning from IN-Store (QR-CODE) Booking
              </td>
              <td className="border border-black">
                ${" "}
                {data.earned == 0
                  ? "0.00"
                  : ((Number(data?.earned) * 38.095) / 100).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border border-black">
                Earning from ONLINE Booking
              </td>
              <td className="border border-black">
                ${" "}
                {data.earned == 0
                  ? "0.00"
                  : (
                      (Number(data?.earned) *
                        38.095 *
                        (data?.totalLuggageCount - data?.qrCodeLuggageCount)) /
                      data?.totalLuggageCount /
                      100
                    ).toFixed(2)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th className="border border-black">Total Earning</th>
              <th className="border border-black">
                $ {convertToDollars(data?.earned)}
              </th>
            </tr>
          </tfoot>
        </table>

        <table className="h-fit rounded-md w-full ring-2 ring-black">
          <thead className="table-header-group text-center">
            <tr>
              <th className="border border-black py-3 bg-white" colSpan={6}>
                LOCATION INFO
              </th>
            </tr>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 border border-white">Location ID</th>
              <th className="p-2 border border-white">Location Name</th>
              <th className="p-2 border border-white">Total Bookings</th>
              <th className="p-2 border border-white">Earned ($AUD)</th>
            </tr>
          </thead>
          {/* BODY */}
          <tbody className="text-center">
            {data?.locationBreakdown?.map((b, bid) => {
              // if(b.status =='paid')
              return (
                <tr
                  className={`px-3  border border-black ${
                    bid % 2 == 0 ? "bg-gray-200" : "bg-gray-100"
                  } hover:bg-gray-800 hover:text-white`}
                  key={`location_${bid}`}
                >
                  <td className="border p-2 border-black">{bid + 1}</td>
                  <td className="border p-2 border-black">{b.locationName}</td>
                  <td className="border p-2 border-black">{b.bookings}</td>

                  <td className="flex justify-center items-center p-2">
                    {convertToDollars(b.earned)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className={`z-50 bg-white fixed top-0 left-0 w-screen h-screen delay-500 p-5 overflow-y-scroll`}
        >
          <div
            ref={paymentSlip}
            className="grid gap-5 bg-white text-black inset-0 rounded-md p-2 border w-full"
          >
            <img
              className="aspect-square mx-10 mt-10"
              src={logo}
              alt="logo1"
              width={125}
              height={125}
            />

            <h2 className="font-bold text-4xl text-center underline">
              Payment Status by Location in {data.month}
            </h2>
            <table className="table h-fit rounded-md w-full ring-2 ring-black">
              <thead className="table-header-group text-center">
                <tr>
                  <th className="border border-black" colSpan={2}>
                    PAYMENT DETAILS
                  </th>
                </tr>
              </thead>
              {/* BODY */}
              <tbody>
                <tr>
                  <td className="border border-black">Month</td>
                  <td className="border border-black">{data.month}</td>
                </tr>
                <tr>
                  <td className="border border-black">
                    Earning from IN-Store (QR-CODE) Booking
                  </td>
                  <td className="border border-black">
                    ${" "}
                    {isNaN(data.earned)
                      ? 0
                      : ((Number(data?.earned) * 38.095) / 100).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border border-black">
                    Earning from ONLINE Booking
                  </td>
                  <td className="border border-black">
                    ${" "}
                    {isNaN(data.earned)
                      ? 0
                      : (
                          (Number(data?.earned) *
                            38.095 *
                            (data?.totalLuggageCount -
                              data?.qrCodeLuggageCount)) /
                          data?.totalLuggageCount /
                          100
                        ).toFixed(2)}{" "}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="border border-black">Total Earning</th>
                  <th className="border border-black">
                    $ {convertToDollars(data?.earned)}
                  </th>
                </tr>
              </tfoot>
            </table>
            <div className="html2pdf__page-break"></div>
            <table className="h-fit rounded-md w-full ring-2 ring-black">
              <thead className="table-header-group text-center">
                <tr>
                  <th className="border border-black py-3 bg-white" colSpan={6}>
                    LOCATION INFO
                  </th>
                </tr>
                <tr className="bg-gray-800 text-white">
                  <th className="p-2 border border-white">Location ID</th>
                  <th className="p-2 border border-white">Location Name</th>
                  <th className="p-2 border border-white">Total Bookings</th>
                  <th className="p-2 border border-white">Earned ($AUD)</th>
                </tr>
              </thead>
              {/* BODY */}
              <tbody className="text-center">
                {data?.locationBreakdown?.map((b, bid) => {
                  return (
                    <tr
                      className={`px-3  border border-black ${
                        bid % 2 == 0 ? "bg-gray-200" : "bg-gray-100"
                      } hover:bg-gray-800 hover:text-white`}
                      key={`location_${bid}`}
                    >
                      <td className="border p-2 border-black">{bid + 1}</td>
                      <td className="border p-2 border-black">
                        {b.locationName}
                      </td>
                      <td className="border p-2 border-black">{b.bookings}</td>

                      <td className="flex justify-center items-center p-2">
                        {convertToDollars(b.earned)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 items-center ml-5">
            <button
              className="w-fit px-5 py-2 rounded-md bg-teal-700 text-teal-100 my-5 hover:bg-teal-600 shadow-md shadow-teal-500/50 transition-colors flex items-center gap-3"
              title={`Download payment status for ${data.month}`}
              onClick={handleDownloadPDF}
              disabled={load}
            >
              Download {load && <ClipLoader color="white" size={"1.5em"} />}
            </button>
            <button
              className="w-fit px-5 py-2 rounded-md bg-red-700 text-red-100 my-5 hover:bg-red-600 shadow-md shadow-red-500/50 transition-colors flex items-center gap-3"
              title={`Download payment status for ${data.month}`}
              onClick={(e) => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        className="w-fit px-5 py-2 rounded-md bg-blue-700 text-blue-100 mx-auto my-5 hover:bg-blue-600 shadow-md shadow-blue-500/50 transition-colors"
        title={`Download payment status for ${data.month}`}
        onClick={() => setShowModal(true)}
      >
        Download Payment Status
      </button>
    </div>
  );
};
