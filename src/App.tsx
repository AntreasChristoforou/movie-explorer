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
    onToggleFavorite : (movie: Movie) => void;
    isFavorite : boolean;
  }
function MovieCard({movie , onToggleFavorite , isFavorite}: MovieCardProps) {
  return(
      <li>  
        
        <img alt={movie.Title} src={movie.Poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : movie.Poster}/>

        <h3>{movie.Title}</h3> 
        <p>{movie.Year}</p> 
        <button onClick={() => onToggleFavorite(movie)}>{isFavorite ? "♥" : "♡"}</button>
        
      </li>
   
  )
}


function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [favorites , setFavorites] = useState<Movie[]>([]);
  const [view , setView] = useState<"Results" | "Favorites">("Results");
  

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

    function onToggleFavorite(favMovie : Movie) {
      if(favorites.some(m => m.imdbID === favMovie.imdbID)){
        setFavorites(favorites.filter(n => n.imdbID !== favMovie.imdbID));
      }
      else{
        setFavorites([...favorites , favMovie]);
      }

}

const visible = view === "Favorites" ? favorites : movies;

  return (
    <>
    <input value={text} onChange={e => setText(e.target.value)}/>
    <button onClick={() => {setView("Results"); load()}}>Search</button>
    {loading && view === "Results" && <p>Loading...</p>}
    {error && view === "Results" && <p>{error}</p>}
    <button onClick={() =>setView("Favorites")}>Favorites</button>
    {view === "Favorites" && visible.length === 0 && <p>No favorites yet</p>}
    <ul>
    {visible.map(movie =>
    
    <MovieCard  key={movie.imdbID} movie={movie} onToggleFavorite={onToggleFavorite} isFavorite={favorites.some(m => m.imdbID === movie.imdbID)}/>
  
    )}
    </ul>
    </>
  )
}

export default App
