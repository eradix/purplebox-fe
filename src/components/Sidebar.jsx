import React from "react";
import {
  FaUserFriends,
  FaCar,
  FaHandHolding,
  FaRegNewspaper,
  FaBookmark,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navs = [
    {
      name: "Dashboard",
      logo: <FaBookmark className="text-md" />,
      path: "/dashboard",
    },
    {
      name: "Accounts",
      logo: <FaUserFriends className="text-md" />,
      path: "/accounts",
    },
    {
      name: "Policies",
      logo: <FaRegNewspaper className="text-md" />,
      path: "/policies",
    },
    {
      name: "Policy Holder",
      logo: <FaHandHolding className="text-md" />,
      path: "/accounts",
    },
    {
      name: "Claims",
      logo: <FaCar className="text-md" />,
      path: "/accounts",
    },
  ];

  return (
    <div className="md:mt-24 mt-16 md:pl-10 md:pr-5 md:w-1/5">
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
