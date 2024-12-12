import React, { useState } from "react";
import Accordion from "../components/design/Accordion";
import {
  IconMail,
  IconPhoneCall,
  IconLocation,
  IconSend,
} from "@tabler/icons-react";
import axios from "axios";
import toast from "react-hot-toast";

const Reviews = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // New state for button loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    try {
      const response = await axios.post(`${BackendUrl}/reviews`, {
        name,
        email,
        message,
      });
      if (response.data.status === "success") {
        setStatus("Review submitted successfully!");
        toast("We will reach you soon", { icon: "👏" });
      } else {
        setStatus("Failed to submit review.");
        toast.error("Failed to submit review", { icon: "🙁" });
      }
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Error submitting review", { icon: "🙁" });
      setStatus("Failed to submit review.");
    } finally {
      setLoading(false); // Set loading to false when submission is complete
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 md:mt-20">
        <Accordion />
      </div>
      <div className="container flex flex-col md:flex-row justify-between m-5 md:m-10">
        <div className="w-full md:w-1/2 mb-8 md:pr-8">
          <h2 className="text-3xl font-semibold mb-4">
            Need additional information?
          </h2>
          <p className="text-gray-600 mb-4">
            A multifaceted professional skilled in multiple fields of research,
            development as well as a learning specialist. Over 15 years of
            experience.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <IconPhoneCall />
              <p className="font-bold">7011596387</p>
            </div>
            <div className="flex items-center">
              <IconMail />
              <p className="font-bold">Rentorama@gmail.com</p>
            </div>
            <div className="flex items-center">
              <IconLocation />
              <p className="font-bold">Lucknow, India</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-bold mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="E.g: Jon Doe"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-n-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-bold mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Your Mail"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-n-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-bold mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message ..."
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-n-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading} // Disable button while loading
                className={`${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-n-1"
                } text-white justify-center font-bold py-2 px-4 rounded-md hover:bg-n-1 transition duration-300 flex items-center w-full`}
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <IconSend className="ml-2" />}
              </button>
            </form>
            {status && <p className="mt-4">{status}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
