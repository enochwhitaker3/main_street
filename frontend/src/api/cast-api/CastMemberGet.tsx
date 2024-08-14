import React, { useEffect, useState } from "react";
import { getCastMemberByID } from "./cast";
import { CastType } from "../../../types/cast";

interface CastMemberGetProps {
  id: number;
}

const CastMemberGet: React.FC<CastMemberGetProps> = ({ id }) => {
  const [castMember, setCastMember] = useState<CastType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCastMember = async () => {
      try {
        const data = await getCastMemberByID(id);
        setCastMember(data);
      } catch (error) {
        console.log(error);
        setError("Failed to get cast member by ID");
      } finally {
        setLoading(false);
      }
    };

    fetchCastMember();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      <>
        <h4>Returned cast member with Id: {castMember?.id}</h4>
        <li key={castMember?.id}>{`Name: ${castMember?.full_name}`}</li>
      </>
    </ul>
  );
};

export default CastMemberGet;
