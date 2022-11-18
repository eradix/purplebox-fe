import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMagnet, FaWindowClose, FaHamburger, FaCheck } from "react-icons/fa";
import Button from "./Button";
import { useEffect } from "react";
import { useAuth } from "../App";
import Modal from "./AlertModal";
import { userActions } from "../store/user-slice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useAuth();
  useEffect(() => {}, [token]);

  const [open, setOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const logout = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/logout`)
      .then((res) => {
        localStorage.removeItem("token");
        setLoggedOut(true);
        dispatch(userActions.resetAllUser());
        setTimeout(() => {
          setLoggedOut(false);
          navigate("/login");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  const publicRoutes = [{ name: "Dashboard", link: "/dashboard" }];
  const privateRoutes = [
    { name: "Login", link: "/login" },
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
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
          <Link to={"/"}>
            <div className="flex items-center font-bold cursor-pointer text-xl">
              <span className="mr-1 text-green-500">
                <FaMagnet />
              </span>
              <p>Majesco</p>
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
            {!token ? (
              <Button btnName={"Get Started"} />
            ) : (
              <Button btnName={"Logout"} action={() => logout()} />
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
