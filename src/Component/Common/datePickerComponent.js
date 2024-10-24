import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';

const DatePickerComponent = ({ onDateChange }) => {
  const [selectedRange, setSelectedRange] = useState('Custom'); // Default to custom range
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Handle predefined date range selection
  const handleRangeSelection = (range) => {
    setSelectedRange(range);
    let start, end;
    const today = new Date();
    switch (range) {
      case 'Today':
        start = today;
        end = today;
        break;
      case '1 Week':
        start = subDays(today, 7);
        end = today;
        break;
      case '1 Month':
        start = subDays(today, 30);
        end = today;
        break;
      default:
        setStartDate(null);
        setEndDate(null);
        return;
    }
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end); // Notify parent component
  };

  // Handle custom date range change
  const handleCustomDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end);
    setSelectedRange('Custom'); // Mark as custom when manually selected
  };

  return (
    <div className="space-y-4">
      {/* Dropdown for Predefined Date Filters */}
      <div className="flex items-center space-x-4">
        <select
          value={selectedRange}
          onChange={(e) => handleRangeSelection(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="Custom">Custom</option>
          <option value="Today">Today</option>
          <option value="1 Week">Last 1 Week</option>
          <option value="1 Month">Last 1 Month</option>
        </select>

        {/* Custom Date Range Picker */}
        <DatePicker
          selected={startDate}
          onChange={handleCustomDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          isClearable
          maxDate={new Date()} // Disable future dates
          monthsShown={2} // Show two months side by side
          className="border border-gray-300 p-2 rounded-lg"
          placeholderText="Start date  →  End date"
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
