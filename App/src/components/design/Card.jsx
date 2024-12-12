import React from "react";

const Card = ({ imageUrl, title, text ,button ,price}) => {
  return (
    <div className="container flex justify-center mt-5 w-[50%] items-center sm:w-[30%]">
      <div className="bg-white shadow-lg sm:w-full rounded-lg overflow-hidden w-72 transition duration-200 hover:shadow-xl hover:transition">
        <div className="card-image">
          <img src={imageUrl} alt={title} className="w-full h-full" />
        </div>
        <div className="bg-slate-500 h-0.5"></div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{text}</p>
          <p className="p">{price}</p>
          <div className="mt-4">
            {button && <button  //show button only if button prop is given
              type="submit"
              className="bg-n-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {button}
            </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
