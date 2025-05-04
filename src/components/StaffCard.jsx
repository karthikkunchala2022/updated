import React from "react";
import { Link } from "react-router-dom";

function StaffCard({ staff }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white relative">
      <div className="flex items-center justify-between mb-2">
        <Link
          to={`/profile/${staff.id}`}
          className="text-lg font-semibold text-orange-600 hover:underline"
        >
          {staff.name}
        </Link>

        {staff.onLeave && (
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            On Leave
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700">
        <strong>Designation:</strong> {staff.designation}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Room No:</strong> {staff.roomNo}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Contact:</strong> {staff.contactNo}
      </p>
      {staff.onLeave && (
        <p className="text-xs text-gray-500 mt-1">
          Leave: {staff.leaveStart} - {staff.leaveEnd}
        </p>
      )}
    </div>
  );
}

export default StaffCard;
