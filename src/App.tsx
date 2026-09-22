import { useState } from 'react'
import './App.css'

type Movie = {
    Title : string;
    Year : string;
    imdbID : string;
    Type : string;
    Poster : string;
  }

  type MovieCardProps ={
    movie : Movie;
  }
function MovieCard({movie}: MovieCardProps) {
  return(
      <li>
        <img alt={movie.Title} src={movie.Poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : movie.Poster}/>

        <h3>{movie.Title}</h3> 
        <p>{movie.Year}</p> 

      </li>
   
  )
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");

    async function load() {
      if(text.trim() === ""){
        setError("Empty search");
        return;
      }
      setLoading(true);
      setError(null);
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${text}`);
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

  return (
    <>
    <input value={text} onChange={e => setText(e.target.value)}/>
    <button onClick={load}>Search</button>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    <ul>
    {movies.map(movie =>
    <MovieCard  key={movie.imdbID} movie={movie}/>
     )}
    </ul>
    </>
  )
}

export default App
