import React from "react";
import {
  FaUserFriends,
  FaCar,
  FaHandHolding,
  FaRegNewspaper,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navs = [
    {
      name: "Accounts",
      logo: <FaUserFriends className="text-md" />,
      path: "/accounts",
    },
    {
      name: "Cakes",
      logo: <FaRegNewspaper className="text-md" />,
      path: "/policies",
    },
    {
      name: "Orders",
      logo: <FaHandHolding className="text-md" />,
      path: "/accounts",
    },
    {
      name: "Logout",
      logo: <FaCar className="text-md" />,
      path: "/accounts",
    },
  ];

  return (
    <div className=" md:pl-10 md:pr-5 md:w-3/12">
      <ul className="flex justify-between items-center md:block">
        {navs.map((item, id) => (
          <Link key={id} to={item.path} className="w-full">
            <li
              className="md:pl-3 py-5 border-b-2 hover:bg-green-400 transition-all duration-100 flex items-center justify-center md:justify-start"
              key={id}
            >
              {item.logo}
              <p className="hidden md:block ml-1 text-sm">{item.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
