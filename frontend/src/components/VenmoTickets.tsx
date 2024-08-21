import React from "react";
import venmoLogo from "../images/venmo.svg";

const CurrentlyShowing = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive underline pt-10 xl:pb-2 md:pt-12 md:pb-1 sm:pt-8">
        Purchase Tickets
      </h1>
      <div className="sm:grid grid-cols-2 2xl:gap-x-28 xl:gap-x-24 lg:gap-x-16 md:gap-x-12 sm:gap-x-8">
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <a
            href="https://venmo.com/JuDean-Parkinson"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="z-20 rounded-lg shadow-xl 2xl:w-96 2xl:h-96 xl:w-80 xl:h-80 lg:w-72 lg:h-72 md:w-60 md:h-60 sm:w-56 sm:h-56 cursor-pointer"
              src={venmoLogo}
              alt="MST Logo"
            />
          </a>
        </div>

        <h1 className="xl:pr-40 md:pr-20 sm:pr-20 sm:text-lg md:text-xl lg:text-2xl text-lg mb-10 sm:pt-10 text-blackolive sm:text-start justify-center text-center">
          <span className="underline">NOTICE</span>
          <span className="block mb-8">
            At the time we cannot accept online transcations of credit/debit
            cards, if you wish to pay online please use the link on the left.
            Tickets are also always available to purchase in person.
          </span>
          <span className="block underline">
            Each ticket is 10 Dollars, make sure to include the name of the play house
            wish to see & your name in the message. 
          </span>
        </h1>
      </div>
    </div>
  );
};

export default CurrentlyShowing;
