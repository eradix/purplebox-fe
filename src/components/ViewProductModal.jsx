import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import { getAllOrders, updateOrder } from "../store/order-slice";
import { fetchAllCustomCake } from "../store/custom-cake-slice";
import { useState } from "react";
import { act } from "react-dom/test-utils";

const ViewProductModal = ({ actions }) => {
  const dispatch = useDispatch();
  const { order, status } = useSelector((state) => state.order);
  const [statusField, setstatusField] = useState("");

  console.log(status)

  const handleSave = (e, id) => {
    e.preventDefault();
    dispatch(updateOrder({ id, status: statusField }));
    dispatch(actions.setShowModal(false));
    dispatch(actions.setStatus(status))
  };

  const closeModal = () => {
    dispatch(actions.setShowModal(false));
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setstatusField(e.target.value)
  };

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: "-50px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl py-6 px-6 w-6/12"
        >
          <div className="flex items-center gap-6">
            <img
              src={`${process.env.REACT_APP_API_URL}/storage/${order?.product?.image}`}
              alt=""
              style={{ width: "250px", height: "100%" }}
            />
            <div>
              <div className="mb-3">
                <p className="text-indigo-500 font-bold">Customer Details</p>
                <p className="text-500-gray">
                  Name:{" "}
                  <span className="text-gray-500">
                    {" "}
                    {order?.user?.first_name} {order?.user?.last_name}
                  </span>
                </p>
                <p className="text-500-gray">
                  Contact:{" "}
                  <span className="text-gray-500">
                    {order?.user?.contact_num}
                  </span>
                </p>
              </div>

              <div className="mb-3">
                <p className="text-indigo-500 font-bold">Product Details</p>
                <p className="text-500-gray">
                  Name:{" "}
                  <span className="text-gray-500"> {order?.product?.name}</span>
                </p>
                <p className="text-500-gray">
                  Message on the Cake:{" "}
                  <span className="text-gray-500">
                    {" "}
                    {order?.product?.message ? order?.product?.message : "N/A"}
                  </span>
                </p>
                <p className="text-500-gray">
                  Unit Price:{" "}
                  <span className="text-gray-500">{order?.product?.price}</span>
                </p>
                <p className="text-500-gray">
                  Quantity:{" "}
                  <span className="text-gray-500">{order?.quantity}</span>
                </p>
                <p className="text-500-gray">
                  Total Price:{" "}
                  <span className="text-gray-500">{order?.total_price}</span>
                </p>
                <p className="text-500-gray">
                  Remarks:{" "}
                  <span className="text-gray-500">
                    Please be careful! lorem
                  </span>
                </p>
                <p className="text-500-gray">
                  <select
                    name="status"
                    id={order?.id}
                    className="text-yellow-500 text-center border py-3 px-1 rounded-md shadow-md w-full focus:outline-none"
                    onChange={(e) => handleSelect(e)}
                  >
                    <option defaultValue={order?.status}>{order?.status}</option>
                    <option value="To-Pay">To-Pay</option>
                    <option value="Processing">Processing</option>
                    <option value="Ready-For-Delivery">
                      Ready-For-Delivery
                    </option>
                    <option value="Completed">Completed</option>
                  </select>
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button
              className="py-2 px-4 bg-red-500 mr-2 text-white rounded mt-6"
              onClick={() => closeModal()}
            >
              Close
            </button>
            <button
              className="py-2 px-4 bg-indigo-500 text-white rounded mt-6"
              onClick={(e) => handleSave(e, order?.id)}
            >
              Save
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default ViewProductModal;
