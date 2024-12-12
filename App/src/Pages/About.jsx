import React, { useState } from "react";

import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import Card from "../components/design/Card";

import Location from "../assets/Location.png";
import Star from "../assets/Star.png";
import CarToon from "../assets/CarToon.png";
import Happy from "../assets/Happy.png";

const About = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <div className="bg-white text-center m-5 pt-15">
      <h1 className="text-3xl font-serif mb-5">- Meet Our Team -</h1>
      <p className="text-gray-400 px-15 font-bold text-center">
        we understand the importance of flexibility and affordability, which is
        why we offer competitive rates and flexible rental options tailored to
        accommodate your schedule. With a commitment to excellence and customer
        satisfaction, we invite you to discover the difference with RentoRama
      </p>
      <div className="container flex flex-wrap justify-center mb-10">
        <Card
          imageUrl={
            "https://api.dicebear.com/7.x/notionists/svg?seed=John?size=1111111"
          }
          title={"CEO"}
          text={`"As your CEO, I lead with a vision of not just where we're going, but how we'll get there"`}
        />
        <Card
          imageUrl={
            "https://api.dicebear.com/7.x/notionists/svg?seed=John?size=145"
          }
          title={"CMO (Chief Marketing Officer)"}
          text={`"Driving Connections, Fueling Experiences: Your Journey Starts Here."`}
        />
        <Card
          imageUrl={
            "https://api.dicebear.com/7.x/notionists/svg?seed=John?size=12235"
          }
          title={"CTO (Chief Technology Officer)"}
          text={`"Innovating the Road Ahead: Where Technology Meets Mobility."`}
        />
        <Card
          imageUrl={
            "https://api.dicebear.com/7.x/notionists/svg?seed=John?size=1222225"
          }
          title={"Design Head"}
          text={`"Elevating Experiences, Crafting Unforgettable Journeys Be the Part of Us."`}
        />
      </div>

      <div>
        <ScrollTrigger
          className="container flex flex-col justify-around items-center mt-15 rounded-lg py-8 sm:flex-row"
          onEnter={() => setCounterOn(true)}
          onExit={() => setCounterOn(true)}
        >
          <div className="text-center">
            <div className="flex justify-evenly p-1">
              <img src={Happy} alt="happy_face" height={50} width={50} />
            </div>
            <h2 className="text-3xl font-bold">
              {counterOn && (
                <CountUp start={0} end={1} duration={3} delay={0} />
              )}
              Mn +
            </h2>
            <p>Happy RentoRama's</p>
          </div>
          <div className="text-center">
            <div className="flex justify-evenly p-2">
              <img src={Location} alt="location_mark" height={50} width={45} />
            </div>
            <h2 className="text-3xl font-bold">
              {counterOn && (
                <CountUp start={0} end={22} duration={3} delay={0} />
              )}
              +
            </h2>
            <p>Cities Across India</p>
          </div>
          <div className="text-center">
            <div className="flex justify-evenly p-1">
              <img src={CarToon} alt="location_mark" height={50} width={55} />
            </div>
            <h2 className="text-3xl font-bold">
              {counterOn && (
                <CountUp start={0} end={50} duration={3} delay={0} />
              )}
              Mn +
            </h2>
            <p>Kms Travelled</p>
          </div>
          <div className="text-center">
          <div className="flex justify-evenly p-2">
              <img src={Star} alt="Star" height={50} width={50} />
            </div>
            <h2 className="text-3xl font-bold">
              {counterOn && (
                <CountUp start={0} end={4} duration={3} delay={0} />
              )}
              /5
            </h2>
            <p>20K+ Reviewers</p>
          </div>
        </ScrollTrigger>
      </div>
    </div>
  );
};

export default About;
