import React from "react";

const Hero = () => {
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="hidden sm:flex absolute top-0 left-0 w-full md:h-1/2 sm:h-2/6 bg-salmon z-10" />
        <div className="hidden sm:flex absolute lg:left-20 lg:right-20 md:h-3/5 sm:left-10 sm:right-10 sm:h-2/5 z-10">
          <img
            src="https://images.pexels.com/photos/6896181/pexels-photo-6896181.jpeg/"
            alt="Stage performance"
            className="xs:hidden relative w-full h-full object-cover z-20"
          />
          <div className="absolute bottom-[.5px] md:h-1/5 md:w-1/5 sm:h-1/4 sm:w-1/4  flex flex-col justify-center items-center bg-blackolive text-creame p-4 rounded z-30">
            <h2 className="text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Hometown Feel</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
