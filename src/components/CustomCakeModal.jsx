import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import almond from "../assets/img/almond.jpg";
import { useState } from "react";
import { customCakeActions } from "../store/custom-cake-slice";

const CustomCakeModal = () => {
  const dispatch = useDispatch();
  const { allCustomCakes, customCake, customCakeModal } = useSelector(
    (state) => state.customCake
  );
  console.log(customCake)
  const [statusField, setstatusField] = useState("");

  const handleSave = (e, id) => {
    e.preventDefault();
    dispatch(customCakeActions.setShowModal(false));
  };

  const closeModal = () => {
    dispatch(customCakeActions.setCustomCakeModal(false));
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setstatusField(e.target.value);
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
              src={`${process.env.REACT_APP_API_URL}/storage/${customCake?.image}`}
              alt=""
              style={{ width: "250px", height: "100%" }}
            />
            <div>
              <div className="mb-3">
                <p className="text-indigo-500 font-bold">Customer Details</p>
                <p className="text-500-gray">
                  Name: <span className="text-gray-500"> {customCake?.user?.first_name} {customCake?.user?.last_name}</span>
                </p>
                <p className="text-500-gray">
                  Contact: <span className="text-gray-500">{customCake?.user?.contact_num}</span>
                </p>
              </div>

              <div className="mb-3">
                <p className="text-indigo-500 font-bold">Product Details</p>
                <p className="text-500-gray">
                  Name: <span className="text-gray-500"> Customize Cake</span>
                </p>
                <p className="text-500-gray">
                  Message on the Cake:{" "}
                  <span className="text-gray-500"> {customCake?.message}</span>
                </p>
                <p className="text-500-gray">
                  Unit Price: <span className="text-gray-500">{customCake?.price}</span>
                </p>
                <p className="text-500-gray">
                  Quantity: <span className="text-gray-500">{customCake?.quantity}</span>
                </p>
                <p className="text-500-gray">
                  Total Price: <span className="text-gray-500">{customCake?.quantity * customCake?.price}</span>
                </p>
                <p className="text-500-gray">
                  Remarks:{" "}
                  <span className="text-gray-500">
                  {customCake?.remarks}
                  </span>
                </p>
                <p className="text-500-gray">
                  <select
                    name="status"
                    className="text-yellow-500 text-center border py-3 px-1 rounded-md shadow-md w-full focus:outline-none"
                    onChange={(e) => handleSelect(e)}
                  >
                    <option defaultValue={customCake?.status}>
                      {customCake?.status}
                    </option>
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
              onClick={(e) => handleSave(e, customCake?.id)}
            >
              Save
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default CustomCakeModal;
