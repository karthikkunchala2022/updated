import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    designation: '',
    roomNo: '',
    email: '',
    areaOfInterest: '',
    contactNumber: '',
    payLevel: '',
    joiningDate: '',
    clLeaveBalance: '',
    coLeaveBalance: '',
    awards: '',
    recognitions: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/staff/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          designation: data.designation || '',
          roomNo: data.roomNo || '',
          email: data.email || '',
          areaOfInterest: data.areaOfInterest || '',
          contactNumber: data.contactNumber || '',
          payLevel: data.payLevel || '',
          joiningDate: data.joiningDate?.slice(0, 10) || '',
          clLeaveBalance: data.clLeaveBalance || '',
          coLeaveBalance: data.coLeaveBalance || '',
          awards: (data.awards || []).join(', '),
          recognitions: (data.recognitions || []).join(', '),
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch profile:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.designation.trim()) newErrors.designation = "Designation is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required.";

    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      awards: formData.awards.split(',').map(item => item.trim()).filter(Boolean),
      recognitions: formData.recognitions.split(',').map(item => item.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(`http://localhost:3000/staff/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");
      alert("Profile updated successfully.");
      navigate(`/profile/${id}`);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="pt-20 p-4 text-center">Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-orange-600 rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-orange-600 rounded-full z-0 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">Edit My Profile</h1>

          <div className="space-y-4">
            {[
              { label: 'Designation', name: 'designation', required: true },
              { label: 'Room No', name: 'roomNo' },
              { label: 'Email', name: 'email', type: 'email', required: true },
              { label: 'Area of Interest', name: 'areaOfInterest' },
              { label: 'Contact Number', name: 'contactNumber', required: true },
              { label: 'Pay Level', name: 'payLevel' },
              { label: 'Joining Date', name: 'joiningDate', type: 'date' },
              { label: 'CL Leave Balance', name: 'clLeaveBalance', type: 'number' },
              { label: 'CO Leave Balance', name: 'coLeaveBalance', type: 'number' },
              { label: 'Awards (comma separated)', name: 'awards' },
              { label: 'Recognitions (comma separated)', name: 'recognitions' },
            ].map(({ label, name, type = 'text', required }) => (
              <div key={name}>
                <label className="block mb-1 font-medium text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={`w-full p-2 border ${
                    errors[name] ? 'border-red-500' : 'border-gray-300'
                  } rounded focus:outline-none focus:ring-2 focus:ring-orange-400`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
