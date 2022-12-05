import React, { useState } from "react";
import { useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import PaymentModal from "../components/PaymentModal";
import { deleteCakeOnCart, fetchUsersCake } from "../store/custom-cake-slice";
import {
  deleteOnCart,
  getTotalPriceAllItems,
  getUserCart,
  orderActions,
} from "../store/order-slice";

const Cart = () => {
  const header = [
    "Product",
    "Name",
    "Unit Price",
    "Quantity",
    "Total Price",
    "Status",
    "Actions",
  ];
  const dispatch = useDispatch();

  useEffect((e) => {
    dispatch(getUserCart("To-Pay"));
    dispatch(fetchUsersCake("To-Pay"));
    dispatch(getTotalPriceAllItems());
  }, []);

  const { showModal, usersCart, getItemsByStatus, totalPrice } = useSelector(
    (state) => state.order
  );

  const { usersCakes, cakeItems } = useSelector((state) => state.customCake);

  const cartDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteOnCart(id));
  };

  const cakeCartDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteCakeOnCart(id));
  };

  const [status, setStatus] = useState("To-Pay");

  const navigate = (e, status) => {
    setStatus(status);
    dispatch(getUserCart(status));
    dispatch(fetchUsersCake(status));
    console.log(status);
  };

  const cartItems = status === "To-Pay" ? usersCart : getItemsByStatus;
  const customCakeItems = status === "To-Pay" ? usersCakes : cakeItems;

  return (
    <>
      {showModal && <PaymentModal />}

      <div className="md:w-full md:pr-10 md:pl-5 h-screen my-12 overflow-y-auto">
        <div className="flex items-center font-bold cursor-pointer text-xl mb-3 ml-3">
          <span className="mr-1 text-indigo-500">
            <FaBox />
          </span>
          <p>Shopping Cart</p>
        </div>

        <ul className="flex justify-between items-center px-2 text-center">
          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "To-Pay" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "To-Pay")}
          >
            On Cart
          </li>

          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "Processing" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "Processing")}
          >
            Processing
          </li>

          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "Ready-For-Delivery" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "Ready-For-Delivery")}
          >
            Delivery
          </li>

          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "Completed" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "Completed")}
          >
            Completed
          </li>
        </ul>

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
                    {cartItems?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/storage/${item.product.image}`}
                            className="w-24 h-24"
                            alt="product"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.product.price}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.total_price}
                        </td>
                        <td className="px-6 py-4 text-sm text-yellow-500 whitespace-nowrap">
                          {item.status}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          {status === "To-Pay" && (
                            <button
                              onClick={(e) => cartDelete(e, item.id)}
                              className="text-red-500 hover:text-red-700"
                              href="#"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}

                    {customCakeItems?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          <img
                            src={`${process.env.REACT_APP_API_URL}/storage/${item.image}`}
                            className="w-24 h-24"
                            alt="product"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-indigo-800 font-bold whitespace-nowrap">
                          Customize
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.price ? item.price : "0"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {item.price * item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-yellow-500 whitespace-nowrap">
                          {item.status}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <button
                            onClick={(e) => cakeCartDelete(e, item.id)}
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {status === "To-Pay" && (
                <div className="float-right mt-3">
                  <p className="mr-2 mb-2">
                    Total:{" "}
                    <span className="text-red-500">₱{totalPrice}.00</span>
                  </p>
                  <button
                    onClick={() => dispatch(orderActions.setShowModal(true))}
                    className="bg-indigo-500 text-white py-2 rounded px-14"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
