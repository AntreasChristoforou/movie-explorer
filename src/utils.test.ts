import { test, expect } from "vitest";
import { getPosterUrl , toggleMovie } from "./utils";
import type { Movie } from "./types";

const batman: Movie = {
  Title: "Batman Begins",
  Year: "2005",
  imdbID: "tt0372784",
  Type: "movie",
  Poster: "N/A",
};

const joker: Movie = { 
    Title: "Joker",
  Year: "2005",
  imdbID: "tt0372780",
  Type: "movie",
  Poster: "N/A",
}; 

test("uses a placeholder when there is no poster" ,()=>{
  const poster = "N/A";                      
  const result = getPosterUrl(poster);       
  expect(result).toContain("placehold.co"); 
});

test("gives back the url of the poster" ,()=>{
  const poster = "https://example.com/batman.jpg"
  const result = getPosterUrl(poster);       
  expect(result).toBe(poster); 
});

test("adds a movie that isn’t in the list" ,()=>{
  const list = [joker];
  const movie = batman;
  const result = toggleMovie(list , movie); 
        
  expect(result).toEqual([joker , batman]); 
});

test("removes a movie that is already in the list" ,()=>{
  const list = [joker , batman];
  const movie = batman;
  const result = toggleMovie(list , movie); 
     
  expect(result).toEqual([joker]); 
});

test("does not change the original list", () => {
  const list = [joker];
  const result = toggleMovie(list, batman);

  expect(list).toEqual([joker]);     
  expect(result).not.toBe(list); 
});