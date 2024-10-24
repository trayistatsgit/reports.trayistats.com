import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically register chart.js components
import { fetchSupplierReconciliationData } from '../../Slice/supplierReconciliationSlice'; // Import the slice action

const SupplierReconciliationChart = () => {
  const dispatch = useDispatch();

  // Access the supplier reconciliation state from Redux store
  const { data, loading, error } = useSelector((state) => state.supplierReconciliation);

  useEffect(() => {
    dispatch(fetchSupplierReconciliationData()); // Fetch the reconciliation data on component mount
  }, [dispatch]);

  // Prepare chart data
  const percentage = data?.ResponseData.Records[0]?.reconcile_percentage || 0; // Fallback to 0 if no data

  const chartData = {
    labels: ['Filled', 'Remaining'],
    datasets: [
      {
        label: 'Completion Percentage',
        data: [percentage, 100 - percentage],
        backgroundColor: ['#FFA500', '#E5E7EB'], // Orange and gray colors
        borderWidth: 0, // No border
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable aspect ratio to customize size
    circumference: 180, // Half doughnut
    rotation: -90, // Start from the top
    cutout: '80%', // Adjust to create a smaller doughnut hole
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips for simplicity
      },
      // Custom plugin to display percentage in the center
      centeredText: {
        id: 'centeredText',
        beforeDraw: (chart) => {
          const { ctx, chartArea } = chart;
          if (!chartArea) return;

          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;

          ctx.save();
          ctx.font = 'bold 12px Arial'; // Smaller font size
          ctx.fillStyle = '#000'; // Text color
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Display the actual percentage value
          ctx.fillText(`${percentage.toFixed(0)}%`, centerX, centerY); // Display percentage value
          ctx.restore();
        },
      },
    },
  };

  // Render the component
  return (
    <div className="w-full mx-auto mt-6">
      {loading ? (
        <div>Loading reconciliation data...</div>
      ) : error ? (
        <div>Error fetching data: {error}</div>
      ) : (
        <div className="relative w-24 h-24 ml-[23.5rem] mx-auto"> {/* Small chart with fixed size */}
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
