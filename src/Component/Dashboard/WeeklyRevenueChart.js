import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const WeeklyRevenueChart = ({ weeklyRevenue }) => {
    const percentage = (weeklyRevenue.CurrentWeekRevenue / weeklyRevenue.LastWeekRevenue) * 100 || 0;

    // Data for Doughnut chart (circular progress)
    const data = {
        datasets: [
            {
                label: 'Revenue Progress',
                data: [percentage, 100 - percentage],
                backgroundColor: ['#4CAF50', '#FF6347'],
                hoverBackgroundColor: ['#4CAF50', '#FF6347'],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        cutout: '80%',
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
        },
    };

    return (
        <div className="bg-[#F1F1F1] p-6 rounded-lg shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">Total Revenue</h3>

            {/* Circular Progress (Doughnut Chart) */}
            <div className="relative w-32 mx-auto mb-4">
                <Doughnut data={data} options={options} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">{Math.round(percentage)}%</span>
                </div>
            </div>

            {/* Total Sales */}
            <div className="text-center mb-4">
                <h4 className="text-gray-500">Current Week</h4>
                <p className="text-2xl font-bold">${weeklyRevenue.CurrentWeekRevenue || 0}</p>
                {/* <p className="text-xs text-gray-400">Previous transactions processing. Last payments may not be included.</p> */}
            </div>

            {/* Last Week and Last Month Revenue */}
            <div className="flex justify-between text-sm">
                <div className="text-center">
                    <p>Last Week</p>
                    <p className="text-green-500 font-bold">${weeklyRevenue.LastWeekRevenue || 0}</p>
                </div>
                <div className="text-center">
                    <p>Revenue Difference</p>
                    <p className={weeklyRevenue.RevenueDifference < 0 ? 'text-red-500 font-bold' : 'text-green-500 font-bold'}>
                        ${weeklyRevenue.RevenueDifference || 0}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WeeklyRevenueChart;
