import React from "react";
import { motion } from "framer-motion";

const Modal = ({ icon, status, message }) => {
  return (
    <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50">
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: "-250px" }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-xl py-6 px-24 flex flex-col justify-center items-center"
        >
          {icon}
          <p className="font-bold text-3xl text-gray-900">{status}</p>
          <p className="text-gray-700 mt-3 text-md">{message}</p>
        </motion.div>
      </div>
    </div>
  );
};
export default Modal;
