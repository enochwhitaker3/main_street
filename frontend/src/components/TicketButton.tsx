import React from "react";
import { FaTicket } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const TicketButton = () => {
  return (
    <button className="bg-creame text-blackolive flex flex-row justify-center items-center p-1 rounded-lg">
      Get Tickets <FaTicket className="ml-2" />
    </button>
  );
};

export const InvertedTicketButton = () => {
  return (
    <button className="bg-blackolive text-creame md:text-sm sm:text-xs sm:mt-10 mb-10 mt-5 sm:w-1/3 w-1/2 h-10 text-sm flex justify-center items-center p-1 rounded-lg">
      <Link to="/gettickets" className="flex items-center">
        Get Tickets <FaTicket className="ml-2" />
      </Link>
    </button>
  );
};
