import React from 'react';

const Dashboard = () => {
  // Static data for the cards
  const stats = [
    { title: 'USER', count: 100, percentage: '20%', action: 'See all users' },
    { title: 'ORDERS', count: 100, percentage: '20%', action: 'View all orders' },
    { title: 'EARNINGS', count: '$100', percentage: '20%', action: 'View net earnings' },
    { title: 'BALANCE', count: '$100', percentage: '20%', action: 'See details' },
  ];

  return (
    <div className="p-8">
      {/* Top Stats Section */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded hover:bg-blue-100 cursor-pointer"
          >
            <h3 className="text-xl font-bold">{stat.title}</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="text-2xl">{stat.count}</p>
              <span className="text-green-500">↑ {stat.percentage}</span>
            </div>
            <button className="mt-4 text-blue-500">{stat.action}</button>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Revenue Section */}
        <div className="bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-bold">Total Revenue</h3>
          <div className="flex items-center justify-between mt-4">
            <div className="relative w-24 h-24">
              {/* Circular Progress Placeholder */}
              <div
                className="absolute inset-0 w-full h-full rounded-full bg-blue-500"
                style={{ clip: 'rect(0, 48px, 48px, 24px)', transform: 'rotate(252deg)' }}
              ></div>
              <div className="absolute inset-0 w-full h-full rounded-full border-4 border-gray-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl">70%</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-2xl font-bold">$420</p>
              <p className="text-gray-500">Total sales made today</p>
            </div>
          </div>
          <p className="mt-4 text-gray-500">
            Previous transactions processing. Last payments may not be included.
          </p>
        </div>

        {/* Revenue Chart (Last 6 Months) */}
        <div className="bg-white shadow-md p-6 rounded">
          <h3 className="text-lg font-bold">Last 6 Months (Revenue)</h3>
          <div className="mt-4">
            {/* Line Chart Placeholder */}
            <svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" strokeWidth="2">
                <path
                  d="M10 180 Q 80 120, 150 140 T 290 100 T 430 180 T 570 140"
                  stroke="#60A5FA"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
