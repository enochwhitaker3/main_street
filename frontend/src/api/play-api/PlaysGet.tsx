import React, { useEffect, useState } from "react";
import { getPlayByID } from "./plays";
import { PlayType } from "../../../types/plays";

interface PlaysGetProps {
  id: number;
}

const PlaysGet: React.FC<PlaysGetProps> = ({ id }) => {
  const [play, setPlay] = useState<PlayType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const data = await getPlayByID(id);
        setPlay(data);
      } catch (error) {
        console.log(error);
        setError("Failed to get play by ID");
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
      <>
        <h4>Returned Play with Id: {play?.id}</h4>
        <li key={play?.id}>
          {`Name: ${play?.title} | Director: ${play?.director} | Sponsor: ${play?.sponsor_id} | Start Date: ${play?.start_date} | End Date: ${play?.end_date}`}
        </li>
      </>
    </ul>
  );
};

export default PlaysGet;
