import React, { useState, useEffect } from "react";
import { bookData } from "../constants";
import Modal from "./design/Modal.jsx";
import * as Icons from "@tabler/icons-react";

const BookCar = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    carType: "",
    pickUpLocation: "",
    dropOffLocation: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [message, setMessage] = useState(false);


  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showModal]);

  const handleOptionChange = (option, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: value,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (orderConfirmed) {
      setOrderConfirmed(true);
      setTimeout(() => setOrderConfirmed(false), 2000);
    }
  };

  const handleSearch = () => {
    const allFieldsEmpty = Object.values(selectedOptions).every(
      (option) => option === ""
    );

    if (allFieldsEmpty) {
      setMessage(true);
      setTimeout(() => setMessage(false), 3000);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        id="booking-section"
        className="container relative p-12 bg-white drop-shadow-2xl rounded-md z-1 mx-auto mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]"
      >
        <h3 className="pb-5 font-text font-bold text-2xl">Book a car</h3>
        <div className="mb-5">
          {message && (
            <p className="text-red-500 bg-red-200 rounded-md text-center h6">
              All fields are required.
            </p>
          )}
          {orderConfirmed && (
            <p className="text-green-500 bg-green-200 rounded-md text-center h6 ">
              Order received. Check your email for confirmation.
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-2">
          {bookData.map((entry) =>
            entry.id >= 3 ? (
              <div key={entry.id}>
                <div className="col-span-3 md:col-span-1 flex flex-col">
                  <div>
                    {entry.icon &&
                      React.createElement(Icons[entry.icon], {
                        className: "input-icon mr-2",
                      })}
                  </div>
                  <h2 className="font-bold">
                    {entry.text}
                    <b className="text-orange-700">*</b>
                  </h2>
                  <input
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    type="Date"
                  />
                </div>
              </div>
            ) : (
              <div
                key={entry.id}
                className="col-span-3 md:col-span-1 flex flex-col"
              >
                <div>
                  {entry.icon &&
                    React.createElement(Icons[entry.icon], {
                      className: "input-icon mr-2",
                    })}
                </div>
                <h2 className="font-bold">
                  {entry.text}
                  <b className="text-orange-700">*</b>
                </h2>
                <select
                  value={selectedOptions[entry.id]}
                  onChange={(e) => handleOptionChange(entry.id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {entry.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            )
          )}
          <button
            className="bg-n-1 rounded-md py-5 px-5 self-end border-none font-text font-bold text-white shadow-md cursor-pointer transition duration-300 hover:shadow-2xl"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={handleModalClose}
          onOrderConfirm={() => setOrderConfirmed(true)}
          car={selectedOptions}
        />
      )}
    </>
  );
};

export default BookCar;
