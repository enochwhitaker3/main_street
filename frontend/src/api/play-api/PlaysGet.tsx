// api/play-api/PlaysGet.ts
import { PlayType } from "../../../types/plays";
import { getAllPlays } from "./plays";

export const getPlays = async (): Promise<{ plays: PlayType[] }> => {
  try {
    const data = await getAllPlays();
    return { plays: data };
  } catch (error) {
    console.error("Failed to load plays:", error);
    throw new Error("Failed to load plays");
  }
};
