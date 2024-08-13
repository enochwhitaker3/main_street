import React, { useState } from "react";
import NumberInputComponent from "../services/Shared/HandleNumberInput";
import ShowtimeList from "../api/showtime-api/ShowtimeList";
import ShowtimesGet from "../api/showtime-api/ShowtimeGet";
import ShowtimeUpdate from "../api/showtime-api/ShowtimeUpdate";
import ShowtimeDelete from "../api/showtime-api/ShowtimeDelete";
import ShowtimeCreate from "../api/showtime-api/ShowtimeCreate";
import ShowtimeGetByPlay from "../api/showtime-api/ShowtimeGetByPlay";

const ShowtimeTest: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const [showGet, setShowGet] = useState(false);
  const [showGetPlayID, setShowGetPlayID] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const getAllShowtimes = () => {
    setShowList(true);
  };
  const getShowtimeById = () => {
    setShowGet(true);
  };
  const getShowtimeByPlayId = () => {
    setShowGetPlayID(true);
  };
  const updateShowtime = () => {
    setShowUpdate(true);
  };
  const createShowtime = () => {
    setShowCreate(true);
  };
  const deleteShowtime = () => {
    setShowDelete(true);
  };

  return (
    <div>
      <h2>Showtimes CRUD</h2>
      <div>
        <button id="list" onClick={getAllShowtimes}>
          List
        </button>
        <button id="get" onClick={getShowtimeById}>
          Get
        </button>
        <button id="get" onClick={getShowtimeByPlayId}>
          Get By Play ID
        </button>
        <button id="update" onClick={updateShowtime}>
          Update
        </button>
        <button id="create" onClick={createShowtime}>
          Create
        </button>
        <button id="delete" onClick={deleteShowtime}>
          Delete
        </button>
      </div>
      {showList && <ShowtimeList />}
      {showGet && (
        <NumberInputComponent
          message={"Get Showtime by ID"}
          PassedComponent={ShowtimesGet}
        />
      )}
      {showGetPlayID && (
        <NumberInputComponent
          message={"Get Showtime by Play ID"}
          PassedComponent={ShowtimeGetByPlay}
        />
      )}
      {showUpdate && (
        <NumberInputComponent
          message={"What Showtime Do You Want To Update?"}
          PassedComponent={ShowtimeUpdate}
        />
      )}
      {showCreate && <ShowtimeCreate />}
      {showDelete && (
        <NumberInputComponent
          message={"Delete Showtime"}
          PassedComponent={ShowtimeDelete}
        />
      )}
    </div>
  );
};

export default ShowtimeTest;
