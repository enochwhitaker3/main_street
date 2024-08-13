// frontend/src/components/PlaysList.tsx
import React, { useEffect, useState } from "react";
import { deletePlayByID } from "../api/plays";

interface PlaysDeleteProps {
  id: number;
}

const PlaysDelete: React.FC<PlaysDeleteProps> = ({id}) => {
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

export default PlaysDelete;
