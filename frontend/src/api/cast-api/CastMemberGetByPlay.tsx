import React, { useEffect, useState } from "react";
import { getAllCastMemebersByPlayID } from "./cast";
import { CastType } from "../../../types/cast";

interface CastMemberGetProps {
  id: number;
}

const CastMembersGetByPlay: React.FC<CastMemberGetProps> = ({ id }) => {
  const [castMembers, setCastMembers] = useState<CastType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCastMembers = async () => {
      try {
        const data = await getAllCastMemebersByPlayID(id);
        setCastMembers(data);
      } catch (error) {
        setError(`Failed to get cast members by play ID, ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCastMembers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!castMembers) return <p>No found cast members for this play</p>;
  return (
    <ul>
      <h4>All cast members of play {id}</h4>
      {castMembers.map((cast) => (
        <li key={cast.id}>{`Name: ${cast.full_name}`}</li>
      ))}
    </ul>
  );
};

export default CastMembersGetByPlay;
