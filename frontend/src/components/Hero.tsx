import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import mstPicture from "../images/mst1.png";
import mstPicture2 from "../images/mst2.png";
import mstPicture3 from "../images/mst3.png";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const images = [
    { src: mstPicture, alt: "Stage performance 1", message: "Hometown Feel" },
    { src: mstPicture2, alt: "Stage performance 2", message: "Community Stage" },
    { src: mstPicture3, alt: "Stage performance 3", message: "Stage Magic" },
  ];

  return (
    <div className="w-full xl:h-[35rem] lg:h-[28rem] md:h-[21rem] sm:h-[14rem] relative z-20">
      <div className="hidden sm:flex absolute top-0 left-0 w-full h-5/6 bg-salmon z-10" />
      <div className="hidden sm:flex absolute h-full lg:left-20 sm:left-10 lg:right-20 sm:right-10 z-10">
        <Slider {...settings} className="relative w-full">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.src}
                alt={image.alt}
                className="xs:hidden w-full xl:h-[35rem] lg:h-[28rem] md:h-[21rem] sm:h-[14rem] object-cover z-20"
              />
              <div className="absolute bottom-[.5px] md:h-1/5 md:w-1/5 sm:h-1/4 sm:w-1/4 flex flex-col justify-center items-center bg-blackolive text-creame p-4 rounded z-30">
                <h2 className="text-xs sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                  {image.message}
                </h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
