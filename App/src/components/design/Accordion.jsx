import React, { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

const AccordionItem = ({ title, content }) => {
  const [activeQ, setActiveQ] = useState(null);

  const openQ = (id) => {
    setActiveQ(activeQ === id ? null : id);
  };

  const getClassAnswer = (id) => {
    return activeQ === id
      ? "max-h-80 md:max-h-96 lg:max-h-screen px-12 py-6 overflow-hidden"
      : "max-h-0 overflow-hidden";
  };

  const getClassQuestion = (id) => {
    return activeQ === id
      ? "bg-n-1 text-white font-bold shadow-md"
      : "bg-white shadow-md";
  };

  return (
    <>
      <div className="container">
        <h5 className="h5 text-center font-bold">FAQ</h5>
        <h2 className="h2 text-center font-bold">Frequently Asked Questions</h2>
        <p className="text-center text-1.6rem text-gray-400 leading-6 mb-7">
          Frequently Asked Questions About the Car Rental Booking Process on Our
          Website: Answers to Common Concerns and Inquiries.
        </p>

        <div>
          <div className="flex flex-col bg-white shadow-md cursor-pointer lg:w-auto lg:flex-shrink-0 md:w-full">
            <div
              onClick={() => openQ("q1")}
              className={`flex justify-between font-bold items-center shadow-md hover:shadow-lg transition duration-150 ease-in-out px-12 py-6 ${getClassQuestion(
                "q1"
              )}`}
            >
              <p>1. What is special about comparing rental car deals?</p>
              {activeQ === "q1" ? <IconChevronDown /> : <IconChevronUp />}
            </div>
            {activeQ === "q1" && (
              <div
                className={`overflow-hidden font-bold text-gray-500 ${getClassAnswer(
                  "q1"
                )}`}
              >
                Comparing rental car deals is important as it helps find the
                best deal that fits your budget and requirements, ensuring you
                get the most value for your money. By comparing various options,
                you can find deals that offer lower prices, additional services,
                or better car models. You can find car rental deals by
                researching online and comparing prices from different rental
                companies.
              </div>
            )}

            <div
              onClick={() => openQ("q2")}
              className={`flex justify-between font-bold items-center shadow-md hover:shadow-lg transition duration-150 ease-in px-12 py-6 ${getClassQuestion(
                "q2"
              )}`}
            >
              <p>2.How do I find such low rental car prices?</p>
              {activeQ === "q2" ? <IconChevronDown /> : <IconChevronUp />}
            </div>
            {activeQ === "q2" && (
              <div
                className={`overflow-hidden font-bold text-gray-500 ${getClassAnswer(
                  "q2"
                )}`}
              >
                Book in advance: Booking your rental car ahead of time can often
                result in lower prices. Compare prices from multiple companies:
                Use websites like Kayak, Expedia, or Travelocity to compare
                prices from multiple rental car companies. Look for discount
                codes and coupons: Search for discount codes and coupons that
                you can use to lower the rental price. Renting from an
                off-airport location can sometimes result in lower prices.
              </div>
            )}
            <div
              onClick={() => openQ("q3")}
              className={`flex justify-between font-bold items-center shadow-md hover:shadow-lg transition duration-150 ease-in px-12 py-6 ${getClassQuestion(
                "q3"
              )}`}
            >
              <p>3. How do I find the car rental deals?</p>
              {activeQ === "q3" ? <IconChevronDown /> : <IconChevronUp />}
            </div>
            {activeQ === "q3" && (
              <div
                className={`overflow-hidden font-bold text-gray-500 ${getClassAnswer(
                  "q3"
                )}`}
              >
                You can find car rental deals by researching online and
                comparing prices from different rental companies. Websites such
                as Expedia, Kayak, and Travelocity allow you to compare prices
                and view available rental options. It is also recommended to
                sign up for email newsletters and follow rental car companies on
                social media to be informed of any special deals or promotions.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordionItem;
