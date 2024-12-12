import React, { useState, useEffect } from "react";
import axios from "axios";
import { offers } from "../constants";
import serviceCar from "../assets/serviceCar.png";
import SelectCar from "../components/SelectCar";
import CarCard from "../components/design/CarCard.jsx";

const Services = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    filterPostsByLocation();
  }, [selectedLocation, posts]);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/posts/all-posts`
      );
      setPosts(response.data.posts);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterPostsByLocation = () => {
    if (selectedLocation) {
      const filtered = posts.filter(
        (post) => post.district === selectedLocation
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <div className="relative bg-n-5 z-1 mt-20 px-4 flex flex-wrap md:flex-nowrap justify-center items-center shadow-md">
        <div className="container">
          <SelectCar onLocationChange={handleLocationChange} />
        </div>
        <div className="p-20 mx-5">
          <h2 className="h2 font-bold mb-4">Our Special Offers:</h2>
          <p className="mb-6 text-gray-700">
            Discover the best deals and discounts on our car rentals. Whether
            you're looking for a luxury car for a special occasion or an
            economical option for your everyday needs, we have something for
            everyone.
          </p>
          <div className="flex justify-center mb-4">
            <img
              className="mx-15"
              src={serviceCar}
              height={20}
              width={200}
              alt="Service Car"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="bg-white m-2 gap-2 rounded-md p-4 shadow-lg flex items-center"
              >
                {React.createElement(offer.icon, {
                  size: 24,
                  className: "mr-2",
                })}
                <div>
                  <p className="font-bold">{offer.text1}</p>
                  <p className="text-n-1">{offer.text2}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container flex flex-wrap gap-x-[2.5%] flex-col justify-evenly w-[100vw] p-7 rounded mt-15 sm:flex-row bg-slate-100">
        <h2 className="h2 font-bold mb-4 text-center w-full">
          Available Vehicles
        </h2>
        <p className="text-center mb-6 text-gray-700 w-full">
          Browse through our extensive selection of rental vehicles. Choose from
          a variety of models, including sedans, SUVs, trucks, and luxury cars,
          all at competitive prices. Book your perfect ride today!
        </p>
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <p className="text-blue-500">Loading posts...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredPosts.length > 0 ? (
          <div className="flex flex-wrap -mx-3">
            {filteredPosts.map((post) => (
              <div key={post._id} className="w-full sm:w-1/2 md:w-1/3 px-7 mb-6">
                <CarCard
                  UniqueId={post._id}
                  imageUrl={post.carImage}
                  model={post.model}
                  type={post.carTransmission}
                  price={post.carPrice}
                  fuel={post.carFuel}
                  seater={post.carCapacity}
                  button
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 w-full">
            No posts available. Please check back later for more rental options.
          </p>
        )}
      </div>
    </>
  );
};

export default Services;
