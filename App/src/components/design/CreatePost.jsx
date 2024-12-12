import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import { locations } from "../../constants";

const CreatePost = ({ onClose, onOrderConfirm }) => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    carImage: null,
    model: "",
    carPrice: "",
    carTransmission: "",
    carFuel: "",
    carCapacity: "",
    district: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({
        ...formData,
        carImage: file,
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      // alert("Please select a valid image file.");
      // toast.loading('Please select a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("carImage", formData.carImage);
    formDataObj.append("model", formData.model);
    formDataObj.append("carPrice", formData.carPrice);
    formDataObj.append("carTransmission", formData.carTransmission);
    formDataObj.append("carFuel", formData.carFuel);
    formDataObj.append("carCapacity", formData.carCapacity);
    formDataObj.append("district", formData.district);

    try {
      const response = await axios.post(
        `${BackendUrl}/posts/create-post`,
        formDataObj,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Car uploaded successfully:", response.data);
      setLoading(false);
      onOrderConfirm();
      onClose();
      toast.success('Car uploaded successfully');
    } catch (error) {
      // console.error("Error uploading car:", error);
      toast.error('Error uploading car');
      setLoading(false);
    }
  };

  const closeModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-4">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["black"]}
          />
        </div>
      ) : (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              ref={modalRef}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-n-1 flex justify-between px-4 py-3 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-white">
                    Upload Car Details
                  </h3>
                  <button
                    onClick={onClose}
                    className="font-bold place-self-end text-white"
                  >
                    <ImCross />
                  </button>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <label className="block mb-4">
                    <span className="text-gray-700">Car Image:</span>
                    <input
                      type="file"
                      name="carImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-green-500
                  hover:file:bg-violet-100"
                    />
                    {imagePreview && (
                      <div className="mt-4">
                        <img
                          src={imagePreview}
                          alt="Selected Car"
                          className="max-w-full h-auto rounded-md"
                        />
                      </div>
                    )}
                  </label>

                  <label className="block mb-4">
                    <span className="text-gray-700">Car Name:</span>
                    <input
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>

                  <label className="block mb-4">
                    <span className="text-gray-700">Price per day:</span>
                    <input
                      type="number"
                      name="carPrice"
                      value={formData.carPrice}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block">
                        <span className="text-gray-700">Transmission:</span>
                        <select
                          name="carTransmission"
                          value={formData.carTransmission}
                          onChange={handleChange}
                          required
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        >
                          <option value="">Select Transmission</option>
                          <option value="automatic">Automatic</option>
                          <option value="manual">Manual</option>
                          <option value="semiautomatic">Semi-Automatic</option>
                        </select>
                      </label>
                    </div>
                    <div>
                      <label className="block">
                        <span className="text-gray-700">Fuel Type:</span>
                        <select
                          name="carFuel"
                          value={formData.carFuel}
                          onChange={handleChange}
                          required
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        >
                          <option value="">Select Fuel Type</option>
                          <option value="diesel">Diesel</option>
                          <option value="petrol">Petrol</option>
                          <option value="electric">Electric</option>
                          <option value="cng">CNG</option>
                          <option value="hybrid">Hybrid</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <label className="block mb-4">
                    <span className="text-gray-700">District:</span>
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="">Select District</option>
                      {locations.map((local) => (
                        <option key={local.id} value={local.place}>
                          {local.place}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block mb-4">
                    <span className="text-gray-700">Seating Capacity:</span>
                    <input
                      type="number"
                      name="carCapacity"
                      value={formData.carCapacity}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </label>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-n-1 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-n-3 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Upload Ads
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
      )}
    </>
  );
};

export default CreatePost;
