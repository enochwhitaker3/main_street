import { ApiCastResponse, CastType } from "../../../types/cast";

const API_URL = process.env.REACT_APP_CAST_ENDPOINT;

export const getAllCastMembers = async (): Promise<CastType[]> => {
  if (!API_URL) {
    throw new Error("The API route is not defined");
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_cast_members: ApiCastResponse = await response.json();

    const mappedCastMembers: CastType[] = returned_cast_members.value.map(
      (item) => ({
        id: item.id,
        play_id: item.play_id,
        full_name: item.full_name,
      })
    );

    return mappedCastMembers;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const getAllCastMemebersByPlayID = async (
  playId: number
): Promise<CastType[]> => {
  if (!API_URL) {
    throw new Error("The API route is not defined");
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { value }: { value: CastType[] } = await response.json();

    const filteredCastMembers: CastType[] = value.filter(
      (castMember) => castMember.play_id === playId
    );

    const mappedCastMemebers: CastType[] = filteredCastMembers.map(
      (item: CastType) => ({
        id: item.id,
        play_id: item.play_id,
        full_name: item.full_name,
      })
    );

    return mappedCastMemebers;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const getCastMemberByID = async (id: number): Promise<CastType> => {
  if (!API_URL) {
    throw new Error(
      "Cannot get cast member by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_cast_member: ApiCastResponse = await response.json();

    if (returned_cast_member.value.length === 0) {
      throw new Error("No cast member found with the given ID");
    }

    const mappedCastMemeber: CastType = {
      id: returned_cast_member.value[0].id,
      play_id: returned_cast_member.value[0].play_id,
      full_name: returned_cast_member.value[0].full_name,
    };

    return mappedCastMemeber;
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const updateCastMemberByID = async (
  castMember: CastType
): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot update cast member by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${castMember.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const returned_cast_member: ApiCastResponse = await response.json();

    if (returned_cast_member.value.length === 0) {
      throw new Error("No cast member found with the given ID");
    }

    const tempCastMember: Omit<CastType, "id"> = {
      play_id: castMember.play_id,
      full_name: castMember.full_name,
    };

    const updatedCastMemberResponse = await fetch(
      `${API_URL}/id/${castMember.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempCastMember),
      }
    );

    if (!updatedCastMemberResponse.ok) {
      throw new Error(
        `Failed to update cast member. Status: ${updatedCastMemberResponse.status}`
      );
    }

    return "Sucessfully Updated!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const createCastMember = async (
  castMember: Omit<CastType, "id">
): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot create cast member by ID, the API route is not defined properly"
    );
  }

  try {
    const tempCastMember: Omit<CastType, "id"> = {
      play_id: castMember.play_id,
      full_name: castMember.full_name,
    };

    const createCastMemberResponse = await fetch(`${API_URL}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tempCastMember),
    });

    if (!createCastMemberResponse.ok) {
      throw new Error(
        `Failed to create cast member. Status: ${createCastMemberResponse.status}`
      );
    }

    return "Created Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};

export const deleteCastMemberByID = async (id: number): Promise<string> => {
  if (!API_URL) {
    throw new Error(
      "Cannot delete cast member by ID, the API route is not defined properly"
    );
  }
  try {
    const response = await fetch(`${API_URL}/id/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const returned_cast_member: ApiCastResponse = await response.json();

    if (returned_cast_member.value.length === 0) {
      throw new Error("No cast member found with the given ID");
    }

    const deleteResponse = await fetch(`${API_URL}/id/${id}`, {
      method: "DELETE",
    });

    if (deleteResponse.status === 404) {
      return "Cast Member not found, or already deleted.";
    } else if (!deleteResponse.ok) {
      throw new Error(
        `Failed to delete cast member. Status: ${deleteResponse.status}`
      );
    }

    return "Deleted Successfully!";
  } catch (error) {
    console.error("Sample error:", error);
    throw error;
  }
};
