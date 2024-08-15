import React, { useState } from "react";
import { PlayType } from "../../types/plays";
import TicketButton from "./TicketButton";

interface PosterProps {
  play: PlayType;
}

const Poster: React.FC<PosterProps> = ({ play }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const handleClick = () => {
    setOverlayVisible(!isOverlayVisible);
  };

  // Define options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Convert the date to the desired format
  const startDate = new Date(play.start_date).toLocaleDateString(
    "en-US",
    options
  );
  const endDate = new Date(play.end_date).toLocaleDateString("en-US", options);

  return (
    <div className="w-full">
      <div className="m-8 w-full px-4 mx-auto">
        <div
          className={`relative rounded-lg bg-creame shadow-lg w-18 cursor-pointer group overflow-hidden ${
            isOverlayVisible ? "overlay-visible" : ""
          }`}
          onClick={handleClick}
        >
          <img
            src={play.poster}
            alt="movie poster"
            className="rounded-lg 2xl:h-[30rem] xl:h-[25rem] lg:h-[22rem] md:h-[18rem] sm:h-[14rem] h-[20rem] w-full object-cover"
          />
          <div
            className={`absolute bottom-0 left-0 right-0 h-3/4 bg-blackolive transform ${
              isOverlayVisible
                ? "translate-y-0"
                : "translate-y-full group-hover:translate-y-0"
            } transition-transform duration-700 ease-in-out flex flex-col items-center justify-center`}
          >
            <ul className="text-creame px-4 lg:text-lg md:text-sm sm:text-xs">
              <li>{play.title}</li>
              <li> Directed By: {play.director}</li>
              <li>
                From {startDate} to {endDate}
              </li>
              <li className="mt-4">
                <TicketButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;
