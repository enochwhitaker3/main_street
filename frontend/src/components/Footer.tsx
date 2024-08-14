import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-teal text-creame py-8 text-center flex items-center justify-center ">
      <div className="flex justify-center items-center space-x-2 ">
        <p>Main Street Playhouse</p>
        <a className="cursor-pointer hover:text-teal">©</a>
        <p>2024</p>
        <a
          href="https://www.facebook.com/tremontonplayhouse"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookSquare className="text-creame cursor-pointer" size={25} />
        </a>
        <a
          href="https://www.instagram.com/playhousemainstreet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSquareInstagram className="text-creame cursor-pointer" size={25} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
