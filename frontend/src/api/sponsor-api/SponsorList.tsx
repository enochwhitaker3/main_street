import React, { useEffect, useState } from "react";
import { getAllSponsors } from "./sponsors";
import { SponsorType } from "../../../types/sponsors";

const SponsorsList: React.FC = () => {
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getAllSponsors();
        setSponsors(data);
      } catch (error) {
        setError("Failed to load sponsors");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      <h4>All Sponsors</h4>
      {sponsors.map((sponsor) => (
        <li key={sponsor.id}>
          {`Name: ${sponsor.sponsor_name} | Address: ${sponsor.sponsor_address} | Phone #: ${sponsor.sponsor_phonenumber} `}
        </li>
      ))}
    </ul>
  );
};

export default SponsorsList;
