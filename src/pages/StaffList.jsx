import React from "react";
import StaffCard from "../components/StaffCard";

const staffProfiles = [
  {
    id: 1,
    name: "Ravi Teja",
    designation: "Administrative Officer",
    roomNo: "C-103",
    contactNo: "9876543210",
    onLeave: true,
    leaveStart: "Apr 28, 2025",
    leaveEnd: "May 5, 2025",
  },
  {
    id: 2,
    name: "Anjali Mehra",
    designation: "Office Assistant",
    roomNo: "B-204",
    contactNo: "9123456789",
    onLeave: false,
  },
  {
    id: 3,
    name: "Suresh Reddy",
    designation: "Technical Staff",
    roomNo: "Lab-2",
    contactNo: "9988776655",
    onLeave: true,
    leaveStart: "Apr 30, 2025",
    leaveEnd: "May 4, 2025",
  },
];

function StaffList() {
  return (
    <div className="p-6 pt-20">
      <h1 className="title mb-6">All Staff Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffProfiles.map((staff) => (
          <StaffCard key={staff.id} staff={staff} />
        ))}
      </div>
    </div>
  );
}

export default StaffList;
