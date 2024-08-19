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
  const [playDateValue, setPlayDateValue] = useState<Date>();
  const [startTimeValue, setStartTimeValue] = useState<string>("");

  const handlePlayIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(event.target.value, 10);
    if (!isNaN(numericValue)) {
      setPlayIDValue(numericValue);
    } else {
      setPlayIDValue(undefined);
    }
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartTimeValue(event.target.value);
  };


  const handlePlayDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = new Date(event.target.value);
    setPlayDateValue(dateValue);
  };

  const handleButtonClick = () => {
    setTriggerUpdate(true);
  };

  useEffect(() => {
    if (triggerUpdate && PassedShowtime) {
      const SUC: ShowtimeType = {
        id: PassedShowtime.id,
        play_id: playIDValue ||PassedShowtime.play_id,
        play_date: playDateValue || PassedShowtime.play_date,
        start_time: startTimeValue || PassedShowtime.start_time,
      };

      const fetchShowtime = async () => {
        setLoading(true);
        try {
          await updateShowtimeByID(SUC);
          setMessage("Success!");
        } catch (error) {
          setMessage(`Failed to update ${error}`);
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
    startTimeValue,
    playDateValue,
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
        type="string"
        value={startTimeValue === undefined ? "" : startTimeValue}
        onChange={handleStartTimeChange}
        placeholder={PassedShowtime?.start_time}
      />
      <input
        type="date"
        value={
          playDateValue !== undefined
            ? playDateValue.toISOString().substring(0, 10)
            : ""
        }
        onChange={handlePlayDateChange}
        placeholder={`${PassedShowtime?.play_date}`}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default UpdateShowtimeComponent;
