import React, { useState } from "react";
import map from "../images/map.png";
import phone from "../images/phone_svg.svg";
import location from "../images/location_svg.svg";

const ContactMSP = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive underline pt-10 xl:pb-2 md:pt-12 md:pb-1 sm:pt-8">
        Contact Us
      </h1>
      <div className="sm:grid grid-cols-2">
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <img
            className="z-10 rounded-lg shadow-xl 2xl:w-[30rem] 2xl:h-[30rem] xl:w-96 xl:h-96 lg:w-80 lg:h-80 md:w-72 md:h-72 sm:w-60 sm:h-60"
            src={map}
            alt="MST Logo"
          />
        </div>

        <h1 className="xl:pr-40 sm:pr-10 sm:text-2xl md:text-3xl lg:text-4xl text-lg mb-10 sm:pt-16 md:pt-24 lg:pt-32 text-blackolive sm:text-start text-center">
          <span
            onClick={() => handleCopy("11 E Main St, Tremonton, UT 84337")}
            className="mb-8 flex items-center justify-center sm:justify-start hover:underline hover:cursor-pointer"
          >
            <img
              src={location}
              className="sm:w-10 sm:h-10 sm:mr-5 w-5 h-5 mr-1"
            ></img>
            11 E Main St, Tremonton, UT 84337
          </span>
          <span
            onClick={() => handleCopy("(435) 730-3907")}
            className="flex items-center justify-center sm:justify-start hover:underline hover:cursor-pointer"
          >
            <img
              src={phone}
              className="sm:w-10 sm:h-10 sm:mr-5 w-5 h-5 mr-1"
            ></img>
            (435) 730-3907
          </span>
          {copied && (
            <div className="mt-2 text-green-600 text-sm">
              {copied === "11 E Main St, Tremonton, UT 84337"
                ? "Address copied to clipboard!"
                : "Phone number copied to clipboard!"}
            </div>
          )}
        </h1>
      </div>
    </div>
  );
};

export default ContactMSP;
