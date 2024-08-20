// api/play-api/PlaysGet.ts
import { PlayType } from "../../../types/plays";
import { createPlay, getAllPlays, updatePlayByID } from "./plays";

// Function to create a delay
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getPlays = async (): Promise<{ plays: PlayType[] }> => {
  try {
    const data = await getAllPlays();
    return { plays: data };
  } catch (error) {
    console.error("Failed to load plays:", error);
    throw new Error("Failed to load plays");
  }
};

export const getPlayByDate = async (): Promise<{ plays: PlayType }> => {
  try {
    const data = await getAllPlays();
    const now = Date.now();
    const cp = data.reduce((closest, current) => {
      const closestDiff = Math.abs(new Date(closest.start_date).getTime() - now);
      const currentDiff = Math.abs(new Date(current.start_date).getTime() - now);

      return currentDiff < closestDiff ? current : closest;
    });

    return { plays: cp };
  } catch (error) {
    console.error("Failed to load plays:", error);
    throw new Error("Failed to load plays");
  }
};

export const createPlayService = async (play: Omit<PlayType, "id">): Promise<boolean> => {
  try {
    await createPlay(play);
    return true
  } catch (error) {
    console.error("Failed to load plays:", error);
    throw new Error("Failed to load plays");
  }
};

export const updatePlayService = async (play: PlayType): Promise<boolean> => {
  try {
    await updatePlayByID(play);
    return true
  } catch (error) {
    console.error("Failed to load plays:", error);
    throw new Error("Failed to load plays");
  }
};


