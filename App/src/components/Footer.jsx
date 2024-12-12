import React, { useState } from "react";
import { IconMail, IconPhoneCall } from "@tabler/icons-react";
import { SiDiscord } from "react-icons/si";
import MailComp from "./design/MailComp.jsx";

const NewsLetter = () => {
  return (
    <>
      <MailComp />
      <footer className="bg-gray-200 mt-3 pt-10 pb-2">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-8">
          <div className="text-black">
            <h3 className="font-semibold text-lg mb-4">CAR Rental</h3>
            <p>
              We offer a wide range of vehicles for all your driving needs. We
              have the perfect car to meet your needs.
            </p>
            <ul className="mt-4 font-bold">
              <li className="hover:text-n-1 transition-colors">
                <IconPhoneCall /> <a href="tel:7011596387">+91 7011596387</a>
              </li>
              <li className="hover:text-n-1 transition-colors">
                <IconMail />{" "}
                <a href="mailto:Rentorama@gmail.com">Rentorama@gmail.com</a>
              </li>
            </ul>
          </div>
          <div className="text-black">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul>
              <li className="hover:text-n-1 transition-colors">
                <a href="#home">New York</a>
              </li>
              <li className="hover:text-n-1 transition-colors">
                <a href="#home">Careers</a>
              </li>
              <li className="hover:text-n-1 transition-colors">
                <a href="#home">Mobile</a>
              </li>
              <li className="hover:text-n-1 transition-colors">
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>
          <div className="text-black">
            <h3 className="font-semibold text-lg mb-4">Working Hours</h3>
            <p>Mon - Fri: 9:00AM - 9:00PM</p>
            <p>Sat: 9:00AM - 7:00PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>
        <div className="text-center flex justify-center  gap-2 mt-8">
          <p className="text-sm text-gray-600">
            Design by{" "}
            <a
              href="https://github.com/Prakashkumar88"
              className="text-blue-600"
              target="_blank"
              rel="discord"
            >
              Prakash
            </a>
          </p>
          <a
            href="https://github.com/Prakashkumar88"
            target="_blank"
            rel="discord"
          >
            <SiDiscord className="text-blue-600" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default NewsLetter;
