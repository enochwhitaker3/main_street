import React, { useEffect, useState } from "react";
import { getCastMemberByID } from "./cast";
import { CastType } from "../../../types/cast";
import UpdateCastMemberComponent from "../../services/cast-services/HandleUpdate";

interface UpdateCastMemberByID {
  id: number;
}

const CastMemberUpdate: React.FC<UpdateCastMemberByID> = ({ id }) => {
  const [castMember, setCastMember] = useState<CastType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCastMember = async () => {
      try {
        const data = await getCastMemberByID(id);
        setCastMember(data);
      } catch (error) {
        setError(`Failed to get cast member by ID ${error}`);
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
        <h4>Cast Member with Id: {castMember?.id}</h4>
        <li key={castMember?.id}>{`Name : ${castMember?.full_name} `}</li>
      </>
      <h4>What do you want to update?</h4>
      {castMember !== null && (
        <UpdateCastMemberComponent PassedCastMember={castMember} />
      )}
    </ul>
  );
};

export default CastMemberUpdate;
