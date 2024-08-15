import React from "react";
import Poster from "./Poster";
import { getPlays } from "../api/play-api/PlaysGet";
import { PlayType } from "../../types/plays";

const UpcomingPlays = () => {
  const { plays, error } = getPlays();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center ">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl pt-10 text-blackolive underline xl:p-20 md:pt-12 md:pb-6 sm:pt-8 ">
        Upcoming Performances
      </h1>
      <div className="sm:grid sm:grid-cols-3 2xl:gap-x-24 xl:gap-x-16 lg:gap-x-12 md:gap-x-6 sm:gap-x-2 lg:pb-20 md:pb-12 sm:pb-8">
        {plays.map((play: PlayType) => (
          <Poster key={play.id} play={play} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingPlays;
