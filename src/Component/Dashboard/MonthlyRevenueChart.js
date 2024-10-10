import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyRevenueChart = ({ monthWiseRevenue }) => {
  // Array of month names for mapping
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Extracting the last 6 months and revenue data from the API response
  const lastSixMonthsData = monthWiseRevenue.slice(-6).sort((a, b) => a.Month - b.Month);
  const months = lastSixMonthsData.map(record => monthNames[record.Month - 1]); // Convert month number to month name
  const revenues = lastSixMonthsData.map(record => record.TotalRevenue);

  // Data configuration for the line chart
  const data = {
    labels: months, // Months will appear at the bottom of the chart
    datasets: [
      {
        label: 'Revenue',
        data: revenues,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.4, // Smooth curve effect
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Last 6 Months (Revenue)',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue',
        },
        ticks: {
          callback: function(value) {
            return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `$${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Monthly Revenue</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyRevenueChart;
