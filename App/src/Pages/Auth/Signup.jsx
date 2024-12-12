import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
    dob: "",
    phoneNumber: "",
    drivingLicense: "",
    aadhaarCard: "",
    agreed: false,
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    drivingLicense: "",
    aadhaarCard: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: val });

    // Validation logic
    if (name === "phoneNumber") {
      const isValid = /^\d{10}$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: isValid ? "" : "Phone number must be exactly 10 digits.",
      }));
    }

    if (name === "aadhaarCard") {
      const isValid = /^\d{12}$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        aadhaarCard: isValid ? "" : "Aadhaar card number must be exactly 12 digits.",
      }));
    }

    if (name === "drivingLicense") {
      const isValid = /^[A-Z]{2}\d{13}$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        drivingLicense: isValid ? "" : "Driving license number must follow the format AA1234567891234.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      try {
        const response = await axios.post(`${BackendUrl}/user/register`, formData);
        if (response.data.status === "success") {
          navigate("/account/verify-email");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  const {
    name,
    surname,
    email,
    password,
    password_confirmation,
    dob,
    phoneNumber,
    drivingLicense,
    aadhaarCard,
    agreed,
  } = formData;

  const isButtonDisabled = !(
    name &&
    surname &&
    email &&
    password &&
    password_confirmation &&
    dob &&
    phoneNumber &&
    drivingLicense &&
    aadhaarCard &&
    agreed &&
    !errors.phoneNumber &&
    !errors.drivingLicense &&
    !errors.aadhaarCard
  );

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center pt-7">
      <div className="max-w-[90%] md:max-w-[50%] w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to RentoRama
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Please fill out the form below to create an account.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your name..."
                    autoComplete="given-name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    value={surname}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your surname..."
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your email..."
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-rose-700">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your password..."
                  autoComplete="new-password"
                  required
                />
              </div>
              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-rose-700">*</span>
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  value={password_confirmation}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Confirm your password..."
                  autoComplete="new-password"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth <span className="text-rose-700">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={dob}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoComplete="bday"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-rose-700">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your phone number..."
                    autoComplete="tel"
                    maxLength={10}
                    required
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700 mb-1">
                  Driving License <span className="text-rose-700">*</span>
                </label>
                <input
                  type="text"
                  name="drivingLicense"
                  id="drivingLicense"
                  value={drivingLicense}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your driving license number..."
                  autoComplete="id-number"
                  maxLength={15}
                  required
                />
                {errors.drivingLicense && (
                  <p className="text-red-600 text-sm mt-1">{errors.drivingLicense}</p>
                )}
              </div>
              <div>
                <label htmlFor="aadhaarCard" className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Card <span className="text-rose-700">*</span>
                </label>
                <input
                  type="text"
                  name="aadhaarCard"
                  id="aadhaarCard"
                  value={aadhaarCard}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter your Aadhaar card number..."
                  autoComplete="id-number"
                  maxLength={12}
                  required
                />
                {errors.aadhaarCard && (
                  <p className="text-red-600 text-sm mt-1">{errors.aadhaarCard}</p>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreed"
                  id="agreed"
                  checked={agreed}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  required
                />
                <p className="ml-2 text-sm text-gray-600">
                  I agree with the{" "}
                  <span className="text-blue-600">Terms and Conditions</span>
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-n-1 text-white font-semibold rounded-md hover:bg-n-3 disabled:bg-gray-400"
                disabled={isButtonDisabled}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
