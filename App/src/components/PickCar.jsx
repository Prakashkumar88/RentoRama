import React from "react";
import { useState } from "react";
import CarBox from "./design/CarBox";
import { CAR_DATA } from "../constants/index.js";

const PickCar = () => {
  const [active, setActive] = useState("SecondCar");
  const [colorBtn, setColorBtn] = useState("btn1");

  const btnID = (id) => {
    setColorBtn(colorBtn === id ? "" : id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "bg-n-1 text-white" : "";
  };

  return (
    <>
      <section className="container relative z-2">
        <div className="flex flex-col my-auto max-w-[50rem] mx-auto mb-12 md:max-w-md lg:max-w-2xl lg:mb-20 md:text-center text-center">
          <h4 className="h4 text-2.4rem font-medium">Vehicle Models</h4>
          <h1 className="h1 text-4.2rem mt-0.5rem mb-1rem">Our rental fleet</h1>
          <p className="text-1.6rem text-gray-400 leading-6">
            Choose from a variety of our amazing vehicles to rent for your next
            adventure or business trip
          </p>
        </div>

        <div className="conatiner flex flex-col flex-wrap gap-10 mb-10 lg:flex-row md:justify-center md:flex-nowrap md:px-0">
          <div className="flex flex-col gap-0.7rem">
            <button
              className={`text-2xl font-titles font-semibold border-none cursor-pointer px-10 py-6 mt-2
                 bg-gray-200 transition rounded-xl duration-200 hover:bg-orange-500 hover:text-white ${coloringButton(
                   "btn1"
                 )}`}
              onClick={() => {
                setActive("SecondCar");
                btnID("btn1");
              }}
            >
              Honda Civic
            </button>
            <button
              className={`text-2xl font-titles font-semibold border-none cursor-pointer px-10 py-6 mt-2
                 bg-gray-200 transition rounded-xl duration-200 hover:bg-orange-500 hover:text-white ${coloringButton(
                   "btn2"
                 )}`}
              id="btn2"
              onClick={() => {
                setActive("FirstCar");
                btnID("btn2");
              }}
            >
              BMW 2 F23
            </button>
            <button
              className={`text-2xl font-titles font-semibold border-none cursor-pointer px-10 py-6 mt-2
                 bg-gray-200 transition rounded-xl duration-200 hover:bg-orange-500 hover:text-white ${coloringButton(
                   "btn3"
                 )}`}
              id="btn3"
              onClick={() => {
                setActive("ThirdCar");
                btnID("btn3");
              }}
            >
              Mercedes Benz E-class
            </button>
            <button
              className={`text-2xl font-titles font-semibold border-none cursor-pointer px-10 py-6 mt-2
                 bg-gray-200 transition rounded-xl duration-200 hover:bg-orange-500 hover:text-white ${coloringButton(
                   "btn4"
                 )}`}
              id="btn4"
              onClick={() => {
                setActive("FourthCar");
                btnID("btn4");
              }}
            >
              Toyota Fortuner
            </button>
            <button
              className={`text-2xl font-titles font-semibold border-none cursor-pointer px-10 py-6 mt-2
                 bg-gray-200 transition rounded-xl duration-200 hover:bg-orange-500 hover:text-white ${coloringButton(
                   "btn5"
                 )}`}
              id="btn5"
              onClick={() => {
                setActive("FifthCar");
                btnID("btn5");
              }}
            >
              VW Virtus
            </button>
            <button
              className={`text-2xl font-titles font-semibold border-none cursor-pointer px-10 py-6 mt-2
                bg-gray-200 transition rounded-xl duration-200 hover:bg-orange-500 hover:text-white ${coloringButton(
                  "btn6"
                )}`}
              id="btn6"
              onClick={() => {
                setActive("SixthCar");
                btnID("btn6");
              }}
            >
              Audi A1 S-Line
            </button>
          </div>
          <div>
          {active === "FirstCar" && <CarBox data={CAR_DATA} carID={0} />}
          {active === "SecondCar" && <CarBox data={CAR_DATA} carID={1} />}
          {active === "ThirdCar" && <CarBox data={CAR_DATA} carID={2} />}
          {active === "FourthCar" && <CarBox data={CAR_DATA} carID={3} />}
          {active === "FifthCar" && <CarBox data={CAR_DATA} carID={4} />}
          {active === "SixthCar" && <CarBox data={CAR_DATA} carID={5} />}
          </div>
          
        </div>
      </section>
    </>
  );
};

export default PickCar;
