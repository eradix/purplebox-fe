import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaWindowClose,
  FaHamburger,
  FaCheck,
  FaCartPlus,
} from "react-icons/fa";
import { useEffect } from "react";
import { useAuth } from "../App";
import Modal from "./AlertModal";

const Header = () => {
  const token = useAuth();
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {}, [token]);

  const [open, setOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const publicRoutes = [{ name: "Dashboard", link: "/users" }];
  const privateRoutes = [
    { name: "Login", link: "/login"},
    {
      name: "Register",
      link: "/register",
    },
  ];
  const navs = !token ? privateRoutes : publicRoutes;

  return (
    <>
      {loggedOut && (
        <Modal
          icon={<FaCheck className="text-green-500 text-4xl" />}
          status={"Success"}
          message={"Logged out"}
        />
      )}
      <div className="shadow-md w-full top-0 left-0 relative z-10">
        <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
          <Link to={"/"}>
            <div className="flex items-center font-bold cursor-pointer text-xl">
              <span className="mr-1 text-indigo-500">
                <FaBox />
              </span>
              <p>PurpleBox</p>
            </div>
          </Link>

          <div className="cursor-pointer" onClick={() => setOpen(!open)}>
            {open ? (
              <FaWindowClose className="text-2xl text-green-500 absolute right-8 top-5 md:hidden" />
            ) : (
              <FaHamburger className="text-2xl text-green-500 absolute right-8 top-5 md:hidden" />
            )}
          </div>

          <ul
            className={`shadow-md md:shadow-none md:flex md:items-center absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 md:pb-0 pb-7 transition-all duration-500 ease-in
          ${
            open
              ? "top-20 opacity-100"
              : "top-[-490px] md:opacity-100 opacity-0"
          }`}
          >
            {navs.map((item, id) => (
              <li
                className="my-7 md:my-0 md:ml-8 text-md text-gray-600 hover:text-green-500 transition-all duration-100 font-thin"
                key={id}
              >
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}

            {token ? (
              <div className="ml-8 relative">
                <Link to={`/cart/1`}>
                  <FaCartPlus className="text-2xl" />
                </Link>
                <p className=" text-white bg-red-500 rounded-full text-center text-sm absolute -top-3 -right-2 font-bold px-1">
                  1
                </p>
              </div>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
