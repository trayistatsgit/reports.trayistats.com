import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentDashboardData, fetchMonthWiseRevenue, fetchWeeklyRevenue } from '../../Slice/dashboardSlice';
import DashboardCards from '../Dashboard/DashboardCards';
import WeeklyRevenueChart from '../Dashboard/WeeklyRevenueChart';
import MonthlyRevenueChart from '../Dashboard/MonthlyRevenueChart';
import Sidebar from '../../Component/Dashboard/Sidebar';

const Dashboard = () => {
  const dispatch = useDispatch();

  // Fetching data from Redux store
  const currentDashboardData = useSelector((state) => state.dashboard.currentDashboardData);
  const monthWiseRevenue = useSelector((state) => state.dashboard.monthWiseRevenue);
  const weeklyRevenue = useSelector((state) => state.dashboard.weeklyRevenue);
  const status = useSelector((state) => state.dashboard.status);
  const error = useSelector((state) => state.dashboard.error);

  useEffect(() => {
    dispatch(fetchCurrentDashboardData());
    dispatch(fetchMonthWiseRevenue());
    dispatch(fetchWeeklyRevenue());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Extracting data from the API response
  const dashboardRecord = currentDashboardData.Records?.[0] || {};
  const monthWiseRevenueData = monthWiseRevenue.Records || [];
  const weeklyRevenueData = weeklyRevenue.Records?.[0] || {};

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none"
            />
            {/* <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">M</div>
              <div>
                <p className="text-sm">Myra</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="">
          <DashboardCards
            totalParticipants={dashboardRecord.TotalParticipants || 0}
            completedParticipants={dashboardRecord.CompletedParticipants || 0}
            totalRevenue={dashboardRecord.TotalRevenue || 0}
            conversionRate={dashboardRecord.ConversionRate || 0}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          {/* Monthly Revenue Chart */}
          <div className="">
            {/* <h3 className="text-lg font-bold mb-4">6 months survey</h3> */}
            <MonthlyRevenueChart monthWiseRevenue={monthWiseRevenueData} />
          </div>

          {/* Weekly Revenue Chart */}
          <div className="">
            {/* <h3 className="text-lg font-bold mb-4">Total Revenue</h3> */}
            <WeeklyRevenueChart weeklyRevenue={weeklyRevenueData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
