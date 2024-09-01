import React from "react";
import { PlayType } from "../../types/plays";
import defaultPoster from "../images/default-poster.png"

interface PosterProps {
  play: PlayType;
}

const DisplayPoster: React.FC<PosterProps> = ({ play }) => {
  return (
    <div className="">
      <div className="m-8 2xl:w-[25rem] xl:w-[21.5rem] lg:w-[18rem] md:w-[15.5rem] sm:w-[13.5rem] w-[15rem] px-4 mx-auto">
        <div
          className={`relative rounded-lg bg-creame shadow-lg cursor-pointer group overflow-hidden poster-container`}
        >
          <img
            src={play.poster == "" || null ? defaultPoster : play.poster}
            alt="movie poster"
            className="rounded-lg 2xl:h-[35rem] xl:h-[30rem] lg:h-[24.5rem] md:h-[21rem] sm:h-[17.5rem] h-[20rem] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayPoster;
