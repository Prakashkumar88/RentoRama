import React, { useState, useEffect } from "react";
import jeep from "../assets/jeep.svg";
import { FaLocationDot } from "react-icons/fa6";
import { locations } from "../constants";

const SelectCar = ({ onLocationChange }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const currentDateTime = new Date();
    const date = currentDateTime.toISOString().split("T")[0];
    const time = currentDateTime.toTimeString().split(" ")[0].slice(0, 5);
    setStartDate(date);
    setStartTime(time);
    setEndDate(date);
    setEndTime(time);
  }, []);

  const handleOptionChange = (e) => {
    const location = e.target.value;
    setSelectedOption(location);
    onLocationChange(location);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (e.target.value > endDate) {
      setEndDate(e.target.value);
    }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (
      new Date(`${endDate}T${endTime}`) <= new Date(`${startDate}T${startTime}`)
    ) {
      alert("End time must be greater than start time");
      return;
    }
  };

  return (
    <div className="bg-white flex flex-col shadow-lg p-5 rounded-md md:mt-55">
      <div className="bg-n-3 text-white flex flex-col items-center mb-5 rounded-md font-bold">
        RentoRama
        <img className="h-15 w-15" src={jeep} alt="logo" />
      </div>
      <div className="grid grid-rows-1">
        <div className="flex">
          <FaLocationDot className="h-12 m-2" />
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-n-1"
            onChange={handleOptionChange}
            value={selectedOption}
          >
            <option value="">Select District</option>
            {locations.map((local) => (
              <option key={local.id} value={local.place}>
                {local.place}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <p className="font-bold p-4">Start Time:</p>
        <input
          type="date"
          className="border p-2 rounded-md"
          value={startDate}
          onChange={handleStartDateChange}
          min={new Date().toISOString().split("T")[0]}
        />
        <input
          type="time"
          className="border p-2 rounded-md"
          value={startTime}
          onChange={handleStartTimeChange}
        />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <p className="font-bold p-4">End Time:</p>
        <input
          type="date"
          className="border p-2 rounded-md"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
        />
        <input
          type="time"
          className="border p-2 rounded-md"
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </div>
      <div>
        <button
          className="mt-3 w-full text-white font-bold p-3 border border-gray-300 rounded-md bg-n-1  transition duration-300 hover:shadow-2xl"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SelectCar;
