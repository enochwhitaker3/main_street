import React, { useEffect, useState } from "react";
import { getSponsorByID } from "./sponsors";
import { SponsorType } from "../../../types/sponsors";
import UpdateSponsorComponent from "../../services/sponsor-services/HandleUpdate";

interface UpdateSponsorByID {
  id: number;
}

const SponsorsUpdate: React.FC<UpdateSponsorByID> = ({ id }) => {
  const [sponsor, setSponsor] = useState<SponsorType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getSponsorByID(id);
        setSponsor(data);
      } catch (error) {
        console.log(error);
        setError("Failed to get sponsor by ID");
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
      <>
        <h4>Sponsor with Id: {sponsor?.id}</h4>
        <li key={sponsor?.id}>
          {`Name: ${sponsor?.sponsor_name} | Address: ${sponsor?.sponsor_address} | Phone #: ${sponsor?.sponsor_phonenumber}`}
        </li>
      </>
      <h4>What do you want to update?</h4>
      {sponsor !== null && <UpdateSponsorComponent PassedSponsors={sponsor} />}
    </ul>
  );
};

export default SponsorsUpdate;
