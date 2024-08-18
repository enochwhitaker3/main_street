import React, { useState } from "react";
import NumberInputComponent from "../services/Shared/HandleNumberInput";
import { SponsorsList } from "../api/sponsor-api/SponsorSwagger";
import { SponsorsUpdate } from "../api/sponsor-api/SponsorSwagger";
import { SponsorCreate } from "../api/sponsor-api/SponsorSwagger";
import { SponsorDelete } from "../api/sponsor-api/SponsorSwagger";
import { SponsorsGet } from "../api/sponsor-api/SponsorSwagger";

const SponsorsTest: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const [showGet, setShowGet] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const getAllSponsors = () => {
    setShowList(true);
  };
  const getSponsorById = () => {
    setShowGet(true);
  };
  const updateSponsor = () => {
    setShowUpdate(true);
  };
  const createSponsor = () => {
    setShowCreate(true);
  };
  const deleteSponsor = () => {
    setShowDelete(true);
  };

  return (
    <div>
      <h2>Sponsors CRUD</h2>
      <div>
        <button id="list" onClick={getAllSponsors}>
          List
        </button>
        <button id="get" onClick={getSponsorById}>
          Get
        </button>
        <button id="update" onClick={updateSponsor}>
          Update
        </button>
        <button id="create" onClick={createSponsor}>
          Create
        </button>
        <button id="delete" onClick={deleteSponsor}>
          Delete
        </button>
      </div>
      {showList && <SponsorsList />}
      {showGet && (
        <NumberInputComponent
          message={"Get Sponsor by ID"}
          PassedComponent={SponsorsGet}
        />
      )}
      {showUpdate && (
        <NumberInputComponent
          message={"What Sponsor Do You Want To Update?"}
          PassedComponent={SponsorsUpdate}
        />
      )}
      {showCreate && <SponsorCreate />}
      {showDelete && (
        <NumberInputComponent
          message={"Delete Sponsor"}
          PassedComponent={SponsorDelete}
        />
      )}
    </div>
  );
};

export default SponsorsTest;
