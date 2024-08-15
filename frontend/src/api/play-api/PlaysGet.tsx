import { useState, useEffect } from "react";
import { PlayType } from "../../../types/plays";
import { getAllPlays } from "./plays";

export const getPlays = () => {
  const [plays, setPlays] = useState<PlayType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlays = async () => {
      try {
        const data = await getAllPlays();
        setPlays(data);
      } catch (error) {
        setError("Failed to load plays");
        console.log(error);
      }
    };

    fetchPlays();
  }, []);

  return { plays, error };
};
