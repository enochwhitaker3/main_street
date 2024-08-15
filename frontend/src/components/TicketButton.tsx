import React from "react";
import { FaTicket } from "react-icons/fa6";

const TicketButton = () => {
  return (
    <button className="bg-creame text-blackolive flex flex-row justify-center items-center p-1 rounded-lg">
      Get Tickets <FaTicket className="ml-2" />
    </button>
  );
};

export default TicketButton;
