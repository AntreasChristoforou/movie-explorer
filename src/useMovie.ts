import { useState , useEffect } from 'react'

import type { MovieInfo } from './types';

export function useMovie(id : string | undefined) {
  
  const [movieInfo , setMovieInfo] = useState<MovieInfo | null>(null);
  const [error , setError] = useState<string | null>(null);
  const [loading , setLoading] = useState(false);
  

  useEffect(() => {
  async function load() {
        if (!id) return;
      setLoading(true);
      setError(null);
      
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}`);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if(data.Response === "False") throw new Error(`${data.Error}`);
        setMovieInfo(data);
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
    load();
  },[id] );

  return { movieInfo , loading , error };
}