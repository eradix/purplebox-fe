import React from "react";
import almond from "../assets/img/almond.jpg";
import { FaFunnelDollar } from "react-icons/fa";

const ListProducts = () => {
  const products = [
    {
      img: almond,
      name: "Black Forest Cake",
      price: 999.0,
    },
    {
      img: almond,
      name: "Black Forest Cake",
      price: 999.0,
    },
    {
      img: almond,
      name: "Black Forest Cake",
      price: 999.0,
    },
    {
      img: almond,
      name: "Black Forest Cake",
      price: 999.0,
    },
    {
      img: almond,
      name: "Black Forest Cake",
      price: 999.0,
    },
    {
      img: almond,
      name: "Black Forest Cake",
      price: 999.0,
    },
  ];

  return (
    <>
      <div className="py-6">
        <div className=" py-4">
          <p className="text-xl text-indigo-500 font-light italic">
            List of Cakes
          </p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            consequuntur obcaecati? Tempora nostrum veritatis, vitae voluptatem
            itaque, quaerat magnam dolor ad error cupiditate nihil a maiores
            quibusdam eaque officiis reiciendis.
          </p>
        </div>

        <div>
          <div className="bg-indigo-500 py-4 px-2 flex justify-between items-center">
            <div className="flex items-center">
              <FaFunnelDollar className="text-white mr-1" />
              <p className="text-white">Filters</p>
            </div>
            <div>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue="category">Choose a category</option>
                <option value="US">Cakes</option>
                <option value="CA">Pastries</option>
                <option value="FR">Drinks</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-4 md:gap-3 gap-5 my-3 ">
            {products &&
              products.map((item, index) => (
                <div
                  key={index}
                  className="border shadow-md px-4 py-4 flex flex-col justify-center items-center hover:scale-105 transition-all duration-200"
                >
                  <div>
                    <img src={item.img} alt="almond" />
                    <div className="mt-3">
                      <h1 className="">{item.name}</h1>
                      <p className="text-gray-700 text-sm">₱{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProducts;
