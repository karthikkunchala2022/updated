import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import iithLogo from "../assets/iith_logo.png"; // Ensure this path is correct

function LoginPage() {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // Dummy authentication logic
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (rollNumber === "test" && password === "1234") {
        navigate("/dashboard");
      } else {
        setError("Invalid roll number or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden font-['Montserrat']">
      {/* Background Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-orange-600 rounded-full z-0" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-orange-600 rounded-full z-0" />

      <div className="relative z-10 bg-white rounded-2xl shadow-xl w-[90%] max-w-5xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Login Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-orange-600 text-center mb-2">
              Dept. of CSE, IITH
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Log in to get in the Admin Module.
            </p>

            {error && (
              <div className="flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-md mb-4 text-sm">
                <FontAwesomeIcon icon={faTriangleExclamation} className="mr-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Roll Number */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Email"
                  disabled={isLoading}
                  className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  requiorange
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  disabled={isLoading}
                  className="w-full pl-11 pr-11 py-3 rounded-full border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  requiorange
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex="-1"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 text-white py-3 rounded-full font-semibold text-sm tracking-wide hover:bg-orange-700 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Branding */}
        <div className="flex-1 relative bg-gradient-to-br from-orange-500/60 to-orange-800/90 flex items-center justify-center p-10">
          <div className="text-center text-white z-10">
            <img
              src={iithLogo}
              alt="IIT Hyderabad Logo"
              className="w-20 mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold tracking-wide">CSE, IITH</h1>
            <p className="mt-2 text-sm opacity-90">Admin Module</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;