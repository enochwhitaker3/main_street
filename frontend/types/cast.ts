export interface CastType {
    id: number;
    play_id: number;
    full_name: string;
}

export interface ApiCastResponse {
    value: CastType[];
}