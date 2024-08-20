import { SponsorType } from "../../../types/sponsors";
import { createSponsor, deleteSponsorByID, getAllSponsors, getSponsorByID, updateSponsorByID } from "./sponsors";

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

export const createSponsorService = async (
  sponsor: Omit<SponsorType, "id">
): Promise<boolean> => {
  try {
    await createSponsor(sponsor);
    return true;
  } catch (error) {
    console.error("Failed to add sponsor:", error);
    throw new Error("Failed to add sponsor");
  }
};

export const updateSponsorService = async (sponsor: SponsorType): Promise<boolean> => {
  try {
    await updateSponsorByID(sponsor);
    return true
  } catch (error) {
    console.error("Failed to update sponsor:", error);
    throw new Error("Failed to update sponsor");
  }
};

export const deleteSponsorService = async (id: number): Promise<boolean> => {
  try {
    await deleteSponsorByID(id);
    return true
  } catch (error) {
    console.error("Failed to delete sponsor:", error);
    throw new Error("Failed to delete sponsor");
  }
}