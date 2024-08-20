import React, { useEffect, useState } from "react";
import { deleteShowtimeByID } from "./showtimes";

interface ShowtimeDeleteProps {
  id: number;
}

const ShowtimeDelete: React.FC<ShowtimeDeleteProps> = ({ id }) => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const data = await deleteShowtimeByID(id);
        setMessage(`${data}`);
      } catch (error) {
        setMessage(`No showtime was found with given ID ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtime();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      <li>{message}</li>
    </ul>
  );
};

export default ShowtimeDelete;
