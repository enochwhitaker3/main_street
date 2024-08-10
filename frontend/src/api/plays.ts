// frontend/src/api/plays.ts
import { PlayType } from "../../../shared/types/plays";

const API_URL = process.env.REACT_APP_API_URL;

export const getAllPlays = async () => {
    try {
        console.log(`${API_URL}/plays`)
        console.log('EE MST_DB_CONNECTION:', process.env.MST_DB_CONNECTION);
        console.log('EE DATABASE_URL:', process.env.DATABASE_URL);
        const response = await fetch(`${API_URL}/plays`);
        if (!response.ok) {
            console.log(`${response.statusText}: is the RESPONSE`)
            throw new Error('Network response was not ok BRO');
        }
        return response.json() as Promise<PlayType[]>;
    } catch (error) {
        console.error('THERE WAS an Error fetching plays DUDE:', error);
        throw error;
    }
};
