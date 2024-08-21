import React, { useState, useEffect } from "react";
import { getPlayByDate } from "../api/play-api/PlaysService";
import { PlayType } from "../../types/plays";
import LoaderComponent from "./LoaderComponent";
import DisplayPoster from "./DisplayPoster";
import { InvertedTicketButton } from "./TicketButton";
import { getSponsorById } from "../api/sponsor-api/SponsorsService";
import { SponsorType } from "../../types/sponsors";
import Accordion from "./Accordion";
import { ShowtimeType } from "../../types/showtimes";
import { getAllShowtimesByPlayID } from "../api/showtime-api/showtimes";

const CurrentlyShowing = () => {
  const [play, setPlay] = useState<PlayType>();
  const [sponsor, setSponsor] = useState<SponsorType>();
  const [showtimes, setShowtimes] = useState<ShowtimeType[]>([]);
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

  const accordionItems = [
    {
      title: "Showtimes",
      content: (
        <div>
          {showtimes.map((showtime) => (
            <p
              key={showtime.id}
              className=" text-base sm:text-sm md:text-lg"
            >
              {new Date(showtime.play_date).toLocaleDateString(
                "en-US",
                optionsWithoutYear
              )}{" "}
              at {showtime.start_time}
            </p>
          ))}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPlayByDate();
        setPlay(result.plays);
        if (result.plays) {
          const showtimes = await getAllShowtimesByPlayID(result.plays.id);
          setShowtimes(showtimes);
        }
        setLoading(false);
      } catch (err) {
        setError(`Failed to load play ${err}`);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSponsor = async () => {
      if (play != undefined && play.sponsor_id != null) {
        try {
          const result2 = await getSponsorById(play.sponsor_id);
          setSponsor(result2);
          setLoading(false);
        } catch (err) {
          console.error("Failed to load sponsor:", err);
          setError("Failed to load sponsor");
          setLoading(false);
        }
      }
    };

    fetchSponsor();
  }, [play]);

  if (play == undefined || loading) {
    return (
      <div className="h-screen flex items-center justify-center pr-50">
        <LoaderComponent />
      </div>
    );
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
            <h1 className="sm:text-3xl md:text-4xl xl:text-5xl text-3xl sm:pt-10 text-blackolive sm:text-start justify-center text-center">
              {play.title}
              <span className="flex flex-col sm:text-xl md:text-xl xl:text-[1.7rem] text-xl text-blackolive">
                Directed by: {play.director}
              </span>
              {sponsor ? (
                <span className="flex flex-col sm:text-xl md:text-xl xl:text-[1.7rem] text-xl text-blackolive">
                  Sponsor: {sponsor?.sponsor_name}
                </span>
              ) : (
                ""
              )}
              <span className="flex flex-col sm:text-xl md:text-xl xl:text-[1.7rem] text-xl text-blackolive">
                {startDate} - {end_date}
              </span>
              {showtimes.length > 0 && <Accordion items={accordionItems} />}

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
