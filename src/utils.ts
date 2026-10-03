export function getPosterUrl(poster: string): string {
    return poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : poster;
    
}