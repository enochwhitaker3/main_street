import React, { useState } from "react";
import mstLogo from "../images/transparent_mst.png";
import { HiOutlineMenu } from "react-icons/hi";
import "./navbar-styles.css";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-between p-4 pr-8 sm:pr-14 pl-8 sm:pl-14  items-center z-20 bg-salmon">
      <img
        className="h-16 w-16 z-20 cursor-pointer"
        src={mstLogo}
        alt="MST Logo"
      />
      <nav className="hidden sm:flex justify-between xl:w-2/6 lg:w-2/5 md:w-1/2 sm:w-3/5 2xl:text-xl xl:texl-lg lg:text-base md:text-sm sm:text-xs">
        <a className="link-underline link-underline-teal text-creame cursor-pointer">
          Currently Showing
        </a>
        <a className="link-underline link-underline-sky text-creame cursor-pointer">
          Tickets
        </a>
        <a className="link-underline link-underline-teal text-creame cursor-pointer">
          About Us
        </a>
        <a className="link-underline link-underline-sky text-creame cursor-pointer">
          Contact Us
        </a>
      </nav>
      <div className="block sm:hidden">
        <HiOutlineMenu
          className="text-creame cursor-pointer"
          size={25}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      </div>
      <div
        className={`absolute sm:hidden top-24 left-0 w-full bg-salmon flex flex-col items-center gap-6 text-lg transform transition-transform ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <a className="w-full text-center p-4 text-creame link-underline link-underline-teal cursor-pointer">Currently Showing</a>
        <a className="w-full text-center p-4 text-creame link-underline link-underline-teal cursor-pointer">Tickets</a>
        <a className="w-full text-center p-4 text-creame link-underline link-underline-teal cursor-pointer">About Us</a>
        <a className="w-full text-center p-4 text-creame link-underline link-underline-teal cursor-pointer">Contact Us</a>
      </div>
    </div>
  );
};

export default Navbar;
