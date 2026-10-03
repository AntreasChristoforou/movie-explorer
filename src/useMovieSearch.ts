import { useState } from 'react';
import type { Movie } from './types';

export function useMovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched , setHasSearched] = useState(false);
  

  async function search(searchText: string) {
       
      if(searchText.trim() === ""){
        setError("Empty search");
        return;
      }
      
      setLoading(true);
      setError(null);
      setHasSearched(true);
      
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${searchText}`);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMovies(data.Search ?? []);
      }
      catch(err){
        if(err instanceof Error){
        setError(err.message);
        }else{
          setError("Something went wrong");
        }
      }finally{
        setLoading(false);
      }
    }

  return { movies, loading, error, hasSearched, search };
}