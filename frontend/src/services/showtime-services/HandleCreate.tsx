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
  const [startTimeValue, setStartTimeValue] = useState<string>("");
  const [playDateValue, setPlayDateValue] = useState<Date>();

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
    setTriggerCreate(true);
  };

  useEffect(() => {
    if (triggerCreate && PassedShowtime) {
      const SUC: Omit<ShowtimeType, "id"> = {
        play_id: playIDValue || PassedShowtime.play_id,
        play_date: playDateValue || PassedShowtime.play_date,
        start_time: startTimeValue || PassedShowtime.start_time,
      };

      const fetchShowtimes = async () => {
        setLoading(true);
        try {
          await createShowtime(SUC);
          setMessage("Success!");
        } catch (error) {
          setMessage(`Failed to update ${error}`);
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
        placeholder={"Play ID"}
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
        placeholder={"Play Date"}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default CreateShowtimeComponent;
