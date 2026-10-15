import type { Movie } from "./types";

export function getPosterUrl(poster: string): string {
    return poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : poster;
    
}

export function toggleMovie(list: Movie[], movie: Movie): Movie[] {
  if (list.some(m => m.imdbID === movie.imdbID)) {
    return list.filter(l => l.imdbID !== movie.imdbID);          
  }
  return ([...list , movie]);           
}