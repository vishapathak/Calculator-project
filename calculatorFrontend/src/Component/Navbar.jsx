
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold"
        >
          Calculator
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">


          <Link
            to="/login"
            className="hover:text-blue-200 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
};
