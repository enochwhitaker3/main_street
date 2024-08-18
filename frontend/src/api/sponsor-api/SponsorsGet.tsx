import { SponsorType } from "../../../types/sponsors";
import { getAllSponsors, getSponsorByID } from "./sponsors";

export const getSponsors = async (): Promise<{ sponsors: SponsorType[] }> => {
  try {
    const data = await getAllSponsors();
    return { sponsors: data };
  } catch (error) {
    console.error("Failed to grab sponsors:", error);
    throw new Error("Failed to grab sponsors");
  }
};

export const getSponsorById = async (id: number): Promise<SponsorType> => {
    try {
      const data = await getSponsorByID(id);
      return data;
    } catch (error) {
      console.error("Failed to grab sponsor:", error);
      throw new Error("Failed to grab sponsor");
    }
  };
  
