import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarRange } from 'lucide-react';

function DateRangePicker() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-xl border border-orange-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <CalendarRange className="text-orange-500" />
        <h2 className="text-2xl font-semibold text-gray-800">Select Date Range</h2>
      </div>

      {/* From Date */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700 font-medium">From:</label>
        <DatePicker
          selected={fromDate}
          onChange={(date) => {
            setFromDate(date);
            if (toDate && date > toDate) setToDate(null);
          }}
          selectsStart
          startDate={fromDate}
          endDate={toDate}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select start date"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* To Date */}
      <div className="mb-6">
        <label className="block mb-1 text-gray-700 font-medium">To:</label>
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          selectsEnd
          startDate={fromDate}
          endDate={toDate}
          minDate={fromDate}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select end date"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Display Selection */}
      {fromDate && toDate && (
        <div className="text-center text-gray-700">
          📅 Selected:{" "}
          <span className="text-orange-600 font-semibold">
            {fromDate.toDateString()} - {toDate.toDateString()}
          </span>
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
