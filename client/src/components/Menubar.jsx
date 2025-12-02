import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Menubar = () => {
  const [MenuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white px-8 py-4 flex justify-between items-center">
        {/* left side : logo with Text */}
        <Link to={"/"} className="flex items-center space-x-2">
          <img
            src={assets.logo}
            alt="logo"
            className="h-8 w-8 object-contain cursor-pointer"
          />
          <span className="text-2xl font-semibold text-indigo-700 cursor-pointer">
            remove.<span className="text-gray-400 cursor-pointer">bg</span>
          </span>
        </Link>

        {/* Right side : Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-700 hover:text-blue-500 font-medium">
            Login
          </button>

          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-full transition cursor-pointer">
            Sign up
          </button>
        </div>

        {/* Mobile Homburger */}
        <div className="flex md:hidden">
          <button onClick={() => setMenuOpen(!MenuOpen)}>
            {MenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {MenuOpen && (
          <div className="absolute top-16 right-8 bg-white shadow-md flex flex-col space-y-4 w-40">
            <button className="text-gray-700 hover:text-blue-500 font-medium">
              Login
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-full transition cursor-pointer">
              Sign up
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Menubar;
