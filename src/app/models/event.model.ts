import { Artist } from "./artist.model";

export interface Event {
    id: string,
    label: string,
    startDate: Date,
    endDate: Date,
    artists: Artist[]
}