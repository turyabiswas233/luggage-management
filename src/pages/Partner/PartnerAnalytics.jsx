import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { LuAlertTriangle } from "react-icons/lu";
import { MdCheck, MdClose } from "react-icons/md";
import PartnerNavbarComp from "./PartnerNavbarComp";
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

const PartnerAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataToMonth, setDataToMonth] = useState(null);
  const [dataM, setDataM] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    axios
      .get(`${config.API_BASE_URL}/api/v1/analytics/my-earnings/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setDataM(
          response.data?.months?.sort((a, b) =>
            new Date(a?.monthStart).getTime() >
            new Date(b?.monthStart).getTime()
              ? 1
              : -1
          )
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // if (error) {
  //   return <div className="text-center mt-20 text-red-500">{error}</div>;
  // }

  // Convert earnings from cents to AUD dollars
  const convertToDollars = (amountInCents) =>
    ((38.095 / 100) * amountInCents).toFixed(2);
  // Prepare data for the graph

  const labels = data?.months?.map(
    (day, id) => months[new Date(day.month).getMonth()]
  );
  const amounts = data?.months
    ?.sort((a, b) =>
      new Date(a?.monthStart).getTime() > new Date(b?.monthStart).getTime()
        ? 1
        : -1
    )
    ?.map((day) => convertToDollars(day.earned));
  const qrCounts = data?.months
    ?.sort((a, b) =>
      new Date(a?.monthStart).getTime() > new Date(b?.monthStart).getTime()
        ? 1
        : -1
    )
    ?.map((day) => day.qrCodeLuggageCount);

  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "Earnings in this year ($AUD)",
        data: amounts,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.25,
        min: 0,
      },
      {
        label: "Total Booking IN-STORE (QR-CODE)",
        data: qrCounts,
        fill: false,
        backgroundColor: "#fa7f3f",
        borderColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.25,
        min: 0,
      },
    ],
  };

  // Calculate total pending earnings in dollars
  const totalEarnings = convertToDollars(data?.totalEarnings);
  const totalPendingEarnings = convertToDollars(data?.totalPending);

  console.log(dataM);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      {/* Navbar */}
      <PartnerNavbarComp />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 mt-32 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
            <h1 className="text-2xl font-bold mb-4 text-center">
              Partner Analytics
            </h1>
            {/* Total Earnings and Indicators */}
            <div className="flex justify-center items-center mb-8">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center underline underline-offset-2">
                  Total Completed Earnings by Partner
                </h2>
                <p className="text-xl font-semibold text-green-900">
                  Total Earned: $
                  <span className="text-3xl text-green-500">
                    {isNaN(totalEarnings) ? "0.00" : totalEarnings} AUD
                  </span>
                </p>
                <p className="text-xl font-semibold text-orange-900 hidden">
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

            {/* Graph Component */}
            {!data ? (
              <div className="text-center mt-20">No data available</div>
            ) : (
              <div className="my-8 w-full mx-auto max-w-screen-lg">
                <Bar className="w-full" data={graphData} />
              </div>
            )}

            {/* month picker */}
            <hr />
            <div className="w-full p-10 grid gap-4 mb-20">
              <h2 className="font-bold text-4xl text-center underline">
                Check Payment Status By Month
              </h2>
              <section className="p-2 h-fit grid gap-1 bg-white rounded-md ring ring-black">
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

              {dataToMonth ? (
                <PaymentDetailsByMonth
                  convertToDollars={convertToDollars}
                  data={dataToMonth}
                />
              ) : (
                <p className="bg-yellow-100 text-yellow-600 font-medium text-lg px-4 py-2 rounded-md border-2 border-yellow-500 flex items-center gap-2">
                  <LuAlertTriangle /> Please choose a month to view payment
                  status. You may see nothing if you choose a future month.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerAnalytics;

const PaymentDetailsByMonth = ({
  data = {
    month: "",
    earned: 0,
    totalLuggageCount: 0,
    qrCodeLuggageCount: 0,
    bookings: [
      {
        bookingId: "66dca85e065f6cc1ef873b03",
        status: "pending",
        paymentAmount: 31.5,
        luggageCount: 3,
        source: "online",
        locationId: "66dca020e467659f4bd5951b",
        locationName: "iit-du",
      },
    ],
  },
  convertToDollars,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [load, setLoad] = useState(false);
  const paymentSlip = useRef(null);

  const handleDownloadPDF = () => {
    const paySlip = paymentSlip.current;

    const opt = {
      margin: 1,
      filename: "payment-slip.pdf",
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
      <div className="grid overflow-x-auto">
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
                  : (
                      (Number(data?.earned) *
                        38.095 *
                        data?.qrCodeLuggageCount) /
                      100
                    ).toFixed(2)}
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
              <th className="border border-white"> bookingId</th>
              <th className="border border-white">luggageCount</th>
              <th className="border border-white">paymentAmount ($AUD)</th>
              <th className="border border-white">locationName</th>
              <th className="border border-white">source</th>
              <th className="border border-white">Status</th>
            </tr>
          </thead>
          {/* BODY */}
          <tbody className="text-center">
            {data?.bookings
              ?.filter((p) => p?.keyStorage?.isKeyStorage !== true)
              ?.map((b, bid) => {
                if (b?.status == "paid")
                  return (
                    <tr
                      className={`px-3 text-sm border border-black ${
                        bid % 2 == 0 ? "bg-gray-200" : "bg-gray-100"
                      } hover:bg-gray-800 hover:text-white`}
                      key={`booking_${bid}`}
                    >
                      <td className="border border-black">{b.bookingId}</td>
                      <td className="border border-black">{b.luggageCount}</td>
                      <td className="border border-black">{convertToDollars(b.paymentAmount)}</td>
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
          className={`z-50 bg-white fixed top-0 left-0 w-screen h-screen delay-500 p-5 overflow-y-scroll`}
        >
          <div className="flex gap-4 items-center mx-auto w-fit">
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
            className="grid gap-5 bg-white text-black inset-0 rounded-md p-2 border w-full overflow-x-auto max-w-4xl mx-auto"
          >
            <img
              className="aspect-square mx-10 mt-10"
              src={logo}
              alt="logo1"
              width={125}
              height={125}
            />

            <h2 className="font-bold text-4xl text-center underline">
              Payment Status in {data.month}
            </h2>
            <div className="table h-fit rounded-md w-full ring-2 ring-black">
              <div className="text-center">
                <p className="border border-black font-bold py-2">
                  PAYMENT DETAILS
                </p>
              </div>
              {/* BODY */}
              <div>
                <p className="grid grid-cols-3">
                  <span className="border border-black col-span-2">Month</span>
                  <span className="border border-black">{data.month}</span>
                </p>
                <p className="grid grid-cols-3">
                  <span className="border border-black col-span-2">
                    Earning from IN-Store (QR-CODE) Booking
                  </span>
                  <span className="border border-black">
                    {isNaN(data.earned)
                      ? 0
                      : (
                          (Number(data?.earned) *
                            38.095 *
                            data?.qrCodeLuggageCount) /
                          100
                        ).toFixed(2)}
                  </span>
                </p>
                <p className="grid grid-cols-3">
                  <span className="border border-black col-span-2">
                    Earning from ONLINE Booking
                  </span>
                  <span className="border border-black">
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
                  </span>
                </p>
              </div>
              <div>
                <p className="grid grid-cols-3">
                  <span className="border border-black col-span-2">
                    Total Earning
                  </span>
                  <span className="border border-black">
                    {convertToDollars(data?.earned)}
                  </span>
                </p>
              </div>
            </div>
            <div className="html2pdf__page-break"></div>
            <div className="h-fit rounded-md w-full border">
              <div className="text-center w-full">
                <p className="border border-black py-3 bg-white" colSpan={6}>
                  BOOKING INFO
                </p>

                <div className="bg-teal-800 text-white grid grid-cols-6 overflow-x-auto">
                  <p className="py-2 flex items-center justify-center">
                    {" "}
                    bookingId
                  </p>
                  <p className="py-2 flex items-center justify-center">
                    luggageCount
                  </p>
                  <p className="py-2 flex items-center justify-center">
                    paymentAmount ($AUD)
                  </p>
                  <p className="py-2 flex items-center justify-center">
                    locationName
                  </p>
                  <p className="py-2 flex items-center justify-center">
                    source
                  </p>
                  <p className="py-2 flex items-center justify-center">
                    Status
                  </p>
                </div>
              </div>
              {/* BODY */}
              <div className="text-center">
                {data?.bookings?.map((b, bid) => {
                  if (b?.status == "paid")
                    return (
                      <div
                        className={`grid grid-cols-6 text-sm border border-black`}
                        key={`booking_${bid}`}
                      >
                        <p className="py-2 overflow-hidden text-xs break-all">
                          {b.bookingId}
                        </p>
                        <p className="py-2">{b.luggageCount}</p>
                        <p className="py-2">{convertToDollars(b.paymentAmount)}</p>
                        <p className="py-2">{b.locationName}</p>
                        <p className="py-2">
                          {b.source == "qr_code" ? "QR CODE" : "ONLINE"}
                        </p>
                        <p className="flex justify-center items-center py-2">
                          <span
                            className={`${
                              b.status === "paid"
                                ? "bg-green-200 text-green-600"
                                : "bg-yellow-200 text-yellow-600"
                            } rounded-full px-3 py-1 w-32 flex justify-center items-center tracking-tight`}
                          >
                            {b.status}
                          </span>
                        </p>
                      </div>
                    );
                })}
              </div>
            </div>
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
