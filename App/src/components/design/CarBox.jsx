import React, { useState } from "react";

const CarBox = ({ data, carID }) => {
  const [carLoad, setCarLoad] = useState(true);

  return (
    <div className="">
      {data[carID].map((car, id) => (
        <div className="flex flex-col md:flex-row" key={id}>
          <div className="mt-15 p-20 ">
            <img src={car.img} width={400} height={400} alt="carImage" />
          </div>
          <div className="px-7">
            <div className="w-full bg-orange-600 text-white text-lg flex items-center gap-1.5rem px-0.3rem py-1.9rem">
              <span className="text-2xl font-bold">${car.price}</span>/ rent per
              day
            </div>
            <div className="grid grid-cols-2 text-center grid-rows-auto py-4 px-2 border-b-2 border-r-2 border-l-2 border-gray-600">
              <span>Model</span>
              <span className="border-l-2 border-solid border-gray-700 pl-2">
                {car.model}
              </span>
            </div>
            <div className="grid grid-cols-2 text-center grid-rows-auto py-4 px-2 border-b-2 border-r-2 border-l-2 border-gray-600">
              <span>Mark</span>
              <span className="border-l-2 border-solid border-gray-700 pl-2">
                {car.mark}
              </span>
            </div>
            <div className="grid grid-cols-2 text-center grid-rows-auto py-4 px-2 border-b-2 border-r-2 border-l-2 border-gray-600">
              <span>Year</span>
              <span className="border-l-2 border-solid border-gray-700 pl-2">
                {car.year}
              </span>
            </div>
            <div className="grid grid-cols-2 text-center grid-rows-auto py-4 px-2 border-b-2 border-r-2 border-l-2 border-gray-600">
              <span>Seats</span>
              <span className="border-l-2 border-solid border-gray-700 pl-2">
                {car.seats}
              </span>
            </div>
            <div className="grid grid-cols-2 text-center grid-rows-auto py-4 px-2 border-b-2 border-r-2 border-l-2 border-gray-600">
              <span>AC</span>
              <span className="border-l-2 border-solid border-gray-700 pl-2">
                {car.air}
              </span>
            </div>
            <div className="grid grid-cols-2 text-center grid-rows-auto py-4 px-2 border-b-2 border-r-2 border-l-2 border-gray-600">
              <span>Transmission</span>
              <span className="border-l-2 border-solid border-gray-700 pl-2">
                {car.transmission}
              </span>
            </div>
            <div className="grid grid-cols-2 text-center grid-rows-auto py-4 px-2 border-b-2 border-r-2 border-l-2 border-gray-600">
              <span>Fuel</span>
              <span className="border-l-2 border-solid border-gray-700 pl-2">
                {car.fuel}
              </span>
            </div>
            <a
              className="flex items-center justify-center w-full rounded-md px-4 py-4 text-lg font-semibold uppercase text-white bg-orange-500 transition duration-300 shadow-lg mt-6 hover:bg-red-600 hover:shadow-none"
              href="#booking-section"
            >
              Reserve Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarBox;
