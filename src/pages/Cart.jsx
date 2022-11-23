import React, { useState } from "react";
import { FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import PaymentModal from "../components/PaymentModal";
import { cartActions } from "../store/cart-slice";

const Cart = () => {
  const showModal = useSelector((state) => state.cart.showModal);
  const dispatch = useDispatch();

  const header = [
    "Product",
    "Unit Price",
    "Quantity",
    "Total Price",
    "Status",
    "Actions",
  ];

  return (
    <>
      {showModal && <PaymentModal />}

      <div className="md:w-full md:pr-10 md:pl-5 h-screen mt-12 ">
        <div className="flex items-center font-bold cursor-pointer text-xl mb-3">
          <span className="mr-1 text-indigo-500">
            <FaBox />
          </span>
          <p>PurpleBox | Shopping Cart</p>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg ">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {header.map((item, index) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 relative">
                    <tr>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <img src={almond} className="w-24 h-24" alt="product" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        12900.00
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        12
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        100000
                      </td>
                      <td className="px-6 py-4 text-sm text-yellow-500 whitespace-nowrap">
                        To Pay
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <a className="text-red-500 hover:text-red-700" href="#">
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="float-right mt-3">
                <p className="mr-2 mb-2">
                  Total (0 item): <span className="text-red-500">₱ 12,000</span>
                </p>
                <button
                  onClick={() => dispatch(cartActions.setShowModal(true))}
                  className="bg-indigo-500 text-white py-2 rounded px-14"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
