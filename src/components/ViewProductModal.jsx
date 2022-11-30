import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";

const ViewProductModal = ({ icon, status, message, button, actions }) => {
  const dispatch = useDispatch();
  const { order } = useSelector(state => state.order) 

  const handleClick = () => {
    dispatch(actions.setSuccess(false));
  };

  const closeModal = () => {
    dispatch(actions.setShowModal(false))
  }

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
              src={almond}
              alt=""
              style={{ width: "250px", height: "100%" }}
            />
            <div>
              <div className="mb-3">
                <p className="text-indigo-500 font-bold">Customer Details</p>
                <p className="text-500-gray">
                  Name: <span className="text-gray-500"> Charles Pitagan</span>
                </p>
                <p className="text-500-gray">
                  Contact: <span className="text-gray-500">123123123</span>
                </p>
              </div>

              <div className="mb-3">
                <p className="text-indigo-500 font-bold">Product Details</p>
                <p className="text-500-gray">
                  Name: <span className="text-gray-500"> Customize</span>
                </p>
                <p className="text-500-gray">
                  Message on the Cake:{" "}
                  <span className="text-gray-500">Happy Birthday!</span>
                </p>
                <p className="text-500-gray">
                  Unit Price: <span className="text-gray-500">200</span>
                </p>
                <p className="text-500-gray">
                  Quantity: <span className="text-gray-500">2</span>
                </p>
                <p className="text-500-gray">
                  Total Price: <span className="text-gray-500">400</span>
                </p>
                <p className="text-500-gray">
                  Remarks:{" "}
                  <span className="text-gray-500">
                    Please be careful! lorem
                  </span>
                </p>
                <p className="text-500-gray">
                  Status:{" "}
                  <span className="text-yellow-500 font-bold">To-Pay</span>
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
              onClick={() => handleClick()}
            >
              Edit
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default ViewProductModal;
