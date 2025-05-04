import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ViewProfile({ role = "staff" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/staff/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="pt-20 p-4 text-center">Loading...</div>;
  if (!profileData) return <div className="pt-20 p-4 text-center">No profile found.</div>;

  return (
    <div className="p-4 pt-20 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-600 text-center sm:text-left">
        Staff Profile
      </h1>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 space-y-5 text-sm sm:text-base">

        {/* Basic Info */}
        <div className="space-y-3">
          <div><strong>Name:</strong> {profileData.name}</div>
          <div><strong>Designation:</strong> {profileData.designation}</div>
          <div><strong>Room No:</strong> {profileData.roomNo}</div>
          <div className="break-words"><strong>Email:</strong> {profileData.email}</div>
          <div><strong>Area of Interest:</strong> {profileData.areaOfInterest}</div>
          <div><strong>Contact Number:</strong> {profileData.contactNumber}</div>

          {/* Awards */}
          <div>
            <strong>Awards:</strong>
            {profileData.awards && profileData.awards.length > 0 ? (
              <ul className="list-disc ml-6 mt-1">
                {profileData.awards.map((award, idx) => (
                  <li key={idx}>{award}</li>
                ))}
              </ul>
            ) : (
              <span className="ml-1 text-gray-500">None</span>
            )}
          </div>

          {/* Recognitions */}
          <div>
            <strong>Recognitions:</strong>
            {profileData.recognitions && profileData.recognitions.length > 0 ? (
              <ul className="list-disc ml-6 mt-1">
                {profileData.recognitions.map((recog, idx) => (
                  <li key={idx}>{recog}</li>
                ))}
              </ul>
            ) : (
              <span className="ml-1 text-gray-500">None</span>
            )}
          </div>
        </div>

        {/* Staff/Admin Specific Info */}
        {(role === "staff" || role === "admin") && (
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div><strong>Pay Level:</strong> Level {profileData.payLevel}</div>
            <div><strong>Joining Date:</strong> {new Date(profileData.joiningDate).toLocaleDateString()}</div>
            <div><strong>CL Leave Balance:</strong> {profileData.clLeaveBalance}</div>
            <div><strong>CO Leave Balance:</strong> {profileData.coLeaveBalance}</div>
          </div>
        )}

        {/* Leave Status (Placeholder) */}
        <div className="pt-4 border-t border-gray-200">
          <div className="font-semibold">
            Current Leave Status:
            <span className="ml-2 px-2 py-1 rounded inline-block mt-2 sm:mt-0 bg-green-100 text-green-600">
              Available
            </span>
          </div>
        </div>

        {/* Task History (Placeholder) */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold mb-2">Task History</h2>
          <p className="text-gray-500">No task history available.</p>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
