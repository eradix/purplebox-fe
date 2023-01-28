import React, { useState } from "react";
import { useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import PaymentModal from "../components/PaymentModal";
import { deleteCakeOnCart, fetchUsersCake } from "../store/custom-cake-slice";
import {
  deleteOnCart,
  getOrder,
  getTotalPriceAllItems,
  getUserCart,
  orderActions,
  updateOrder,
} from "../store/order-slice";
import AlertModal from "../components/AlertModal";
import { FaSkullCrossbones } from "react-icons/fa";

const Cart = () => {
  const header = [
    "",
    "Product",
    "Name",
    "Unit Price",
    "Quantity",
    "Total Price",
    "Actions",
  ];
  const dispatch = useDispatch();

  const [status, setStatus] = useState("onCart");
  const [isChecked, setiIsChecked] = useState(false);

  const {
    loading,
    order,
    showModal,
    usersCart,
    getItemsByStatus,
    totalPrice,
    err,
    deliveryDetails,
    toBeCheckout,
  } = useSelector((state) => state.order);

  const { usersCakes, cakeItems } = useSelector((state) => state.customCake);

  useEffect(
    (e) => {
      dispatch(getUserCart(status));
      dispatch(fetchUsersCake(status));
    },
    [showModal]
  );

  const cartDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteOnCart(id));
  };

  const cakeCartDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteCakeOnCart(id));
  };

  const navigate = (e, status) => {
    setStatus(status);
    dispatch(getUserCart(status));
    dispatch(fetchUsersCake(status));
    dispatch(orderActions.setTotalPrice(0))
    if (status !== "onCart") dispatch(getTotalPriceAllItems(status));
  };

  const cartItems = status === "onCart" ? usersCart : getItemsByStatus;
  const customCakeItems = status === "onCart" ? usersCakes : cakeItems;

  const checkboxOnChange = (e) => {
    const { id, checked } = e.target;
    const item = usersCart.find((item) => item.id === parseInt(id));

    dispatch(
      orderActions.setTotalPrice({ totalPrice: item.total_price, checked })
    );

    dispatch(orderActions.setToBeCheckout({ item, checked }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    dispatch(orderActions.setDeliveryDetails({ name, value }));
  };

  const checkout = () => {
    if (
      !deliveryDetails.delivery_date ||
      !deliveryDetails.delivery_address ||
      toBeCheckout.length === 0
    ) {
      dispatch(orderActions.setErr(true));
    } else {
      dispatch(orderActions.setShowModal(true));
      toBeCheckout.forEach((item) => {
        dispatch(
          updateOrder({
            id: item.id,
            status: "Paid",
            delivery_date: deliveryDetails.delivery_date,
            delivery_address: deliveryDetails.delivery_address,
          })
        );
      });
    }
  };

  return (
    <>
      {showModal && <PaymentModal />}

      {err && (
        <AlertModal
          icon={<FaSkullCrossbones className="text-red-500 text-4xl" />}
          status={"Error"}
          message={"Please enter delivery date/address."}
          button={"Okay"}
          actions={orderActions}
        />
      )}

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
              status === "onCart" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "onCart")}
          >
            On Cart
          </li>

          <li
            className={`py-2 px-4 border-l w-full cursor-pointer hover:bg-indigo-500 hover:text-white ${
              status === "Paid" ? "bg-indigo-500 text-white" : ""
            }`}
            onClick={(e) => navigate(e, "Paid")}
          >
            Paid
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
            <div className="my-6 ml-2 flex">
              <div className="mr-3">
                <label htmlFor="">Delivery date: </label>
                <input
                  type="date"
                  className="border px-3 py-2"
                  onChange={handleChange}
                  value={deliveryDetails.delivery_date}
                  name="delivery_date"
                  required
                />
              </div>
              <div>
                <label htmlFor="">Delivery Address: </label>
                <input
                  type="text"
                  className="border px-3 py-2"
                  onChange={handleChange}
                  value={deliveryDetails.delivery_address}
                  name="delivery_address"
                  required
                />
              </div>
            </div>
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
                          <input
                            type="checkbox"
                            name="checkbox"
                            value={isChecked}
                            id={item.id}
                            onChange={checkboxOnChange}
                          />
                        </td>
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
                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          {status === "onCart" && (
                            <button
                              onClick={(e) => cartDelete(e, item.id)}
                              className="text-red-500 hover:text-red-700"
                              href="#"
                            >
                              Cancel
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

              <div className="float-right mt-3">
                <p className="mr-2 mb-2">
                  Total:{" "}
                  <span className="text-red-500">₱{totalPrice || 0}.00</span>
                </p>

                {status === "onCart" && (
                  <button
                    onClick={checkout}
                    className="bg-indigo-500 text-white py-2 rounded px-14"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
