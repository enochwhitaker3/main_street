import React from "react";
import sponsorLogo from "../images/sponsor-card.svg";
import playLogo from "../images/plays-card.svg";
import { Link } from "react-router-dom";

const AdminHub = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive pt-10 xl:pb-2 underline md:pt-12 md:pb-1 sm:pt-8">
        Welcome Back!
      </h1>
      <h1 className="sm:text-lg md:text-xl lg:text-3xl text-lg text-blackolive xl:pb-2  md:pb-1 ">
        What would you like to do?
      </h1>
      <div className="sm:grid grid-cols-2 2xl:gap-x-28 xl:gap-x-24 lg:gap-x-16 md:gap-x-12 sm:gap-x-8">
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <Link to="/adminplays">
            <img
              className="z-20 rounded-lg shadow-xl 2xl:w-96 2xl:h-96 xl:w-80 xl:h-80 lg:w-72 lg:h-72 md:w-60 md:h-60 sm:w-56 sm:h-56 cursor-pointer"
              src={playLogo}
              alt="MST Logo"
            />
          </Link>
        </div>
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <Link to="/adminsponsors">
            <img
              className="z-20 rounded-lg shadow-xl 2xl:w-96 2xl:h-96 xl:w-80 xl:h-80 lg:w-72 lg:h-72 md:w-60 md:h-60 sm:w-56 sm:h-56 cursor-pointer"
              src={sponsorLogo}
              alt="MST Logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHub;
