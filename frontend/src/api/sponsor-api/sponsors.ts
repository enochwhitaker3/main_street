import { ApiSponsorResponse, SponsorType } from "../../../types/sponsors";

const API_URL = process.env.REACT_APP_SPONSORS_ENDPOINT;

export const getAllSponsors = async (): Promise<SponsorType[]> => {
  if (!API_URL) {
    throw new Error("The API route is not defined");
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_sponsors: ApiSponsorResponse = await response.json();

    const mappedSponsors: SponsorType[] = returned_sponsors.value.map(
      (item) => ({
        id: item.id,
        sponsor_name: item.sponsor_name,
        sponsor_address: item.sponsor_address,
        sponsor_phonenumber: item.sponsor_phonenumber,
      })
    );

    return mappedSponsors;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const getSponsorByID = async (id: number): Promise<SponsorType> => {
  if (!API_URL) {
    throw new Error(
      "Cannot get sponsor by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_sponsor: ApiSponsorResponse = await response.json();

    if (returned_sponsor.value.length === 0) {
      throw new Error("No sponsor found with the given ID");
    }

    const mappedSponsor: SponsorType = {
      id: returned_sponsor.value[0].id,
      sponsor_address: returned_sponsor.value[0].sponsor_address,
      sponsor_name: returned_sponsor.value[0].sponsor_name,
      sponsor_phonenumber: returned_sponsor.value[0].sponsor_phonenumber,
    };

    return mappedSponsor;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const updateSponsorByID = async (
  sponsor: SponsorType
): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update sponsor by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${sponsor.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const returned_sponsor: ApiSponsorResponse = await response.json();

    if (returned_sponsor.value.length === 0) {
      throw new Error("No sponsor found with the given ID");
    }

    const tempSponsor: Omit<SponsorType, "id"> = {
      sponsor_address: sponsor.sponsor_address,
      sponsor_name: sponsor.sponsor_name,
      sponsor_phonenumber: sponsor.sponsor_phonenumber,
    };

    const updateSponsorResponse = await fetch(`${API_URL}/id/${sponsor.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempSponsor),
    });

    if (!updateSponsorResponse.ok) {
      throw new Error(
        `Failed to update sponsor. Status: ${updateSponsorResponse.status}`
      );
    }

    return "Sucessfully Updated!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const createSponsor = async (
  sponsor: Omit<SponsorType, "id">
): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update sponsor by ID, the API route is not defined properly"
    );
  }

  try {
    const tempSponsor: Omit<SponsorType, "id"> = {
      sponsor_address: sponsor.sponsor_address,
      sponsor_name: sponsor.sponsor_name,
      sponsor_phonenumber: sponsor.sponsor_phonenumber,
    };

    const updatedSponsorResponse = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempSponsor),
    });

    if (!updatedSponsorResponse.ok) {
      throw new Error(
        `Failed to create sponsor. Status: ${updatedSponsorResponse.status}`
      );
    }

    return "Created Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const deleteSponsorByID = async (id: number): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update sponsor by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_sponsor: ApiSponsorResponse = await response.json();

    if (returned_sponsor.value.length === 0) {
      throw new Error("No sponsor found with the given ID");
    }

    const deleteResponse = await fetch(`${API_URL}/id/${id}`, {
      method: "DELETE",
    });

    if (deleteResponse.status === 404) {
      return "Sponsor not found, or already deleted.";
    } else if (!deleteResponse.ok) {
      throw new Error(
        `Failed to delete sponsor. Status: ${deleteResponse.status}`
      );
    }

    return "Deleted Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};
