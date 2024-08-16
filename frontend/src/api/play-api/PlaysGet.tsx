// api/play-api/PlaysGet.ts
import { PlayType } from "../../../types/plays";
import { getAllPlays } from "./plays";

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

