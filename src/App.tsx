import { useState } from 'react'
import './App.css'
import MovieList from './MovieList.tsx'
import SearchBar from './SearchBar.tsx'
import './types.ts'



function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites , setFavorites] = useState<Movie[]>([]);
  const [view , setView] = useState<"Results" | "Favorites">("Results");
  const [hasSearched , setHasSearched] = useState(false);
  

    async function load(searchText: string) {
      if(searchText.trim() === ""){
        setError("Empty search");
        return;
      }
      setLoading(true);
      setError(null);
      setHasSearched(true);
      setView("Results");
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

    function onToggleFavorite(favMovie : Movie) {
      if(favorites.some(m => m.imdbID === favMovie.imdbID)){
        setFavorites(favorites.filter(n => n.imdbID !== favMovie.imdbID));
      }
      else{
        setFavorites([...favorites , favMovie]);
      }

}

const remainingMovies = movies.slice(1);
const featuredMovie = movies[0];
const isFeaturedMovie = favorites.some(m => m.imdbID === featuredMovie?.imdbID);
const visible = view === "Favorites" ? favorites : remainingMovies;



  return (
    <>
    <div className="menu-grid">
    <img className="home-icon"src="/images/homeicon.png"/>
    <SearchBar load={load}/>
    {loading && view === "Results" && <p>Loading...</p>}
    {error && view === "Results" && <p>{error}</p>}
    {hasSearched && !loading && !error && view === "Results" &&  movies.length === 0 && <p>no matches</p>}
    
    <div className={view === "Favorites" ? "menu-actions active" : "menu-actions"}>
      <img className="heart-menu" src={view === "Favorites" ? "/images/heartmenufilled.png": "/images/heartmenu.png"}/>
    <button className="menu-favorites" onClick={() =>setView("Favorites")}>Favorites</button>
    </div>
    </div>
    <section className="favorites-section">
      <div className="favorites-intro">
      <img className="favorites-icon" alt="favorites-icon-section" src="/images/favoritessectionheard.png" />
      <div className="favorites-copy">
      <h2>Favorites</h2>
      <p>Your saved movies</p>
      </div>
      </div>
      <MovieList visible={favorites} onFavorite={onToggleFavorite} favorites={favorites}/>
      </section>
      {
        view === "Results" && featuredMovie && !loading && !error &&
        <section className="featured-section">  
          <img className="featured-backdrop" src={featuredMovie.Poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : featuredMovie.Poster}/>
          <img className="featured-poster" src={featuredMovie.Poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : featuredMovie.Poster}/>
          <div className="featured-details">
          <p>FEATURED RESULT</p>
          <h2>{featuredMovie.Title}</h2>
          <p>{featuredMovie.Year}</p>
          <button className="featured-favorite" onClick={() => onToggleFavorite(featuredMovie)}><img src={isFeaturedMovie ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>

          </div>
        </section>
      }
    {view === "Favorites" && visible.length === 0 && <p>No favorites yet</p>}
    <MovieList visible={visible} onFavorite={onToggleFavorite} favorites={favorites}/>
    
    </>
  )
}

export default App
