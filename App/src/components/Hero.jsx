import { TypeAnimation } from "react-type-animation";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import hondaR from "../assets/hondaR.png";
import mercedes from "../assets/mercedes.png";
import cars from "../assets/cars.png";
// import carImage from "../constants/index.js";

const Hero = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const handleSlideChange = (index) => {
  //   setCurrentSlide(index);
  // };

  return (
    <>
      <div className="relative py-5 z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <TypeAnimation
          sequence={[
            500,
            "Rent Honda Civic Type R",
            1000,
            "Rent Mercedes AMG",
            1000,
            "Rent Many More Cars Like These Here",
            1000,
          ]}
          className="font-bold"
          speed={20}
          style={{ fontSize: "2em" }}
          // repeat={Infinity}
        />
        {/* <h1 className="font-bold mb-4">Rent {carImage[currentSlide].title}</h1> */}
        {/* <Carousel onChange={handleSlideChange} selectedItem={currentSlide}></Carousel> */}
        <Carousel autoPlay interval={2500} showArrows={false}> 
          <div>
            <img src={hondaR} />
          </div>
          <div>
            <img src={mercedes} />
          </div>
          <div>
            <img src={cars} />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
