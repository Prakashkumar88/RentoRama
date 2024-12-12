import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const OTPPage = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [verificationMessage, setVerificationMessage] = useState("");
  const [resentMessage, setResentMessage] = useState("");
  const navigate = useNavigate();
  const otpInputs = useRef([]);

  const focusNextInput = (index) => {
    if (index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value && value.length === 1) {
      focusNextInput(index);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const otp = otpInputs.current.map((input) => input.value).join("");
      // Make API request to verify OTP
      const response = await axios.post(
        `${BackendUrl}/user/verify-email`,
        {
          otp,
        }
      );
      if (response.data.status === "success") {
        setVerificationMessage("Email verified successfully");
        // Redirect to login page after successful email verification
        navigate("/signin");
      } else if (response.data.message.includes("OTP expired")) {
        setVerificationMessage(response.data.message);
        setResentMessage(
          "A new OTP will be sent to your email in a few minutes."
        );
      } else {
        setVerificationMessage("Failed to verify email");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setVerificationMessage("Failed to verify email");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Verify Your Phone Number
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            A One-Time Password (OTP) has been sent to your mobile number and
            email. Please enter the OTP below to verify your phone number.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center space-x-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-16">
                  <input
                    ref={(el) => (otpInputs.current[index] = el)}
                    type="text"
                    name={`otp-${index}`}
                    id={`otp-${index}`}
                    maxLength={1}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    placeholder="0"
                    autoComplete="off"
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm font-bold text-white bg-n-1 hover:bg-n-4"
            >
              Verify OTP
            </button>
          </form>
          {verificationMessage && (
            <p className="text-sm text-gray-600 mt-4">{verificationMessage}</p>
          )}
        </div>
        <div className="bg-gray-100 py-3 px-6 border-t border-gray-200">
          {resentMessage ? (
            <p className="text-sm text-gray-600 text-center">{resentMessage}</p>
          ) : (
            <p className="text-sm text-gray-600 text-center">
              Didn't receive OTP? A new OTP will be sent after 10 minutes if the
              current one expires.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
