export interface SearchResult {
    [key: string]: {
        id: string;
        name: string;
        railways: string[];
    };
}