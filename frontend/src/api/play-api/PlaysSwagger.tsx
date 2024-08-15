import React, { useEffect, useState } from "react";
import { deletePlayByID, getAllPlays, getPlayByID } from "./plays";
import { PlayType } from "../../../types/plays";
import CreatePlayComponent from "../../services/play-services/HandleCreate";
import UpdatePlayComponent from "../../services/play-services/HandleUpdate";

export const PlaysList: React.FC = () => {
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

interface PlaysGetProps {
  id: number;
}

export const PlaysGet: React.FC<PlaysGetProps> = ({ id }) => {
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

interface PlaysDeleteProps {
  id: number;
}

export const PlaysDelete: React.FC<PlaysDeleteProps> = ({ id }) => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const data = await deletePlayByID(id);
        setMessage(data);
      } catch (error) {
        console.log(error);
        setMessage("No play was found with given ID");
      } finally {
        setLoading(false);
      }
    };

    fetchPlays();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      <li>{message}</li>
    </ul>
  );
};

export const PlaysCreate: React.FC = () => {
  const tempPlay: Omit<PlayType, "id"> = {
    sponsor_id: 1,
    title: "",
    start_date: new Date(),
    end_date: new Date(),
    poster: "",
    director: "",
  };

  return (
    <ul>
      <h4>Create Play</h4>
      {tempPlay !== null && <CreatePlayComponent PassedPlay={tempPlay} />}
    </ul>
  );
};

interface UpdatePlayByID {
  id: number;
}

export const PlaysUpdate: React.FC<UpdatePlayByID> = ({ id }) => {
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

