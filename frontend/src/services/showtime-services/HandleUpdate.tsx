import React, { useEffect, useState } from "react";
import { ShowtimeType } from "../../../types/showtimes";
import { updateShowtimeByID } from "../../api/showtime-api/showtimes";

interface InputProps {
  PassedShowtime: ShowtimeType | undefined;
}

const UpdateShowtimeComponent: React.FC<InputProps> = ({ PassedShowtime }) => {
  const [message, setMessage] = useState<string>("");
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);
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
    setTriggerUpdate(true);
  };

  useEffect(() => {
    if (triggerUpdate && PassedShowtime) {
      const SUC: ShowtimeType = {
        id: PassedShowtime.id,
        play_id: playIDValue ||PassedShowtime.play_id,
        doors_open: doorsOpenValue || PassedShowtime.doors_open,
        start_time: startTimeValue || PassedShowtime.start_time,
        end_time: endTimeValue || PassedShowtime.end_time,
      };

      const fetchShowtime = async () => {
        setLoading(true);
        try {
          await updateShowtimeByID(SUC);
          setMessage("Success!");
        } catch (error) {
          setMessage("Failed to update");
          console.log(error);
        } finally {
          setLoading(false);
          setTriggerUpdate(false);
        }
      };

      fetchShowtime();
    }
  }, [
    triggerUpdate,
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
        placeholder={PassedShowtime?.play_id?.toString()}
      />
      <input
        type="date"
        value={
          doorsOpenValue !== undefined
            ? doorsOpenValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleDoorsOpenChange}
        placeholder={`${PassedShowtime?.doors_open}`}
      />
      <input
        type="date"
        value={
          startTimeValue !== undefined
            ? startTimeValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleStartTimeChange}
        placeholder={`${PassedShowtime?.start_time}`}
      />
      <input
        type="date"
        value={
          endTimeValue !== undefined
            ? endTimeValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handleEndTimeChange}
        placeholder={`${PassedShowtime?.end_time}`}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default UpdateShowtimeComponent;
