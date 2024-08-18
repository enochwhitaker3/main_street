import { ApiShowtimeResponse, ShowtimeType } from "../../../types/showtimes";

const API_URL = process.env.REACT_APP_SHOWTIMES_ENDPOINT;

export const getAllShowtimes = async (): Promise<ShowtimeType[]> => {
  if (!API_URL) {
    throw new Error("The API route is not defined");
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_showtimes: ApiShowtimeResponse = await response.json();

    const mappedShowtimes: ShowtimeType[] = returned_showtimes.value.map(
      (item) => ({
        id: item.id,
        play_id: item.play_id,
        doors_open: item.doors_open,
        start_time: item.start_time,
        end_time: item.end_time,
      })
    );

    console.table(mappedShowtimes);
    return mappedShowtimes;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const getAllShowtimesByPlayID = async (
  playId: number
): Promise<ShowtimeType[]> => {
  if (!API_URL) {
    throw new Error("The API route is not defined");
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { value }: { value: ShowtimeType[] } = await response.json();

    const filteredShowtimes: ShowtimeType[] = value.filter(
      (showtime) => showtime.play_id === playId
    );

    const mappedShowtimes: ShowtimeType[] = filteredShowtimes.map(
      (item: ShowtimeType) => ({
        id: item.id,
        play_id: item.play_id,
        doors_open: item.doors_open,
        start_time: item.start_time,
        end_time: item.end_time,
      })
    );

    console.table(mappedShowtimes);
    return mappedShowtimes;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const getShowtimeByID = async (id: number): Promise<ShowtimeType> => {
  if (!API_URL) {
    throw new Error(
      "Cannot get showtime by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_showtime: ApiShowtimeResponse = await response.json();

    if (returned_showtime.value.length === 0) {
      throw new Error("No showtime found with the given ID");
    }

    const mappedShowtime: ShowtimeType = {
      id: returned_showtime.value[0].id,
      play_id: returned_showtime.value[0].play_id,
      doors_open: returned_showtime.value[0].doors_open,
      start_time: returned_showtime.value[0].start_time,
      end_time: returned_showtime.value[0].end_time,
    };

    console.table(mappedShowtime);
    return mappedShowtime;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const updateShowtimeByID = async (
  showtime: ShowtimeType
): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update showtime by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${showtime.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const returned_showtime: ApiShowtimeResponse = await response.json();

    if (returned_showtime.value.length === 0) {
      throw new Error("No showtime found with the given ID");
    }

    const tempShowtime: Omit<ShowtimeType, "id"> = {
      play_id: showtime.play_id,
      doors_open: showtime.doors_open,
      start_time: showtime.start_time,
      end_time: showtime.end_time,
    };

    const updateShowtimeResponse = await fetch(`${API_URL}/id/${showtime.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempShowtime),
    });

    if (!updateShowtimeResponse.ok) {
      throw new Error(
        `Failed to update showtime. Status: ${updateShowtimeResponse.status}`
      );
    }

    return "Sucessfully Updated!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const createShowtime = async (
  showtime: Omit<ShowtimeType, "id">
): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update showtime by ID, the API route is not defined properly"
    );
  }

  try {
    const tempShowtime: Omit<ShowtimeType, "id"> = {
      play_id: showtime.play_id,
      doors_open: showtime.doors_open,
      start_time: showtime.start_time,
      end_time: showtime.end_time,
    };

    const createShowtimeResponse = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempShowtime),
    });

    if (!createShowtimeResponse.ok) {
      throw new Error(
        `Failed to create showtime. Status: ${createShowtimeResponse.status}`
      );
    }

    return "Created Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const deleteShowtimeByID = async (id: number): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update showtime by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_showtime: ApiShowtimeResponse = await response.json();

    if (returned_showtime.value.length === 0) {
      throw new Error("No showtime found with the given ID");
    }

    const deleteResponse = await fetch(`${API_URL}/id/${id}`, {
      method: "DELETE",
    });

    if (deleteResponse.status === 404) {
      return "Showtime not found, or already deleted.";
    } else if (!deleteResponse.ok) {
      throw new Error(
        `Failed to delete showtime. Status: ${deleteResponse.status}`
      );
    }

    return "Deleted Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};
