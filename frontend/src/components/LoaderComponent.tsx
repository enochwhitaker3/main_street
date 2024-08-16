import React from "react";
import "./loader-styles.css";

const LoaderComponent = () => {
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-12 h-12 border-8 border-teal rounded-full loader"></div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-12 h-12 border-8 border-opensky rounded-full loader"></div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-12 h-12 border-8 border-salmon rounded-full loader"></div>
      </div>
    </>
  );
};

export default LoaderComponent;
