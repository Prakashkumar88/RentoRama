import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Send request to backend API to send password reset email
      const response = await axios.post(
        `${BackendUrl}/user/reset-password-link`,
        { email }
      );
      setSuccessMessage(response.data.message);
    } catch (error) {
      setError("Failed to send reset password email. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg overflow-hidden sm:rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-600 mb-4">{successMessage}</p>
        )}
        {!successMessage && (
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 mb-5 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your email..."
                  autoComplete="email"
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
                {loading ? "Sending..." : "Reset Password"}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link to="/signin" className="text-blue-600 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
