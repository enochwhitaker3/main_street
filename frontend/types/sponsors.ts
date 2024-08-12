export interface SponsorType {
    id: number;
    sponsor_name: string;
    sponsor_address: string;
    sponsor_phonenumber: string
}

export interface ApiSponsorResponse {
    value: SponsorType[];
}