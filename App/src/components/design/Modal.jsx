import React, { useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaArrowRight, FaRupeeSign } from "react-icons/fa";
import { CAR_DATA } from "../../constants/index.js";

const Modal = ({ onClose, onOrderConfirm, car }) => {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    address: "",
    phoneNumber: "",
    email: "",
    confirmCredentials: false,
  });

  const carDetails = CAR_DATA.flat().find((carData) => carData.name === car[0]);

  console.log(car)

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.confirmCredentials) {
      console.log("Form submitted with data:", formData);
      onOrderConfirm();
      onClose();
    } else {
      alert("Please confirm all the credentials.");
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
      className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md max-h-full">
        <div className="flex justify-between rounded items-center bg-n-1 text-white px-4 py-3">
          <h3 className="text-lg font-medium">
            {carDetails ? carDetails.name : "Car Details"}
          </h3>
          <button onClick={onClose}>
            <ImCross className="text-xl" />
          </button>
        </div>
        <div className="p-2 overflow-y-auto max-h-[80vh]">
          {carDetails && (
            <div className="flex justify-center">
              <img
                src={carDetails.img}
                alt={carDetails.name}
                className="w-2/3 h-full rounded-lg m-4"
              />
              <div className="gap-4 mb-4">
                <div>
                  <p className="text-gray-700 font-semibold">Model:</p>
                  <p>{carDetails.model}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Year:</p>
                  <p>{carDetails.year}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Seats:</p>
                  <p>{carDetails.seats}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">AC:</p>
                  <p>{carDetails.air}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Transmission:</p>
                  <p>{carDetails.transmission}</p>
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">Fuel Type:</p>
                  <p>{carDetails.fuel}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-n-1 rounded-md">
            <h6 className="text-center font-bold h6 text-white">
              Person Details
            </h6>
          </div>

          <div className="flex justify-between m-4">
            <p className="text-gray-700 font-bold">{car[1]}</p>
            {car[1]&&<FaArrowRight className="h-5"/>}
            <p className="text-gray-700 font-bold">{car[2]}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-700 flex font-semibold mb-2 gap-1">
                Cost: <FaRupeeSign className="mt-1" /> {carDetails.price} / hr
              </label>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-semibold mb-2"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Your Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-offset-2 focus:ring-n-3"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-semibold mb-2"
              >
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-offset-2 focus:ring-n-3"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-offset-2 focus:ring-n-3"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="confirmCredentials"
                name="confirmCredentials"
                checked={formData.confirmCredentials}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor="confirmCredentials" className="text-gray-700">
                Confirm Credentials
              </label>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-n-1 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-n-3 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Submit
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-n-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default Modal;
