import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import "tailwindcss/tailwind.css";
import PartnerNavbarComp from "./PartnerNavbarComp";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import config from "../../config";

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
  const [data, setData] = useState({
    partnerId: "",
    totalEarnings: 0,
    totalPending: 0,
    months: [
      {
        month: "May 2024",
        monthStart: "2024-04-30T18:00:00.000Z",
        monthEnd: "2024-05-31T17:59:59.999Z",
        earned: 0,
        pending: 0,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  //     return <div className="text-center mt-20 text-red-500">{error}</div>;
  // }

  if (!data) {
    return <div className="text-center mt-20">No data available</div>;
  }

  // Convert earnings from cents to AUD dollars
  const convertToDollars = (amountInCents) =>
    ((38.095 / 100) * amountInCents).toFixed(2);

  // Prepare data for the graph
  const labels = data.months.map((day, id) =>
    id < 7 ? months[new Date(day.month).getMonth()] : null
  );
  const amounts = data.months.map((day) => convertToDollars(day.earned));
  const graphData = {
    labels: labels,
    datasets: [
      {
        label: "Earnings in Last 7 Months ($AUD)",
        data: amounts,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.25,
        min: 0,
      },
    ],
  };

  // Calculate total pending earnings in dollars
  const totalEarnings = convertToDollars(data.totalEarnings);
  const totalPendingEarnings = convertToDollars(data.totalPending);
  console.log(data);
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
                <h2 className="text-xl font-bold text-center underline underline-offset-2">Total Completed Earnings</h2>
                <p className="text-xl font-semibold text-green-900">
                  Total Earned: $<span className="text-3xl text-green-500">{totalEarnings} AUD</span>
                </p>
                <p className="text-xl font-semibold text-orange-900">
                  Total Pending: $<span className="text-3xl text-orange-500">{totalPendingEarnings} AUD</span>
                </p>
                
              </div>
            </div>

            {/* Graph Component */}
            <div className="mb-8">
              <Bar data={graphData} />
            </div>

            {/* Table Component */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg hidden">
              <table className="table-auto w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                    <th className="px-4 py-2">Amount (AUD)</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {data && (
                    <tr className="bg-white border-b">
                      <td className="px-4 py-2">
                        {new Date().toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        {new Date().toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        ${convertToDollars(data.totalEarnings)}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            //booking.status === "paid"
                            true
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          'PAID'
                        </span>
                      </td>
                      {/* <td className="px-4 py-2">{data.payment.method}</td> */}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerAnalytics;
