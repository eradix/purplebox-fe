import React from "react";
import { motion } from "framer-motion";
import qr from "../assets/img/qr.PNG";
import { useDispatch } from "react-redux";
import { orderActions } from "../store/order-slice";

const PaymentModal = () => {
  const dispatch = useDispatch();

  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: "-50px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl py-6 px-24 flex flex-col justify-center items-center w-4/12"
        >
          <p className="font-bold text-2xl text-gray-900 mb-3">Gcash Payment</p>
          <img src={qr} alt="QR" />
          <p className="text-gray-700 my-3 text-md text-center">
            Please pay using this QR code to process your order, send the
            screenshot on the chatbox once done.
          </p>

          <div>
            <button onClick={() => dispatch(orderActions.setShowModal(false))} className="text-white bg-indigo-500 py-2 px-8 rounded">
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentModal;
