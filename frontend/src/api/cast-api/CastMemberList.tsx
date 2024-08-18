import React, { useEffect, useState } from "react";
import { getAllCastMembers } from "./cast";
import { CastType } from "../../../types/cast";

const CastMemberList: React.FC = () => {
  const [castMembers, setCastMembers] = useState<CastType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCastMembers = async () => {
      try {
        const data = await getAllCastMembers();
        setCastMembers(data);
      } catch (error) {
        setError(`Failed to load cast members:${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCastMembers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      <h4>All Cast Members</h4>
      {castMembers.map((cast) => (
        <li key={cast.id}>
          {`Name : ${cast.full_name} `}
        </li>
      ))}
    </ul>
  );
};

export default CastMemberList;
