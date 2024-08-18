import { ApiPlayResponse, PlayType } from "../../../types/plays";

const API_URL = process.env.REACT_APP_PLAYS_ENDPOINT;

export const getAllPlays = async (): Promise<PlayType[]> => {
  if (!API_URL) {
    throw new Error("The API route is not defined");
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_plays: ApiPlayResponse = await response.json();

    const mappedData: PlayType[] = returned_plays.value.map((item) => ({
      id: item.id,
      sponsor_id: item.sponsor_id,
      title: item.title,
      start_date: item.start_date,
      end_date: item.end_date,
      poster: item.poster,
      director: item.director,
    }));

    console.table(mappedData);
    return mappedData;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const getPlayByID = async (id: number): Promise<PlayType> => {
  if (!API_URL) {
    throw new Error(
      "Cannot get play by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_plays: ApiPlayResponse = await response.json();

    if (returned_plays.value.length === 0) {
      throw new Error("No play found with the given ID");
    }

    const mappedPlay: PlayType = {
      id: returned_plays.value[0].id,
      sponsor_id: returned_plays.value[0].sponsor_id,
      title: returned_plays.value[0].title,
      start_date: returned_plays.value[0].start_date,
      end_date: returned_plays.value[0].end_date,
      poster: returned_plays.value[0].poster,
      director: returned_plays.value[0].director,
    };

    console.table(mappedPlay);
    return mappedPlay;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const updatePlayByID = async (play: PlayType): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update play by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${play.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const returned_plays: ApiPlayResponse = await response.json();

    if (returned_plays.value.length === 0) {
      throw new Error("No play found with the given ID");
    }

    const tempPlay: Omit<PlayType, "id"> = {
      sponsor_id: play.sponsor_id,
      title: play.title,
      start_date: play.start_date,
      end_date: play.end_date,
      poster: play.poster,
      director: play.director,
    };

    const updatePlayResponse = await fetch(`${API_URL}/id/${play.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempPlay),
    });

    if (!updatePlayResponse.ok) {
      throw new Error(
        `Failed to update play. Status: ${updatePlayResponse.status}`
      );
    }

    return "Sucessfully Updated!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const createPlay = async (
  play: Omit<PlayType, "id">
): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update play by ID, the API route is not defined properly"
    );
  }

  try {
    const tempPlay: Omit<PlayType, "id"> = {
      sponsor_id: play.sponsor_id,
      title: play.title,
      start_date: play.start_date,
      end_date: play.end_date,
      poster: play.poster,
      director: play.director,
    };

    const updatePlayResponse = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempPlay),
    });

    if (!updatePlayResponse.ok) {
      throw new Error(
        `Failed to create play. Status: ${updatePlayResponse.status}`
      );
    }

    return "Created Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const deletePlayByID = async (id: number): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update play by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_plays: ApiPlayResponse = await response.json();

    if (returned_plays.value.length === 0) {
      throw new Error("No play found with the given ID");
    }

    const deleteResponse = await fetch(`${API_URL}/id/${id}`, {
      method: "DELETE",
    });

    if (deleteResponse.status === 404) {
      return "Play not found, or already deleted.";
    } else if (!deleteResponse.ok) {
      throw new Error(
        `Failed to delete play. Status: ${deleteResponse.status}`
      );
    }

    return "Deleted Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};
