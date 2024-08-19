import { ShowtimeType } from "../../../types/showtimes";
import { createShowtime } from "./showtimes";

export const createShowtimeService = async (play: Omit<ShowtimeType, "id">): Promise<boolean> => {
    try {
      await createShowtime(play);
      return true
    } catch (error) {
      console.error("Failed to create showtimes:", error);
      throw new Error("Failed to create showtimes");
    }
  };