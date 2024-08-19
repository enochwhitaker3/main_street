export interface ShowtimeType {
    id: number;
    play_id: number;
    start_time: string;
    play_date: Date;
}

export interface ApiShowtimeResponse {
    value: ShowtimeType[];
}
