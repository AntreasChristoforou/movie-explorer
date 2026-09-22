import { useState } from 'react'
import './App.css'

type Movie = {
    Title : string;
    Year : string;
    imdbID : string;
    Type : string;
    Poster : string;
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
      <li key={movie.imdbID}>
        {movie.Title}
      </li>
    )}
    </ul>
    </>
  )
}

export default App
