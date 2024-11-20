import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSupplierData } from '../../Slice/supplierData';
import SupplierReconciliationChart from './SupplierReconciliationChart';

const SupplierDropdown = React.lazy(() => import('../Common/supplierList'));
const CustomerDropdown = React.lazy(() => import('../Common/customerList'));
const LanguageDropdown = React.lazy(() => import('../Common/languageList'));
const DatePickerComponent = React.lazy(() => import('../Common/datePickerComponent'));

const SupplierComponent = () => {
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const [selectedDateRange, setSelectedDateRange] = useState([startOfMonth, endOfMonth]);
  const [filters, setFilters] = useState({
    supplierName: '',
    customerName: '',
    lanCode: '',
    dateRange: [startOfMonth, endOfMonth],
  });

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.supplierData);

  useEffect(() => {
    console.log('Fetching supplier data with filters:', filters);
    dispatch(fetchSupplierData(filters));
  }, [dispatch, filters]);

  const handleDateChange = (start, end) => {
    setSelectedDateRange([start, end]);
    setFilters((prevFilters) => ({
      ...prevFilters,
      dateRange: [start, end],
    }));
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  // Group data by VendorName
  const groupedData = data?.Records?.reduce((acc, record) => {
    acc[record.VendorName] = acc[record.VendorName] || [];
    acc[record.VendorName].push(record);
    return acc;
  }, {});

  // Function to export CSV for a vendor
  const downloadCSV = (vendorName, records) => {
    const headers = [
      'VendorName',
      'PStatus',
      'PstatusName',
      'LangCode',
      'TotalStatusCount',
      'Percentage',
      'OverallConversionRate',
      'OverallTotalCount',
      'TotalParticipants',
    ];
    const csvContent = [
      headers.join(','), // CSV headers
      ...records.map((record) =>
        [
          record.VendorName,
          record.PStatus,
          record.PstatusName,
          record.LangCode,
          record.total_status_count,
          record.percentage,
          record.overall_conversion_rate,
          record.overall_total_count,
          record.total_participants,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${vendorName}_data.csv`;
    link.click();
  };

  // Function to get card background class based on value
  const getCardColor = (percentage) => {
    if (percentage >= 80) {
      return 'bg-green-100 border-green-500';
    } else if (percentage >= 50) {
      return 'bg-yellow-100 border-yellow-500';
    } else if (percentage > 0) {
      return 'bg-red-100 border-red-500';
    }
    return 'bg-gray-100 border-gray-300';
  };

  return (
    <div className="flex flex-col h-screen p-6 space-y-6">
      <div className="flex flex-wrap gap-6">
        <Suspense fallback={<div>Loading supplier dropdown...</div>}>
          <SupplierDropdown
            onChange={(selectedSupplier) =>
              handleFilterChange('supplierName', selectedSupplier || '')
            }
          />
        </Suspense>

        <Suspense fallback={<div>Loading customer dropdown...</div>}>
          <CustomerDropdown
            onChange={(selectedCustomer) =>
              handleFilterChange('customerName', selectedCustomer || '')
            }
          />
        </Suspense>

        <Suspense fallback={<div>Loading language dropdown...</div>}>
          <LanguageDropdown
            onChange={(selectedLang) =>
              handleFilterChange('lanCode', selectedLang || 4)
            }
          />
        </Suspense>
      </div>

      <div className="mt-4">
        <SupplierReconciliationChart data={data} />
      </div>

      <div className="mt-4">
        <Suspense fallback={<div>Loading date picker...</div>}>
          <DatePickerComponent onDateChange={handleDateChange} />
        </Suspense>
      </div>

      {loading && <div>Loading data...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      <div className="space-y-8 mt-6">
        {groupedData && Object.keys(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([vendorName, records]) => (
            <div key={vendorName}>
              {/* Vendor Header with Export Button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{vendorName}</h2>
                <button
                  onClick={() => downloadCSV(vendorName, records)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Export CSV
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* First Card: Overall Total Count and Overall Conversion Rate */}
                {records.length > 0 && (
                  <div className="border p-4 rounded shadow-sm bg-gray-50">
                    <h3 className="font-semibold">Overview</h3>
                    <p>
                      <strong>Overall Total Count:</strong>{' '}
                      {records[0].overall_total_count || 'N/A'}
                    </p>
                    <p>
                      <strong>Overall Conversion Rate:</strong>{' '}
                      {records[0].overall_conversion_rate || 'N/A'}%
                    </p>
                  </div>
                )}

                {/* Remaining Cards: Status, Count, and Percentage */}
                {records.map((record, index) => (
                  <div
                    key={index}
                    className={`border p-4 rounded shadow-sm hover:shadow-lg ${getCardColor(
                      record.percentage
                    )}`}
                  >
                    <p>
                      <strong>Status:</strong> {record.PStatus} - {record.PstatusName || 'N/A'}
                    </p>
                    <p>
                      <strong>Count:</strong> {record.total_status_count || 'N/A'}
                    </p>
                    <p>
                      <strong>Percentage:</strong> {record.percentage || 'N/A'}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No data available.</div>
        )}
      </div>
    </div>
  );
};

export default SupplierComponent;
