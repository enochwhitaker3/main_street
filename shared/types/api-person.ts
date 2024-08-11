interface ApiPlayType {
    id: number;
    sponsor_id: number;
    title: string
    start_date: Date;
    end_date: Date;
    poster: Uint8Array;
    director: string;
}

interface ApiPlayResponse {
    value: ApiPlayType[];
}
