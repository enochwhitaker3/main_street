import React, { useEffect, useState } from "react";
import { deleteSponsorByID } from "./sponsors";

interface SponsorDeleteProps {
  id: number;
}

const SponsorDelete: React.FC<SponsorDeleteProps> = ({ id }) => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedSponsor = async () => {
      try {
        const data = await deleteSponsorByID(id);
        setMessage(data);
      } catch (error) {
        console.log(error);
        setMessage("No sponsor was found with given ID");
      } finally {
        setLoading(false);
      }
    };

    fetchedSponsor();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <ul>
      <li>{message}</li>
    </ul>
  );
};

export default SponsorDelete;
