import React, { useEffect, useState } from "react";
import { ShowtimeType } from "../../../types/showtimes";
import { createShowtime } from "../../api/showtime-api/showtimes";

interface InputProps {
  PassedShowtime: Omit<ShowtimeType, "id"> | undefined;
}

const CreateShowtimeComponent: React.FC<InputProps> = ({ PassedShowtime }) => {
  const [message, setMessage] = useState<string>("");
  const [triggerCreate, setTriggerCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [playIDValue, setPlayIDValue] = useState<number>();
  const [doorsOpenValue, setDoorsOpenValue] = useState<Date>();
  const [startTimeValue, setStartTimeValue] = useState<Date>();
  const [endTimeValue, setEndTimeValue] = useState<Date>();

  const handlePlayIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(event.target.value, 10);
    if (!isNaN(numericValue)) {
      setPlayIDValue(numericValue);
    } else {
      setPlayIDValue(undefined); // or handle as needed
    }
  };

  const handleDoorsOpenChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dateValue = new Date(event.target.value);
    setDoorsOpenValue(dateValue);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dateValue = new Date(event.target.value);
    setStartTimeValue(dateValue);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = new Date(event.target.value);
    setEndTimeValue(dateValue);
  };

  const handleButtonClick = () => {
    setTriggerCreate(true);
  };

  useEffect(() => {
    if (triggerCreate && PassedShowtime) {
      const SUC: Omit<ShowtimeType, "id"> = {
        play_id: playIDValue || PassedShowtime.play_id,
        doors_open: doorsOpenValue || PassedShowtime.doors_open,
        start_time: startTimeValue || PassedShowtime.start_time,
        end_time: endTimeValue || PassedShowtime.end_time,
      };

      const fetchShowtimes = async () => {
        setLoading(true);
        try {
          await createShowtime(SUC);
          setMessage("Success!");
        } catch (error) {
          setMessage("Failed to update");
          console.log(error);
        } finally {
          setLoading(false);
          setTriggerCreate(false);
        }
      };

      fetchShowtimes();
    }
  }, [
    triggerCreate,
    PassedShowtime,
    playIDValue,
    doorsOpenValue,
    startTimeValue,
    endTimeValue,
  ]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <input
        type="number"
        value={playIDValue !== undefined ? playIDValue : ""}
        onChange={handlePlayIDChange}
        placeholder={"Play ID"}
      />
      <input
        type="date"
        value={
          doorsOpenValue !== undefined
            ? doorsOpenValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleDoorsOpenChange}
        placeholder={"Doors Open"}
      />
      <input
        type="date"
        value={
          startTimeValue !== undefined
            ? startTimeValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleStartTimeChange}
        placeholder={"Start Time"}
      />
      <input
        type="date"
        value={
          endTimeValue !== undefined
            ? endTimeValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleEndTimeChange}
        placeholder={"End Time"}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default CreateShowtimeComponent;
