import React, { useState } from "react";
import mstLogo from "../images/transparent_mst.png";
import { HiOutlineMenu } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import "./navbar-styles.css";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-full flex justify-between p-4 pr-8  pl-8   items-center z-20 bg-salmon">
      <Link to="/">
        <img
          className="h-16 w-16 z-20 cursor-pointer"
          src={mstLogo}
          alt="MST Logo"
        />
      </Link>

      <nav className="hidden sm:flex justify-between xl:w-2/6 lg:w-2/5 md:w-1/2 sm:w-3/5 2xl:text-xl xl:texl-lg lg:text-base md:text-sm sm:text-xs">
        <div
          className={`${
            pathname == "/currentlyshowing"
              ? `link-underline-teal-perm`
              : `link-underline link-underline-teal`
          } text-creame cursor-pointer`}
        >
          <Link to="/currentlyshowing">Currently Showing</Link>
        </div>
        <div
          className={`${
            pathname == "/gettickets"
              ? `link-underline-sky-perm`
              : `link-underline link-underline-sky`
          } text-creame cursor-pointer`}
        >
          <Link to="/gettickets">Tickets</Link>
        </div>
        <div
          className={`${
            pathname == "/aboutus"
              ? `link-underline-teal-perm`
              : `link-underline link-underline-teal`
          } text-creame cursor-pointer`}
        >
          <Link to="/aboutus">About Us</Link>
        </div>
        <div
          className={`${
            pathname == "/contactus"
              ? `link-underline-sky-perm`
              : `link-underline link-underline-sky`
          } text-creame cursor-pointer`}
        >
          Contact Us
        </div>
      </nav>
      <div className="block sm:hidden">
        <HiOutlineMenu
          className="text-creame cursor-pointer"
          size={25}
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      </div>
      <div
        className={`absolute sm:hidden top-24 left-0 w-full bg-salmon flex flex-col items-center gap-6 text-lg transform transition-transform z-20 ${
          isMenuOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        {isMenuOpen && (
          <>
            <div
              className={`${
                pathname == "/currentlyshowing"
                  ? `link-underline-teal-perm`
                  : `link-underline link-underline-teal`
              } text-creame cursor-pointer`}
            >
              <Link to="/currentlyshowing">Currently Showing</Link>
            </div>
            <div
              className={`${
                pathname == "/gettickets"
                  ? `link-underline-sky-perm`
                  : `link-underline link-underline-sky`
              } text-creame cursor-pointer`}
            >
              <Link to="/gettickets">Tickets</Link>
            </div>
            <div
              className={`${
                pathname == "/aboutus"
                  ? `link-underline-teal-perm`
                  : `link-underline link-underline-teal`
              } text-creame cursor-pointer`}
            >
              <Link to="/aboutus">About Us</Link>
            </div>
            <div
              className={`${
                pathname == "/contactus"
                  ? `link-underline-sky-perm`
                  : `link-underline link-underline-sky`
              } text-creame cursor-pointer`}
            >
              <Link to="/contactus">Contact Us</Link>
            </div>
            <div
              className={`${
                pathname == "/contactus"
                  ? `link-underline-sky-perm`
                  : `link-underline link-underline-sky`
              } text-creame cursor-pointer`}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
