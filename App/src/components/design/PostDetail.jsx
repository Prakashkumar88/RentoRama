import React, { useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { TbManualGearbox } from "react-icons/tb";
import { FaRupeeSign, FaGasPump, FaUsers } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const PostDetail = ({
  UniqueId,
  imageUrl,
  title,
  model,
  type,
  price,
  fuel,
  seater,
  onClose,
  onOrderConfirm,
}) => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
    email: "",
    city: "",
    pinCode: "",
    address: "",
    confirmCredentials: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.confirmCredentials) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BackendUrl}/posts/submit-booking`,
          {
            postId: UniqueId,
            ...formData,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          onOrderConfirm();
          onClose();
        } else {
          console.error(response.data.message);
        }

        toast.success("Submitted successfully");
      } catch (error) {
        // console.error("Error submitting booking request:", error);
        toast.error("Error submitting booking request");
      } finally {
        setIsLoading(false);
      }
    } else {
      // alert("Please confirm all the credentials.");
      toast("Please confirm all the creadentials",{duration:2000, icon:"🪪"});
    }
  };

  const closeModal = (e) => {
    if (!modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-n-1 flex justify-between px-4 py-3 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-white">
                Please fill out the form
              </h3>
              <button
                onClick={onClose}
                className="font-bold place-self-end text-white"
              >
                <ImCross />
              </button>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex gap-4">
                <img
                  className="w-2/3 h-48 object-cover rounded-lg"
                  src={imageUrl}
                  alt={title}
                />
                <div className="flex flex-col justify-between w-2/3">
                  <h1 className="text-lg font-bold text-gray-700">{model}</h1>
                  <p className="text-gray-500 flex items-center">
                    <TbManualGearbox className="mr-1" /> {type}
                  </p>
                  <p className="text-gray-500 flex items-center">
                    <FaRupeeSign className="mr-1" /> {price} /hr
                  </p>
                  <p className="text-gray-500 flex items-center">
                    <FaGasPump className="mr-1" /> {fuel}
                  </p>
                  <p className="text-gray-500 flex items-center">
                    <FaUsers className="mr-1" /> {seater}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex gap-2">
                  <label className="block mb-4 w-1/2">
                    <span className="text-gray-700">First Name:</span>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </label>
                  <label className="block mb-4 w-1/2">
                    <span className="text-gray-700">Last Name:</span>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>
                </div>

                <div className="flex gap-2">
                  <label className="block mb-4 w-1/2">
                    <span className="text-gray-700">Phone Number:</span>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>
                  <label className="block mb-4 w-1/2">
                    <span className="text-gray-700">Age:</span>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>
                </div>

                <label className="block mb-4">
                  <span className="text-gray-700">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-gray-700">Address:</span>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </label>

                <div className="flex gap-2">
                  <label className="block mb-4 w-1/2">
                    <span className="text-gray-700">City:</span>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>
                  <label className="block mb-4 w-1/2">
                    <span className="text-gray-700">PIN/ZIP Code:</span>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <input
                      id="confirmCredentials"
                      name="confirmCredentials"
                      type="checkbox"
                      checked={formData.confirmCredentials}
                      onChange={handleCheckboxChange}
                      disabled={isLoading}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="confirmCredentials"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I confirm all the above credentials.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-n-1 focus:ring-n-3"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-n-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
