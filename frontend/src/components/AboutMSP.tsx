import React from "react";
import msp from "../images/msp.png";

const AboutMSP = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive underline pt-10 xl:pb-2 md:pt-12 md:pb-1 sm:pt-8">
        About The Playhouse
      </h1>
      <div className="sm:grid grid-cols-2 2xl:gap-x-28 xl:gap-x-24 lg:gap-x-16 md:gap-x-12 sm:gap-x-8">
        <div className="p-10 z-20 sm:pt-10 w-full h-full flex justify-end">
          <img
            className="z-20 rounded-lg shadow-xl 2xl:w-[30rem] 2xl:h-[30rem] xl:w-96 xl:h-96 lg:w-80 lg:h-80 md:w-72 md:h-72 sm:w-60 sm:h-60"
            src={msp}
            alt="MST Logo"
          />
        </div>

        <h1 className="xl:pr-40 md:pr-10 sm:pr-5 sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-lg mb-10 pl-5 pr-5 sm:pt-10  text-blackolive sm:text-start justify-center text-center">
          <span className="block mb-8">
            The Main Street Playhouse is a cherished, locally run non-profit
            theater nestled in the heart of the Bear River Valley. Since its
            founding in 2014 by Judean and Blake Parkinson, the playhouse has
            been dedicated to enriching the local community through the
            performing arts. What started as a passion project for Judean and
            Blake quickly grew into a beloved cultural hub, where neighbors come
            together to enjoy high-quality performances, from classic plays to
            contemporary works. With a deep commitment to fostering local talent
            and providing affordable entertainment, the Main Street Playhouse
            continues to be a beacon of creativity and community spirit.
          </span>
        </h1>
      </div>
    </div>
  );
};

export default AboutMSP;
