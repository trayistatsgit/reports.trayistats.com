import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentDashboardData, fetchMonthWiseRevenue, fetchWeeklyRevenue } from '../../Slice/dashboardSlice';

const DashboardCards = React.lazy(() => import('../Dashboard/DashboardCards'));
const WeeklyRevenueChart = React.lazy(() => import('../Dashboard/WeeklyRevenueChart'));
const MonthlyRevenueChart = React.lazy(() => import('../Dashboard/MonthlyRevenueChart'));

const Dashboard = () => {
  const dispatch = useDispatch();

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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  const dashboardRecord = currentDashboardData.Records?.[0] || {};
  const monthWiseRevenueData = monthWiseRevenue.Records || [];
  const weeklyRevenueData = weeklyRevenue.Records?.[0] || {};

  return (
    <div className="flex h-screen">
      {/* Main content area */}
      <div className="flex-1 p-6 space-y-8 bg-gray-50">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Search bar */}
          <div className="w-full">
            <h className="text-3xl font-semibold mb-4">Trayistats Reports</h>
          </div>
        </div>

        {/* Dashboard Cards */}
        <Suspense fallback={<div className="text-center">Loading dashboard cards...</div>}>
          <DashboardCards
            totalParticipants={dashboardRecord.TotalParticipants || 0}
            completedParticipants={dashboardRecord.CompletedParticipants || 0}
            totalRevenue={dashboardRecord.TotalRevenue || 0}
            conversionRate={dashboardRecord.ConversionRate || 0}
          />
        </Suspense>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue Chart */}
          <Suspense fallback={<div className="text-center">Loading monthly revenue chart...</div>}>
            <MonthlyRevenueChart monthWiseRevenue={monthWiseRevenueData} />
          </Suspense>

          {/* Weekly Revenue Chart */}
          <Suspense fallback={<div className="text-center">Loading weekly revenue chart...</div>}>
            <WeeklyRevenueChart weeklyRevenue={weeklyRevenueData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
