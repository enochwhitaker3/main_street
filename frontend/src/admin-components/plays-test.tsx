import React, { useState } from "react";
import {PlaysList} from "../api/play-api/PlaysSwagger";
import {PlaysGet} from "../api/play-api/PlaysSwagger";
import {PlaysCreate} from "../api/play-api/PlaysSwagger";
import {PlaysDelete} from "../api/play-api/PlaysSwagger";
import NumberInputComponent from "../services/Shared/HandleNumberInput";
import {PlaysUpdate} from "../api/play-api/PlaysSwagger";

const PlaysTest: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const [showGet, setShowGet] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const getAllPlays = () => {
    setShowList(true);
  };
  const getPlay = () => {
    setShowGet(true);
  };
  const updatePlay = () => {
    setShowUpdate(true);
  };
  const createPlay = () => {
    setShowCreate(true);
  };

  const deletePlay = () => {
    setShowDelete(true);
  };

  return (
    <div>
      <h2>Plays CRUD</h2>
      <div>
        <button id="list" onClick={getAllPlays}>
          List
        </button>
        <button id="get" onClick={getPlay}>
          Get
        </button>
        <button id="update" onClick={updatePlay}>
          Update
        </button>
        <button id="create" onClick={createPlay}>
          Create
        </button>
        <button id="delete" onClick={deletePlay}>
          Delete
        </button>
      </div>
      {showList && <PlaysList />}
      {showGet && (
        <NumberInputComponent
          message={"Get Play by ID"}
          PassedComponent={PlaysGet}
        />
      )}
      {showUpdate && (
        <NumberInputComponent
          message={"What Play Do You Want To Update?"}
          PassedComponent={PlaysUpdate}
        />
      )}
      {showCreate && <PlaysCreate />}
      {showDelete && (
        <NumberInputComponent
          message={"Delete Play"}
          PassedComponent={PlaysDelete}
        />
      )}
    </div>
  );
};

export default PlaysTest;
