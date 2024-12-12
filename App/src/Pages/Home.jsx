import React from "react";
import Hero from "../components/Hero";
import BookCar from "../components/BookCar";
import Trip from "../components/Trip";
import PickCar from "../components/PickCar";
import Details from "../components/Details";

const Home = () => {
  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Hero />
      <div className="text-center mb-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-2">
          Book Your Car Now
        </h1>
        <h6 className="text-lg text-gray-600">Plan Your Trip Now</h6>
      </div>
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h2 className="h2 font-bold text-center mb-6">
            Save <span className="text-orange-600"> big </span>with our car rental
          </h2>
          <BookCar />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Trip />
        <PickCar />
        <Details />
      </div>
    </div>
  );
};

export default Home;
