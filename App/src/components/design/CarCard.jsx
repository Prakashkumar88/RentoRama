import React, { useState } from "react";
import { FaGasPump, FaUsers, FaEllipsisV, FaRupeeSign } from "react-icons/fa";
import { TbManualGearbox } from "react-icons/tb";
import PostDetail from "../design/PostDetail";

const CarCard = ({
  UniqueId,
  imageUrl,
  title,
  model,
  type,
  price,
  fuel,
  seater,
  onDelete,
  button,
  deleteButton,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  

  const handleDelete = () => {
    onDelete();
    setShowMenu(false); // Hide menu after delete
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleOrderConfirm = () => {
    setOrderConfirmed(true);
    setShowModal(false);
  };

  return (
    <div className="max-w-lg rounded-md overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-150">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-bold mb-2">{model}</h4>
          <div className="relative">
            {deleteButton && (
              <button onClick={toggleMenu} className="focus:outline-none">
                <FaEllipsisV className="text-gray-600" />
              </button>
            )}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg">
                <button
                  onClick={handleDelete}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 justify-between">
          <p className="text-gray-600 mb-2 item-center">
            <TbManualGearbox className="mr-2 text-gray-500" />
            {type}
          </p>
          <p className="text-gray-600 mb-2">
            <FaUsers className="mr-2 text-gray-500" /> {seater}
          </p>
          <p className="text-gray-600 mb-2">
            <FaGasPump className="mr-2 text-gray-500" /> {fuel}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="flex font-bold text-lg mt-2 text-green-600">
            <FaRupeeSign className="mt-1" />
            {price} / hr
          </p>
          {button && (
            <button
              className="bg-n-1 text-white font-bold py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
              onClick={() => setShowModal(true)}
            >
              Book
            </button>
          )}
        </div>
        {showModal && (
          <PostDetail
            UniqueId={UniqueId}
            imageUrl={imageUrl}
            title={title}
            model={model}
            type={type}
            price={price}
            fuel={fuel}
            seater={seater}
            onClose={handleModalClose}
            onOrderConfirm={handleOrderConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default CarCard;
