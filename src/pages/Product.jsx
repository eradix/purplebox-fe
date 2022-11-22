import React from "react";
import { useParams } from "react-router";
import almond from "../assets/img/almond.jpg";
import Footer from "../components/Footer";

const Product = () => {
  const { product_id } = useParams();
  return (
    <>
      <div className="h-screen flex items-center">
        <div className="md:flex items-center gap-10">
          <img src={almond} alt="cake" className="mb-3 md:mb-0" />
          <div className="">
            <p className="font-bold text-2xl text-indigo-500">{product_id}</p>

            <div className="flex">
              <div className="my-3">
                <select
                  className="py-3 px-5 border"
                  aria-label="Default select example"
                >
                  <option defaultValue={"0"} className="text-gray-500">
                    Size of the cake
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div>
              <input
                type="number"
                placeholder="Quantity"
                className="py-3 px-5 border w-full placeholder-black"
              />
            </div>
            <div className="my-3">
              <input
                type="text"
                placeholder="What Message Would You Like On The Cake?"
                className="py-3 px-5 border w-full placeholder-black"
              />
            </div>
            <div className="flex">
              <div className="">
                <select
                  className="py-3 px-5 border"
                  aria-label="Default select example"
                >
                  <option defaultValue={"0"}>
                    Will you be needing a candle with your Cake?
                  </option>
                  <option value="1">No</option>
                  <option value="2">Yes - blue</option>
                  <option value="3">Yes - pink</option>
                </select>
              </div>
            </div>

            <div className="my-3">
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium libero inventore, unde, velit voluptatum quia
                perferendis, fugit ipsam quas sit quisquam adipisci nihil quod
                animi consequuntur nulla. Harum, quasi velit!
              </p>
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

export default Product;
