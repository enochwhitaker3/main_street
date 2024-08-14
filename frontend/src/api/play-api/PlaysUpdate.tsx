import React, { useEffect, useState } from "react";
import { getPlayByID } from "./plays";

import { PlayType } from "../../../types/plays";
import UpdatePlayComponent from "../../services/play-services/HandleUpdate";

interface UpdatePlayByID {
  id: number;
}

const PlaysUpdate: React.FC<UpdatePlayByID> = ({ id }) => {
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
        <h4>Play with Id: {play?.id}</h4>
        <li key={play?.id}>
          {`Name: ${play?.title} | Director: ${play?.director} | Sponsor: ${play?.sponsor_id} | Start Date: ${play?.start_date} | End Date: ${play?.end_date}`}
        </li>
      </>
      <h4>What do you want to update?</h4>
      {play !== null && <UpdatePlayComponent PassedPlay={play} />}
    </ul>
  );
};

export default PlaysUpdate;
