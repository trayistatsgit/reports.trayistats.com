import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { fetchSupplierReconciliationData } from '../../Slice/supplierReconciliationSlice';

const SupplierReconciliationChart = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.supplierReconciliation);

  useEffect(() => {
    dispatch(fetchSupplierReconciliationData()); 
  }, [dispatch]);

  const percentage = data?.ResponseData.Records[0]?.reconcile_percentage || 0; 

  const chartData = {
    labels: ['Filled', 'Remaining'],
    datasets: [
      {
        label: 'Completion Percentage',
        data: [percentage, 100 - percentage],
        backgroundColor: ['#FFA500', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    circumference: 180,
    rotation: -90,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      centeredText: {
        id: 'centeredText',
        beforeDraw: (chart) => {
          const { ctx, chartArea } = chart;
          if (!chartArea) return;

          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;

          ctx.save();
          ctx.font = 'bold 12px Arial';
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          ctx.fillText(`${percentage.toFixed(0)}%`, centerX, centerY);
          ctx.restore();
        },
      },
    },
  };

  return (
    <div className="w-full mx-auto mt-6">
      {loading ? (
        <div>Loading reconciliation data...</div>
      ) : error ? (
        <div>Error fetching data: {error}</div>
      ) : (
        <div className="relative w-24 h-24 ml-[23.5rem] mx-auto">
          <h3 className="text-center text-sm font-bold">Reconciliation Last Month</h3>
          <Doughnut 
            data={chartData} 
            options={chartOptions} 
            plugins={[chartOptions.plugins.centeredText]} 
          />
        </div>
      )}
    </div>
  );
};

export default SupplierReconciliationChart;
