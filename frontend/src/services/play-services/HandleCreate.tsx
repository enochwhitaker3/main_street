import React, { useEffect, useState } from "react";
import { PlayType } from "../../../types/plays";
import { createPlay } from "../../api/play-api/plays";

interface InputProps {
  PassedPlay: Omit<PlayType, "id"> | undefined;
}

const CreatePlayComponent: React.FC<InputProps> = ({ PassedPlay }) => {
  const [message, setMessage] = useState<string>("");
  const [triggerCreate, setTriggerCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const [directorValue, setDirectorValue] = useState<string>("");
  const [sponsorIDValue, setSponsorIDValue] = useState<number>();
  const [startDateValue, setStartDateValue] = useState<Date>();
  const [endDateValue, setEndDateValue] = useState<Date>();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleDirectorValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirectorValue(event.target.value);
  };

  const handleSponsorIDChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = parseInt(event.target.value, 10);
    if (!isNaN(numericValue)) {
      setSponsorIDValue(numericValue);
    } else {
      setSponsorIDValue(undefined); // or handle as needed
    }
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dateValue = new Date(event.target.value);
    setStartDateValue(dateValue);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = new Date(event.target.value);
    setEndDateValue(dateValue);
  };

  const handleButtonClick = () => {
    setTriggerCreate(true);
  };

  useEffect(() => {
    if (triggerCreate && PassedPlay) {
      const PUC: Omit<PlayType, "id"> = {
        title: titleValue || PassedPlay.title,
        sponsor_id: sponsorIDValue || PassedPlay.sponsor_id,
        start_date: startDateValue || PassedPlay.start_date,
        end_date: endDateValue || PassedPlay.end_date,
        poster: PassedPlay.poster,
        director: directorValue || PassedPlay.director,
      };

      const fetchPlays = async () => {
        setLoading(true);
        try {
          await createPlay(PUC);
          setMessage("Success!");
        } catch (error) {
          setMessage("Failed to update");
          console.log(error);
        } finally {
          setLoading(false);
          setTriggerCreate(false); // Reset the trigger
        }
      };

      fetchPlays();
    }
  }, [
    triggerCreate,
    PassedPlay,
    titleValue,
    directorValue,
    sponsorIDValue,
    startDateValue,
    endDateValue,
  ]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <input
        type="string"
        value={titleValue === undefined ? "" : titleValue}
        onChange={handleTitleChange}
        placeholder={"Title"}
      />
      <input
        type="string"
        value={directorValue === undefined ? "" : directorValue}
        onChange={handleDirectorValue}
        placeholder={"Director"}
      />
      <input
        type="number"
        value={sponsorIDValue !== undefined ? sponsorIDValue : ""}
        onChange={handleSponsorIDChange}
        placeholder={"Sponsor ID"}
      />
      <input
        type="date"
        value={
          startDateValue !== undefined
            ? startDateValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleStartDateChange}
        placeholder={"Start Date"}
      />
      <input
        type="date"
        value={
          endDateValue !== undefined
            ? endDateValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleEndDateChange}
        placeholder={"End Date"}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default CreatePlayComponent;
