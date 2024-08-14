import React, { useEffect, useState } from "react";
import { getAllPlays } from "./plays";
import { PlayType } from "../../../types/plays";

const PlaysList: React.FC = () => {
  const [plays, setPlays] = useState<PlayType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const data = await getAllPlays();
        setPlays(data);
      } catch (error) {
        setError("Failed to load plays DUDE HERES WHY LOL:");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlays();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      <h4>All Plays</h4>
      {plays.map((play) => (
        <li key={play.id}>
          {`Name: ${play.title} | Director: ${play.director} | Sponsor: ${play.sponsor_id} | Start Date: ${play.start_date} | End Date: ${play.end_date}`}
        </li>
      ))}
    </ul>
  );
};

export default PlaysList;
