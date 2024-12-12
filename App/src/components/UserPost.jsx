import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CarCard from "./design/CarCard";
import CreatePost from "./design/CreatePost";

const UserPost = () => {
  const BackendUrl = import.meta.env.VITE_BACKEND_URL; 
  const [show, setShow] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  // const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/posts/user-posts`,
        { withCredentials: true }
      );
      // console.log("Fetched user posts:", response.data.posts);
      setUserPosts(response.data.posts);
    } catch (error) {
      // console.error("Error fetching user posts:", error); 
      // setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `${BackendUrl}/posts/delete-post/${postId}`,
        { withCredentials: true }
      );
      setUserPosts(userPosts.filter((post) => post._id !== postId));
      toast.success('Successfully deleted!');
    } catch (error) {
      // console.error("Error deleting post:", error);
      toast.error('Error deleting post');
      // setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handlePost = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleOrderConfirm = () => {
    // console.log("Order confirmed!");
    setShow(false);
    fetchUserPosts(); // Refresh posts after creating a new one
  };

  return (
    <div className="container bg-slate-100 p-3 rounded-md shadow-lg">
      <div className="container flex justify-between mb-3">
        <h5 className="h5 font-bold">Your Rentals</h5>
        <button
          type="button"
          className="bg-n-1 text-white font-bold py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
          onClick={handlePost}
        >
          Create Ads
        </button>
      </div>
      {show && (
        <CreatePost onClose={handleClose} onOrderConfirm={handleOrderConfirm} />
      )}
      {/* {error && <p>Error: {error}</p>}  */}
      {userPosts.length > 0 ? (
        <div className="flex flex-wrap -mx-3">
          {userPosts.map((post) => (
            <div key={post._id} className="w-full sm:w-1/2 md:w-1/3 px-3 mb-6">
              <CarCard
                imageUrl={post.carImage}
                model={post.model}
                type={post.carTransmission}
                price={post.carPrice}
                fuel={post.carFuel}
                seater={post.carCapacity}
                onDelete={() => handleDelete(post._id)}
                deleteButton
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts created yet.</p>
      )}
    </div>
  );
};

export default UserPost;
