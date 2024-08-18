import React, { useEffect, useState } from "react";
import { deleteSponsorByID, getAllSponsors, getSponsorByID } from "./sponsors";
import { SponsorType } from "../../../types/sponsors";
import CreateSponsorComponent from "../../services/sponsor-services/HandleCreate";
import UpdateSponsorComponent from "../../services/sponsor-services/HandleUpdate";

export const SponsorsList: React.FC = () => {
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getAllSponsors();
        setSponsors(data);
      } catch (error) {
        setError(`Failed to load sponsors ${error}`);
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

interface SponsorsGetProps {
  id: number;
}

export const SponsorsGet: React.FC<SponsorsGetProps> = ({ id }) => {
  const [sponsor, setSponsor] = useState<SponsorType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getSponsorByID(id);
        setSponsor(data);
      } catch (error) {
        setError(`Failed to get sponsor by ID ${error}`);
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
        <h4>Returned Sponsor with Id: {sponsor?.id}</h4>
        <li key={sponsor?.id}>
          {`Name: ${sponsor?.sponsor_name} | Address: ${sponsor?.sponsor_address} | Phone #: ${sponsor?.sponsor_phonenumber}`}
        </li>
      </>
    </ul>
  );
};

export const SponsorCreate: React.FC = () => {
  const tempSponsor: Omit<SponsorType, "id"> = {
    sponsor_name: "",
    sponsor_address: "",
    sponsor_phonenumber: "",
  };

  return (
    <ul>
      <h4>Create Sponsor</h4>
      {tempSponsor !== null && (
        <CreateSponsorComponent PassedSponsor={tempSponsor} />
      )}
    </ul>
  );
};

interface UpdateSponsorByID {
  id: number;
}

export const SponsorsUpdate: React.FC<UpdateSponsorByID> = ({ id }) => {
  const [sponsor, setSponsor] = useState<SponsorType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await getSponsorByID(id);
        setSponsor(data);
      } catch (error) {
        setError(`Failed to get sponsor by ID ${error}`);
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
interface SponsorDeleteProps {
  id: number;
}

export const SponsorDelete: React.FC<SponsorDeleteProps> = ({ id }) => {
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedSponsor = async () => {
      try {
        const data = await deleteSponsorByID(id);
        setMessage(data);
      } catch (error) {
        setMessage(`No sponsor was found with given ID ${error}`);
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
