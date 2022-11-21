import React from "react";
import cakes from "../assets/img/cakes.svg";

const Showcase = () => {
  return (
    <div className="py-20 md:mt-0 md:flex items-center justify-between border-b-2 ">
      <div className="md:w-1/2">
        <h1 className="text-6xl">
          <span className="text-indigo-500">PurpleBox</span> Cakes and Pastries
        </h1>
        <p className="text-left my-3 text-gray-600">
          Serves the best, only the best
        </p>
        <button className="bg-blue-500 font-bold text-white py-2 px-3 rounded">
          Learn More
        </button>
      </div>
      <div>
        <img src={cakes} alt="gravitas" />
      </div>
    </div>
  );
};

export default Showcase;
