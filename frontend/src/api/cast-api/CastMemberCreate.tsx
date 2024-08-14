import React from "react";
import { CastType } from "../../../types/cast";
import CreateCastMemberComponent from "../../services/cast-services/HandleCreate";

const CastMemberCreate: React.FC = () => {
  const tempCastMember: Omit<CastType, "id"> = {
    play_id: 1,
    full_name: "",
  };

  return (
    <ul>
      <h4>Create Cast Member</h4>
      {tempCastMember !== null && (
        <CreateCastMemberComponent PassedCastMember={tempCastMember} />
      )}
    </ul>
  );
};

export default CastMemberCreate;
