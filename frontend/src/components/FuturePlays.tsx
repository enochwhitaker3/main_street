import React, { useState, useEffect } from "react";
import Poster from "./PosterList";
import { getPlays } from "../api/play-api/PlaysGet";
import { PlayType } from "../../types/plays";
import LoaderComponent from "./LoaderComponent";

const UpcomingPlays = () => {
  const [plays, setPlays] = useState<PlayType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPlays();
        setPlays(result.plays);
        setLoading(false);
      } catch (err) {
        setError("Failed to load plays");
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl pt-10 text-blackolive underline xl:p-20 md:pt-12 md:pb-6 sm:pt-8">
        Upcoming Performances
      </h1>
      <div className="sm:grid sm:grid-cols-3 2xl:gap-x-24 xl:gap-x-16 lg:gap-x-12 md:gap-x-6 sm:gap-x-2 lg:pb-20 md:pb-12 sm:pb-8">
        {loading ? (
          <>
            <LoaderComponent />
          </>
        ) : (
          plays.map((play: PlayType) => <Poster key={play.id} play={play} />)
        )}
      </div>
    </div>
  );
};

export default UpcomingPlays;
