import React from "react";
import { FaPhone, FaAddressBook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-slate-800">
      <div className="py-6  container mx-auto flex justify-between items-center">
        <div className="py-3 px-4">
          <p className="text-gray-400">Keep in touch with us</p>
          <div className="flex items-center text-gray-400 text-sm">
            <FaPhone className=" mr-1" />
            <p className="">+639123321111</p>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <FaAddressBook className="mr-1" />
            <p> Tanza, Cavite</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-400">ClientsName &copy; 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
