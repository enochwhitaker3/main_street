import React, { useState } from "react";
import PlaysList from "./PlaysList";
import PlaysGet from "./PlaysGet";
import PlaysUpdate from "./PlaysUpdate";
import PlaysCreate from "./PlaysCreate";
import PlaysDelete from "./PlaysDelete";

const TestPage: React.FC = () => {
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
  }


  return (
    <div>
      <h2>Plays CRUD</h2>
      <div>
        <button id="list" onClick={getAllPlays}>
          List
        </button>
        <button id="get" onClick={getPlay}>Get</button>
        <button id="update" onClick={updatePlay}>Update</button>
        <button id="create" onClick={createPlay}>Create</button>
        <button id="delete" onClick={deletePlay}>Delete</button>
      </div>
      {showList && <PlaysList />}
      {showGet && <PlaysGet />}
      {showUpdate && <PlaysUpdate />}
      {showCreate && <PlaysCreate />}
      {showDelete && <PlaysDelete />}
    </div>
  );
};

export default TestPage;
