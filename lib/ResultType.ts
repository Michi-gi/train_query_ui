export interface SearchResult {
    [key: string]: {
        id: string;
        name: string;
        railways: string[];
    };
}

export interface Station {
    id: string;
    name: string;
    lines: Line[];
}

export interface Line {
    RailId: string;
    RailName: string;
    Direction: string;
    Source: string;
    ServiceDayCode: string;
    RailTarget: string;
}