import React from "react";
import unknown from "../assets/img/unknown.jpg";

const CustomizeCake = () => {
  return (
    <>
      <div className="md:h-screen flex items-center justify-center">
        <div className="md:flex items-center gap-10 my-12 md:my-0 md:mx-24  w-full justify-between ">
          <img src={unknown} alt="cake" className="mb-3 md:mb-0" />
          <div className="self-start w-full">
            <p className="font-bold text-2xl text-indigo-500 mb-3">
              Customize Cake
            </p>

            <div className="my-3">
              <input
                type="file"
                name="message"
                className="py-3 px-5 border w-full placeholder-black"
              />
            </div>

            <div>
              <input
                type="number"
                placeholder="Quantity"
                name="quantity"
                className="py-3 px-5 border w-full placeholder-black"
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="What Message Would You Like On The Cake?"
                name="message"
                className="py-3 px-5 border w-full placeholder-black"
              />
            </div>

            <div className="my-3">
              <textarea
                name="remarks"
                id="remarks"
                cols="30"
                rows="10"
                className="border w-full py-3 px-5"
                placeholder="Remarks"
              ></textarea>
            </div>
            <div>
              <button className="py-3 px-5 bg-indigo-500 text-white w-full ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizeCake;
