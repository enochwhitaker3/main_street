import React, { useEffect, useState } from "react";
import { getShowtimeByID } from "./showtimes";
import UpdateSponsorComponent from "../../services/showtime-services/HandleUpdate";
import { ShowtimeType } from "../../../types/showtimes";

interface UpdateShowtimeByID {
  id: number;
}

const ShowtimeUpdate: React.FC<UpdateShowtimeByID> = ({ id }) => {
  const [showtime, setShowtime] = useState<ShowtimeType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const data = await getShowtimeByID(id);
        setShowtime(data);
      } catch (error) {
        setError(`Failed to get showtime by ID ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtime();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      <>
        <h4>Showtime with Id: {showtime?.id}</h4>
        <li key={showtime?.id}>
          {` Date: ${showtime?.play_date} | Start Time: ${showtime?.start_time}`}
        </li>
      </>
      <h4>What do you want to update?</h4>
      {showtime !== null && (
        <UpdateSponsorComponent PassedShowtime={showtime} />
      )}
    </ul>
  );
};

export default ShowtimeUpdate;
