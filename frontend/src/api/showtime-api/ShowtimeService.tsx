import { ShowtimeType } from "../../../types/showtimes";
import { createShowtime, deleteAllShowtimesByPlayID, getAllShowtimesByPlayID } from "./showtimes";

export const createShowtimeService = async (
  play: Omit<ShowtimeType, "id">
): Promise<boolean> => {
  try {
    await createShowtime(play);
    return true;
  } catch (error) {
    console.error("Failed to create showtimes:", error);
    throw new Error("Failed to create showtimes");
  }
};

export const getShowtimeByPlayIdService = async (
  id: number
): Promise<Omit<ShowtimeType, "id">[]> => {
  try {
    const data = await getAllShowtimesByPlayID(id);
    return data;
  } catch (error) {
    console.error("Failed to grab showtime:", error);
    throw new Error("Failed to grab showtime");
  }
};

export const deleteShowtimeByPlayIdService = async (
  id: number
): Promise<boolean> => {
  try {
    const data = await deleteAllShowtimesByPlayID(id);
    return data;
  } catch (error) {
    console.error("Failed to grab showtime:", error);
    throw new Error("Failed to grab showtime");
  }
};
