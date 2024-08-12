// frontend/src/components/PlaysList.tsx
import React, { useEffect, useState } from "react";
import { deletePlayByID } from "../api/plays";

const PlaysDelete: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const data = await deletePlayByID(11);
        setMessage(data);
      } catch (error) {
        setError("Failed to get play by ID");
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
      <h4>Delete Play</h4>
      <li>{message}</li>
    </ul>
  );
};

export default PlaysDelete;
