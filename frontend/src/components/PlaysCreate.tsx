// frontend/src/components/PlaysList.tsx
import React, { useEffect, useState } from "react";
import { createPlay } from "../api/plays";

const PlaysCreate: React.FC = () => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const data = await createPlay();
        setMessage(data);
      } catch (error) {
        setError("Failed to create play");
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
      <h4>Create Play</h4>
      <li>{message}</li>
    </ul>
  );
};

export default PlaysCreate;
