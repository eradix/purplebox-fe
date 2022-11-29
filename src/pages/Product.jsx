import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import almond from "../assets/img/almond.jpg";
import { getProduct } from "../store/product-slice";

const Product = () => {
  const { product_id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(product_id));
  }, []);

  return (
    <>
      <div className="md:h-screen flex items-center justify-center">
        <div className="md:flex items-center gap-10 my-12 md:my-0 md:mx-24  w-full justify-between ">
          <img
            src={`${process.env.REACT_APP_API_URL}/storage/${product.image}`}
            alt="cake"
            className="mb-3 md:mb-0"
          />
          <div className="self-start w-full">
            <p className="font-bold text-2xl text-indigo-500 mb-3">
              {product.name}
            </p>

            <div>
              <input
                type="number"
                placeholder="Quantity"
                className="py-3 px-5 border w-full placeholder-black"
              />
            </div>
            {product.type === "Cakes" && (
              <div className="my-3">
                <input
                  type="text"
                  placeholder="What Message Would You Like On The Cake?"
                  className="py-3 px-5 border w-full placeholder-black"
                />
              </div>
            )}
            {/* <div className="flex">
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
            </div> */}

            <div className="my-3">
              <p className="text-gray-500">{product.description}</p>
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
