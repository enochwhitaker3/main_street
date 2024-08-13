// frontend/src/components/PlaysList.tsx
import React from "react";
import { PlayType } from "../../../types/plays";
import CreatePlayComponent from "../../services/play-services/HandleCreate";

const PlaysCreate: React.FC = () => {
  const tempPlay: Omit<PlayType, "id"> = {
    sponsor_id: 1,
    title: "",
    start_date: new Date(),
    end_date: new Date(),
    poster: "",
    director: "",
  };

  return (
    <ul>
      <h4>Create Play</h4>
      {tempPlay !== null && <CreatePlayComponent PassedPlay={tempPlay} />}
    </ul>
  );
};

export default PlaysCreate;
