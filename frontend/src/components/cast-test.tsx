import React, { useState } from "react";
import NumberInputComponent from "../services/Shared/HandleNumberInput";
import CastMemberList from "../api/cast-api/CastMemberList";
import CastMemberGet from "../api/cast-api/CastMemberGet";
import CastMembersGetByPlay from "../api/cast-api/CastMemberGetByPlay";
import CastMemberUpdate from "../api/cast-api/CastMemberUpdate";
import CastMemberCreate from "../api/cast-api/CastMemberCreate";
import CastMemberDelete from "../api/cast-api/CastMemberDelete";

const CastMemberTest: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const [showGet, setShowGet] = useState(false);
  const [showGetPlayID, setShowGetPlayID] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const getAllCastMembers = () => {
    setShowList(true);
  };
  const getCastMemberById = () => {
    setShowGet(true);
  };
  const getCastMemberByPlayId = () => {
    setShowGetPlayID(true);
  };
  const updateCastMember = () => {
    setShowUpdate(true);
  };
  const createCastMember = () => {
    setShowCreate(true);
  };
  const deleteCastMember = () => {
    setShowDelete(true);
  };

  return (
    <div>
      <h2>Cast Member CRUD</h2>
      <div>
        <button id="list" onClick={getAllCastMembers}>
          List
        </button>
        <button id="get" onClick={getCastMemberById}>
          Get
        </button>
        <button id="get" onClick={getCastMemberByPlayId}>
          Get By Play ID
        </button>
        <button id="update" onClick={updateCastMember}>
          Update
        </button>
        <button id="create" onClick={createCastMember}>
          Create
        </button>
        <button id="delete" onClick={deleteCastMember}>
          Delete
        </button>
      </div>
      {showList && <CastMemberList />}
      {showGet && (
        <NumberInputComponent
          message={"Get Cast Member by ID"}
          PassedComponent={CastMemberGet}
        />
      )}
      {showGetPlayID && (
        <NumberInputComponent
          message={"Get Cast Member by Play ID"}
          PassedComponent={CastMembersGetByPlay}
        />
      )}
      {showUpdate && (
        <NumberInputComponent
          message={"What Cast Member Do You Want To Update?"}
          PassedComponent={CastMemberUpdate}
        />
      )}
      {showCreate && <CastMemberCreate />}
      {showDelete && (
        <NumberInputComponent
          message={"Delete Cast Member"}
          PassedComponent={CastMemberDelete}
        />
      )}
    </div>
  );
};

export default CastMemberTest;
