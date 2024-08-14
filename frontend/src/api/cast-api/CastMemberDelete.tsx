import React, { useEffect, useState } from "react";
import { deleteCastMemberByID } from "./cast";

interface CastMemberDeleteProps {
  id: number;
}

const CastMemberDelete: React.FC<CastMemberDeleteProps> = ({ id }) => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCastMember = async () => {
      try {
        const data = await deleteCastMemberByID(id);
        setMessage(data);
      } catch (error) {
        console.log(error);
        setMessage("No cast member was found with given ID");
      } finally {
        setLoading(false);
      }
    };

    fetchCastMember();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      <li>{message}</li>
    </ul>
  );
};

export default CastMemberDelete;
