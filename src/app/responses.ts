import { Slide } from "./slide";

interface SlideResponse {
    item: string;
    slides: Slide[];
}

export interface SlideOuterResponse {
    results: SlideResponse;
}