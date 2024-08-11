// frontend/src/api/plays.ts
import { PlayType } from "../../../shared/types/plays";

console.log('API_URL:', process.env.REACT_APP_PLAYS_ENDPOINTT);
const API_URL = process.env.REACT_APP_PLAYS_ENDPOINT;

export const getAllPlays = async (): Promise<PlayType[]> => {
    if (!API_URL) {
        throw new Error('The API route is not defined');
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responses: ApiPlayResponse = await response.json();

        const mappedData: PlayType[] = responses.value.map((item) => ({
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
        console.error('Sample error:', error);
        throw error;
    }
};