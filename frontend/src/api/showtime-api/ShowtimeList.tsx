import React, { useEffect, useState } from "react";
import { getAllShowtimes } from "./showtimes";
import { ShowtimeType } from "../../../types/showtimes";

const ShowtimeList: React.FC = () => {
  const [showtimes, setShowtimes] = useState<ShowtimeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const data = await getAllShowtimes();
        setShowtimes(data);
      } catch (error) {
        setError(`Failed to load showtimes: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      <h4>All Showtimes</h4>
      {showtimes.map((showtime) => (
        <li key={showtime.id}>
          {` Date: ${showtime?.play_date} | Start Time: ${showtime?.start_time}`}
        </li>
      ))}
    </ul>
  );
};

export default ShowtimeList;
