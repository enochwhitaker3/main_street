import React, { useEffect, useState } from "react";
import { getAllShowtimesByPlayID } from "./showtimes";
import { ShowtimeType } from "../../../types/showtimes";

interface ShowtimeGetProps {
  id: number;
}

const ShowtimeGetByPlay: React.FC<ShowtimeGetProps> = ({ id }) => {
  const [showtimes, setShowtime] = useState<ShowtimeType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const data = await getAllShowtimesByPlayID(id);
        setShowtime(data);
      } catch (error) {
        setError(`Failed to get showtime by play ID ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtime();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!showtimes) return <p>No found showtimes for this play</p>;
  return (
    <ul>
      <h4>All showtimes of play {id}</h4>
      {showtimes.map((showtime) => (
        <li key={showtime.id}>
          {`Doors Open: ${showtime.doors_open} | Start Time: ${showtime.start_time} | End Time: ${showtime.end_time} `}
        </li>
      ))}
    </ul>
  );
};

export default ShowtimeGetByPlay;
