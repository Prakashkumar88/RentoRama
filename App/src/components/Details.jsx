import React from "react";
import verify from "../assets/verify.png";
// https://api.dicebear.com/7.x/notionists/svg?seed=John?size=112
const Details = () => {
  return (
    <>
      <div className="h-0.5 bg-black"></div>
      <div className="cotainer relative z-2">
        <div className="flex flex-col my-20 w-full mx-auto mb-12 md:max-w-md lg:max-w-2xl lg:mb-20 md:text-center text-center">
          <h1 className="h1 font-bold">Save Big With Our Rental Fleet</h1>
          <p className="text-1.6rem text-gray-400 leading-6">
            We offer flexible rental plans tailored to your needs, whether it's
            a short-term project or a long-term commitment. Our customizable
            plans ensure you pay only for what you need, saving you money in the
            process.
          </p>
        </div>
        <div className="relative justify-center mb-[2.5rem] lg:flex">
          <div className="flex justify-center">
            <img
              src={verify}
              className="relative z-1"
              width={355}
              height={300}
              alt="verify_carimg"
            />
          </div>
        </div>
        <div className="flex flex-col my-20 w-full mx-auto mb-12 md:max-w-md lg:max-w-2xl lg:mb-20 md:text-center text-center">
          <h2 className="h1 font-bold">Client's Testimonials</h2>
          <p className="p font-bold leading-6">Reviewed by People</p>
        </div>
      </div>

      <div className="container flex flex-wrap mt-5 md:flex-nowrap justify-center ">
        <div>
          <div className="shadow-xl m-5 hover:shadow-2xl hover:shadow-orange-200">
            <p className="font-bold p-7 pt-10 pb-5">
              "We rented a car from this website and had an amazing experience!
              The booking was easy and the rental rates were very affordable."
            </p>

            <div className="flex mt-10 justify-center p-5">
              <div className="border-2 rounded-full p-1.5 border-gray-400">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=John?size=155"
                  height={20}
                  width={50}
                  alt="person"
                />
              </div>
              <div className="flex flex-col mx-10">
                <span className="font-bold">Ranjan</span>
                <p className="text-1.6rem text-gray-400 leading-6">
                  16/4/{new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="shadow-xl  m-5 hover:shadow-2xl hover:shadow-orange-200">
            <p className="font-bold p-7 pt-10 pb-5">
              "We rented a car from this website and had an amazing experience!
              The booking was easy and the rental rates were very affordable."
            </p>

            <div className="flex mt-10 justify-center p-5">
              <div className="rounded-full p-1 border-2 border-gray-400 ">
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=John?size=112"
                  height={20}
                  width={50}
                  alt="person"
                />
              </div>
              <div className="flex flex-col mx-10">
                <span className="font-bold">Charlotte</span>
                <p className="text-1.6rem text-gray-400 leading-6">
                  12/05/{new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
