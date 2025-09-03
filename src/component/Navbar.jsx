import React from "react";
import { AiFillBell } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-gray-300 px-[5%] py-5 shadow-xl sticky top-0 right-0 z-[1]">
      <ul className="flex gap-3">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 ${
                isActive ? "bg-blue-500 text-white rounded-md" : "text-black"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-3 py-2 ${
                isActive ? "bg-blue-500 text-white rounded-md" : "text-black"
              }`
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `px-3 py-2 ${
                isActive ? "bg-blue-500 text-white rounded-md" : "text-black"
              }`
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Link to={"/blank"} className="relative">
            <div className="absolute top-0 start-0.5 rounded-full p-1 bg-red-600"></div>
            <AiFillBell className="text-3xl" />
          </Link>
          <Link to={"/cart"} className="relative">
            <div className="absolute top-0  start-0 rounded-full p-1 bg-red-600"></div>
            <FaCartShopping  className="text-3xl"/>
          </Link>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="px-7 py-2 bg-blue-500  rounded-md text-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
