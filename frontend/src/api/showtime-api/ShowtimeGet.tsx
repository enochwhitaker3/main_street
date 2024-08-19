import React, { useEffect, useState } from "react";
import { getShowtimeByID } from "./showtimes";
import { ShowtimeType } from "../../../types/showtimes";

interface ShowtimeGetProps {
  id: number;
}

const ShowtimesGet: React.FC<ShowtimeGetProps> = ({ id }) => {
  const [showtime, setShowtime] = useState<ShowtimeType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const data = await getShowtimeByID(id);
        setShowtime(data);
      } catch (error) {
        setError(`Failed to get showtime by ID ${error}`);
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
      <>
        <h4>Returned showtime with Id: {showtime?.id}</h4>
        <li key={showtime?.id}>
        {` Date: ${showtime?.play_date} | Start Time: ${showtime?.start_time}`}
        </li>
      </>
    </ul>
  );
};



export default ShowtimesGet;
