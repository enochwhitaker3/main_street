import React from "react";
import { Link } from "react-router-dom";
import addLogo from "../../images/add-card.svg";
import editLogo from "../../images/edit-card.svg";
import deleteLogo from "../../images/delete-card.svg";

const AdminPlayEditor = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive pt-10 xl:pb-2 underline md:pt-12 md:pb-1 sm:pt-8">
        Plays Editor
      </h1>
      <h1 className="sm:text-lg md:text-xl lg:text-3xl text-lg text-blackolive xl:pb-2  md:pb-1 ">
        What would you like to do?
      </h1>
      <div className="sm:grid grid-cols-3 ">
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <Link to="/adminplaysadd">
            <img
              className="z-20 rounded-lg shadow-xl 2xl:w-96 2xl:h-96 xl:w-80 xl:h-80 lg:w-72 lg:h-72 md:w-52 md:h-52 sm:w-40 sm:h-40 cursor-pointer"
              src={addLogo}
              alt="MST Logo"
            />
          </Link>
        </div>
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <Link to="/adminplaysedit">
            <img
              className="z-20 rounded-lg shadow-xl 2xl:w-96 2xl:h-96 xl:w-80 xl:h-80 lg:w-72 lg:h-72 md:w-52 md:h-52 sm:w-40 sm:h-40 cursor-pointer"
              src={editLogo}
              alt="MST Logo"
            />
          </Link>
        </div>
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <Link to="/adminplaysdelete">
            <img
              className="z-20 rounded-lg shadow-xl 2xl:w-96 2xl:h-96 xl:w-80 xl:h-80 lg:w-72 lg:h-72 md:w-52 md:h-52 sm:w-40 sm:h-40 cursor-pointer"
              src={deleteLogo}
              alt="MST Logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPlayEditor;
