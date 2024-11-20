import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';

const DatePickerComponent = ({ onDateChange }) => {
  const [selectedRange, setSelectedRange] = useState('Custom');
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
        end = new Date(today);
        end.setDate(today.getDate() + 1);
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
        onDateChange(null, null);
        return;
    }
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end);
  };

  const handleCustomDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateChange(start, end);
    setSelectedRange('Custom');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="date-range-selector" className="text-sm font-medium">
          Select Range:
        </label>
        <select
          id="date-range-selector"
          value={selectedRange}
          onChange={(e) => handleRangeSelection(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="Custom">Custom</option>
          <option value="Today">Today</option>
          <option value="1 Week">Last 1 Week</option>
          <option value="1 Month">Last 1 Month</option>
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="custom-date-picker" className="text-sm font-medium">
          Custom Range:
        </label>
        <DatePicker
          id="custom-date-picker"
          selected={startDate}
          onChange={handleCustomDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          isClearable
          maxDate={new Date()} 
          monthsShown={2} 
          className="border border-gray-300 p-2 rounded-lg"
          placeholderText="Start date  →  End date"
        />
      </div>
    </div>
  );
};

export default DatePickerComponent;
