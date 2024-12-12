import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BackendUrl}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("Login Response:", response.data);

      // Assuming the backend returns a status of 200 upon successful login
      if (response.status === 200) {
        // Redirect to OTP page
        window.location.href = "/user";
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (display error message, etc.)
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg overflow-hidden sm:rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Welcome to RentoRama</h2>
        <p className="text-sm text-black-60 mb-4">
          Enter your credentials to access the account.
        </p>
        <form onSubmit={handleSubmit}>
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
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email..."
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your password..."
                autoComplete="current-password"
                required
              />
              <Link to="forgot-password">
                <p className="pt-1 text-blue-600">Forgot Password ?</p>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm font-bold text-white bg-n-1 hover:bg-n-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </button>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 font-medium">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
