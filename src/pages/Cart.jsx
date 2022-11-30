import React, { useState } from "react";
import { useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "../components/PaymentModal";
import { fetchUsersCake } from "../store/custom-cake-slice";
import { deleteOnCart, getTotalPriceAllItems, getUserCart, orderActions } from "../store/order-slice";

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
  const { showModal, usersCart, totalPrice } = useSelector(
    (state) => state.order
  );

  const { usersCakes } = useSelector((state) => state.customCake);

  useEffect(() => {
    dispatch(getUserCart());
    dispatch(fetchUsersCake());
    dispatch(getTotalPriceAllItems())
  }, []);

  const cartDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteOnCart(id));
  };

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
                    {usersCart.map((item, index) => (
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
                          <button
                            onClick={(e) => cartDelete(e, item.id)}
                            className="text-red-500 hover:text-red-700"
                            href="#"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {usersCakes && (
                      <>
                        {usersCakes?.map((item, index) => (
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
                                onClick={(e) => cartDelete(e, item.id)}
                                className="text-red-500 hover:text-red-700"
                                href="#"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="float-right mt-3">
                <p className="mr-2 mb-2">
                  Total: <span className="text-red-500">₱{totalPrice}.00</span>
                </p>
                <button
                  onClick={() => dispatch(orderActions.setShowModal(true))}
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
