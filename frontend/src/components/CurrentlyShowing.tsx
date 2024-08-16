import React, { useState, useEffect } from "react";
import { getPlayByDate } from "../api/play-api/PlaysGet";
import { PlayType } from "../../types/plays";
import LoaderComponent from "./LoaderComponent";
import DisplayPoster from "./DisplayPoster";
import { InvertedTicketButton } from "./TicketButton";

const CurrentlyShowing = () => {
  const [play, setPlay] = useState<PlayType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const optionsWithoutYear: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPlayByDate();
        setPlay(result.plays);
        setLoading(false);
      } catch (err) {
        setError("Failed to load play");
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (play == undefined) {
    return <p>Failed to fetch play</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const startDate = new Date(play?.start_date).toLocaleDateString(
    "en-US",
    optionsWithoutYear
  );

  const end_date = new Date(play?.end_date).toLocaleDateString(
    "en-US",
    options
  );

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive underline pt-10 xl:pb-2 md:pt-12 md:pb-1 sm:pt-8">
        Currently Showing
      </h1>
      <div className="sm:grid grid-cols-2 xl:gap-x-16 lg:gap-x-4">
        {loading && play != undefined ? (
          <>
            <LoaderComponent />
          </>
        ) : (
          <>
            <DisplayPoster play={play} />
            <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl sm:pt-10 text-blackolive sm:text-start justify-center text-center">
              {play.title}
              <span className="flex flex-col sm:text-xl md:text-xl lg:text-[1.7rem] text-xl text-blackolive">
                Directed by: {play.director}
              </span>
              <span className="flex flex-col sm:text-xl md:text-xl lg:text-[1.7rem] text-xl text-blackolive">
                {startDate} - {end_date}
              </span>
              <div className="flex sm:justify-start justify-center pt-4">
                <InvertedTicketButton />
              </div>
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default CurrentlyShowing;
