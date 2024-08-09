import { PlayType } from "../../../shared/types/plays";

// frontend/src/api/plays.ts
const API_URL = 'http://localhost:5000/api';

export const getAllPlays = async () => {
    try {
        const response = await fetch(`${API_URL}/plays`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json() as Promise<PlayType[]>;
    } catch (error) {
        console.error('Error fetching plays:', error);
        throw error;
    }
};
