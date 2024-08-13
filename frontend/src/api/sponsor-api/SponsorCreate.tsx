import React from "react";
import { SponsorType } from "../../../types/sponsors";
import CreateSponsorComponent from "../../services/sponsor-services/HandleCreate";

const SponsorCreate: React.FC = () => {
  const tempSponsor: Omit<SponsorType, "id"> = {
    sponsor_name: "",
    sponsor_address: "",
    sponsor_phonenumber: ""
  };

  return (
    <ul>
      <h4>Create Sponsor</h4>
      {tempSponsor !== null && <CreateSponsorComponent PassedSponsor={tempSponsor} />}
    </ul>
  );
};

export default SponsorCreate;
