import React, { useState, useEffect } from "react";
import { PlayType } from "../../types/plays";
import { TicketButton } from "./TicketButton";
import { Link } from "react-router-dom";
import defaultPoster from "../images/default-poster.png"

interface PosterProps {
  play: PlayType;
}

const Poster: React.FC<PosterProps> = ({ play }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setOverlayVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".poster-container")) {
      setOverlayVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  };

  const startDate = new Date(play.start_date).toLocaleDateString(
    "en-US",
    options
  );

  const endDate = new Date(play.end_date).toLocaleDateString("en-US", options);

  const handleMouseEnter = () => {
    if (window.innerWidth > 640) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 640) {
      setIsHovered(false);
    }
  };

console.log(play.start_date)

  return (
    <div className="w-full">
      <div className="m-8 w-full px-4 mx-auto">
        <div
          className={`relative rounded-lg bg-creame shadow-lg w-18 cursor-pointer group overflow-hidden poster-container`}
          onClick={handleClick}
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
        >
          <img
            src={play.poster == "" || null ? defaultPoster : play.poster}
            alt="movie poster"
            className="rounded-lg 2xl:h-[30rem] xl:h-[25rem] lg:h-[22rem] md:h-[18rem] sm:h-[14rem] h-[20rem] w-full object-cover"
          />
          <div
            className={`absolute bottom-0 left-0 right-0 h-3/4 bg-blackolive transform ${
              isOverlayVisible || isHovered
                ? "translate-y-0"
                : "translate-y-full"
            } transition-transform duration-700 ease-in-out flex flex-col items-center justify-center`}
          >
            <ul className="text-creame px-4 lg:text-lg md:text-sm sm:text-xs">
              <li>{play.title}</li>
              <li> Directed By: {play.director}</li>
              <li>
                From {startDate} to {endDate}
              </li>
              <li className="mt-4">
                <Link to="/gettickets">
                  <TicketButton />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
