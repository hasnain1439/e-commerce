import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-gray-300 px-[5%] py-5 shadow-xl sticky top-0 right-0">
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
      <div>
        <button onClick={()=> navigate("/login")} className="px-7 py-2 bg-blue-500  rounded-md text-white">Login</button>
      </div>
    </div>
  );
}

export default Navbar;
