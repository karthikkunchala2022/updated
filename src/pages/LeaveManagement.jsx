import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { CalendarRange, Pencil, Trash2, Check, X } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

function LeaveManagement() {
  const staffList = [
    "Dr. A. Sharma",
    "Prof. B. Kumar",
    "Ms. C. Verma",
    "Mr. D. Singh",
    "Mrs. E. Patel",
  ];

  const [staffName, setStaffName] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [leaves, setLeaves] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editFrom, setEditFrom] = useState(null);
  const [editTo, setEditTo] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAddLeave = (e) => {
    e.preventDefault();
    if (!staffName || !fromDate || !toDate) return;
    setLeaves([...leaves, { staffName, from: fromDate, to: toDate }]);
    setStaffName("");
    setFromDate(null);
    setToDate(null);
  };

  const handleEditInit = (idx) => {
    setEditingIndex(idx);
    setEditFrom(new Date(leaves[idx].from));
    setEditTo(new Date(leaves[idx].to));
  };

  const handleEditConfirm = () => {
    const updated = [...leaves];
    updated[editingIndex] = { ...updated[editingIndex], from: editFrom, to: editTo };
    setLeaves(updated);
    setEditingIndex(null);
  };

  const handleDelete = () => {
    setLeaves((prev) => prev.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-orange-600 rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-orange-600 rounded-full z-0 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 mt-[80px] mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-orange-200 p-6 sm:p-8">
          {/* Heading */}
          <div className="flex items-center gap-2 mb-6">
            <CalendarRange className="text-orange-500 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">Leave Management</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleAddLeave} className="space-y-6">
            {/* Staff Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Staff</label>
              <select
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400"
                required
              >
                <option value="">-- Select Staff --</option>
                {staffList.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <DatePicker
                  selected={fromDate}
                  onChange={(date) => {
                    setFromDate(date);
                    if (toDate && date > toDate) setToDate(null);
                  }}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  placeholderText="Start date"
                  dateFormat="MMMM d, yyyy"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  selectsEnd
                  startDate={fromDate}
                  endDate={toDate}
                  minDate={fromDate}
                  placeholderText="End date"
                  dateFormat="MMMM d, yyyy"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
              >
                Add Leave
              </button>
            </div>
          </form>

          {/* List of Leaves */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Leave Records</h3>
            {leaves.length === 0 ? (
              <p className="text-gray-500 italic">No leave records found.</p>
            ) : (
              <div className="space-y-4">
                {leaves.map((leave, idx) => (
                  <div key={idx} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <h4 className="text-lg font-medium text-gray-800">{leave.staffName}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(leave.from).toDateString()} –{" "}
                          {new Date(leave.to).toDateString()}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        {editingIndex === idx ? (
                          <>
                            <button
                              onClick={handleEditConfirm}
                              className="text-green-600 hover:text-green-800"
                              title="Save"
                            >
                              <Check size={20} />
                            </button>
                            <button
                              onClick={() => setEditingIndex(null)}
                              className="text-gray-600 hover:text-gray-800"
                              title="Cancel"
                            >
                              <X size={20} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditInit(idx)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <Pencil size={20} />
                            </button>
                            <button
                              onClick={() => setDeleteIndex(idx)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <Trash2 size={20} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Inline Edit */}
                    {editingIndex === idx && (
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">From:</label>
                          <DatePicker
                            selected={editFrom}
                            onChange={(date) => {
                              setEditFrom(date);
                              if (editTo && date > editTo) setEditTo(null);
                            }}
                            selectsStart
                            startDate={editFrom}
                            endDate={editTo}
                            dateFormat="MMMM d, yyyy"
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                          <DatePicker
                            selected={editTo}
                            onChange={(date) => setEditTo(date)}
                            selectsEnd
                            startDate={editFrom}
                            endDate={editTo}
                            minDate={editFrom}
                            dateFormat="MMMM d, yyyy"
                            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-orange-400"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation */}
        {deleteIndex !== null && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h4 className="text-lg font-semibold mb-2">Delete Leave</h4>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete leave for{" "}
                <strong>{leaves[deleteIndex].staffName}</strong>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteIndex(null)}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaveManagement;
