import React from "react";
import { ShowtimeType } from "../../../types/showtimes";
import CreateShowtimeComponent from "../../services/showtime-services/HandleCreate";

const ShowtimeCreate: React.FC = () => {
  const tempShowtime: Omit<ShowtimeType, "id"> = {
    play_id: 1,
    doors_open: new Date(),
    start_time: new Date(),
    end_time: new Date()
  };

  return (
    <ul>
      <h4>Create Showtime</h4>
      {tempShowtime !== null && <CreateShowtimeComponent PassedShowtime={tempShowtime} />}
    </ul>
  );
};

export default ShowtimeCreate;
