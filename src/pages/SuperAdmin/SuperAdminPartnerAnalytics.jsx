import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import SuperAdminSidebar from "../../partials/SuperAdminSidebar";
import SuperAdminHeader from "../../partials/SuperAdminHeader";
import WelcomeBanner from "../../partials/dashboard/WelcomeBanner";
import config from "../../config";

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
  const [errMsg, setErrMsg] = useState("");

  // superadmin monthly earning
  const getChartDataAdminMonth = () => {
    return {
      labels: adminEarning?.monthlyEarnings?.map((p) => p.period) || [],
      datasets: [
        {
          label: "Average Monthly Earnings by Super Admin",
          data:
            adminEarning?.monthlyEarnings?.map((p) => p.totalEarnings) || [],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
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
          label: "Average Monthly Earnings by Partners",
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
          console.log(res);
          if (res.data.success) setAdminEarning(res?.data?.data);
          else {
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

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = partners.slice(
    indexOfFirstPartner,
    indexOfLastPartner
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(errMsg);
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

            {/* Partner Analytics Table */}
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

            {/* Partner Analytics Graph */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Bar
                data={getChartData()}
                options={{ responsive: true, maintainAspectRatio: false }}
                height={500}
              />
            </div>
            {adminEarning && (
              <div className="grid grid-cols-2 gap-5 my-5">
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

                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <Bar
                    data={getChartDataAdminDays()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                    }}
                    height={500}
                  />
                </div>
              </div>
            )}
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
