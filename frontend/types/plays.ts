export interface PlayType {
    id: number;
    sponsor_id: number
    title: string
    start_date: Date;
    end_date: Date;
    poster: string;
    director: string;
}

export interface ApiPlayResponse {
    value: PlayType[];
}