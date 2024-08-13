import React, { useEffect, useState } from "react";
import { PlayType } from "../../../types/plays";
import { updatePlayByID } from "../../api/play-api/plays";

interface InputProps {
  PassedPlay: PlayType | undefined;
}

const UpdatePlayComponent: React.FC<InputProps> = ({ PassedPlay }) => {
  const [message, setMessage] = useState<string>("");
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);
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
    setTriggerUpdate(true);
  };

  useEffect(() => {
    if (triggerUpdate && PassedPlay) {
      const PUC: PlayType = {
        id: PassedPlay.id,
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
          await updatePlayByID(PUC);
          setMessage("Success!");
        } catch (error) {
          setMessage("Failed to update");
          console.log(error);
        } finally {
          setLoading(false);
          setTriggerUpdate(false); // Reset the trigger
        }
      };

      fetchPlays();
    }
  }, [
    triggerUpdate,
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
        placeholder={PassedPlay?.title}
      />
      <input
        type="string"
        value={directorValue === undefined ? "" : directorValue}
        onChange={handleDirectorValue}
        placeholder={PassedPlay?.director}
      />
      <input
        type="number"
        value={sponsorIDValue !== undefined ? sponsorIDValue : ""}
        onChange={handleSponsorIDChange}
        placeholder={PassedPlay?.sponsor_id?.toString() || "No current sponsor"}
      />
      <input
        type="date"
        value={
          startDateValue !== undefined
            ? startDateValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleStartDateChange}
        placeholder={`${PassedPlay?.start_date}`}
      />
      <input
        type="date"
        value={
          endDateValue !== undefined
            ? endDateValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleEndDateChange}
        placeholder={`${PassedPlay?.end_date}`}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default UpdatePlayComponent;
