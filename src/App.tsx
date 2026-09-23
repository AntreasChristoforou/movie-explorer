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
    onToggleFavorite : (id: string) => void;
    isFavorite : boolean;
  }
function MovieCard({movie , onToggleFavorite , isFavorite}: MovieCardProps) {
  return(
      <li>  
        
        <img alt={movie.Title} src={movie.Poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : movie.Poster}/>

        <h3>{movie.Title}</h3> 
        <p>{movie.Year}</p> 
        <button onClick={() => onToggleFavorite(movie.imdbID)}>{isFavorite ? "♥" : "♡"}</button>
        
      </li>
   
  )
}


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [favorites , setFavorites] = useState<string []>([]);
  

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

    function onToggleFavorite(id : string) {
      if(favorites.includes(id)){
        setFavorites(favorites.filter(n => n !== id));
      }
      else{
        setFavorites([...favorites , id]);
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
    
    <MovieCard  key={movie.imdbID} movie={movie} onToggleFavorite={onToggleFavorite} isFavorite={favorites.includes(movie.imdbID)}/>
  
    )}
    </ul>
    </>
  )
}

export default App
