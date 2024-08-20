export interface SponsorType {
    id: number;
    sponsor_name: string;
    sponsor_address?: string | null;
    sponsor_phonenumber?: string | null;
}


export interface ApiSponsorResponse {
    value: SponsorType[];
}