import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {

  const chartData = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
    ],
    datasets: [
      // Light blue bars for direct bookings
      {
        label: 'Direct Bookings',
        data: [
          300, 450, 500, 700, 800, 650, // Example data points
        ],
        backgroundColor: tailwindConfig().theme.colors.green[400], // Changed to green for visual distinction
        hoverBackgroundColor: tailwindConfig().theme.colors.green[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Dark blue bars for indirect bookings
      {
        label: 'Indirect Bookings',
        data: [
          200, 300, 400, 500, 600, 500, // Example data points
        ],
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Luggage Storage Bookings: Direct VS Indirect</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
