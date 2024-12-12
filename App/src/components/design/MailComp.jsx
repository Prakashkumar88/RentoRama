import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Mail = () => {
  const [email, setEmail] = useState("");
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BackendUrl}/email/subscribe`, {
        email: email,
      });

      toast.success("Email subscribed successfully!");
      // console.log("Email subscribed successfully:", response.data);

      setEmail("");
    } catch (error) {
      toast.error("Error subscribing email!");
      // console.error("Error subscribing email:", error);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="container relative z-2 mt-5 p-5 rounded-md flex flex-col justify-evenly bg-n-3 md:flex-row">
        <div className="py-20 text-white">
          <h2 className="h2">SUBSCRIPTION</h2>
          <h4>Subscribe your Email address for latest news & updates.</h4>
        </div>
        <div className="sm:flex-row flex items-center justify-center content-center">
          <div className="relative pb-4 pt-4 w-64">
            <input
              className="p-2 bg-gray-200 rounded-md shadow-md focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-300 hover:shadow-2xl"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-n-1 rounded-md py-2 px-4 self-end border-none font-text font-bold text-white bg-text-orange shadow-md cursor-pointer transition duration-300 hover:shadow-2xl"
              type="submit"
              onClick={handleEmail}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mail;
