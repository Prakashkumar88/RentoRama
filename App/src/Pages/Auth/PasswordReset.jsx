import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== passwordConfirmation) {
      setMessage("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${BackendUrl}/user/reset-password/${id}/${token}`,
        {
          password,
          password_confirmation: passwordConfirmation,
        }
      );
      setMessage(response.data.message);
      if (response.data.status === "success") {
        navigate("/signin");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again later."
      );
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg overflow-hidden sm:rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className={message.includes("success") ? "text-green-600 mb-4" : "text-red-600 mb-4"}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 mb-5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your new password..."
                required
              />
            </div>
            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full p-2 border border-gray-300 mb-5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Confirm your new password..."
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-bold text-white bg-n-1 hover:bg-n-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
