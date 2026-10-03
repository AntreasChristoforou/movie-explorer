import { useState } from 'react'
import { Routes, Route, NavLink, Link ,useNavigate} from "react-router";
import './App.css'
import type { Movie } from './types'
import SearchBar from './SearchBar'
import SearchPage from './SearchPage'
import FavoritesPage from './favorites'
import MovieDetails from './MovieDetails'






function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites , setFavorites] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [hasSearched , setHasSearched] = useState(false);
  

    async function load(searchText: string) {
      navigate("/"); 
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

    function onToggleFavorite(favMovie : Movie) {
      if(favorites.some(m => m.imdbID === favMovie.imdbID)){
        setFavorites(favorites.filter(n => n.imdbID !== favMovie.imdbID));
      }
      else{
        setFavorites([...favorites , favMovie]);
      }

}







  return (
    <>
    <nav className="menu-grid">
    <Link to="/"><img className="home-icon"src="/images/homeicon.png" alt="Home"/></Link>
    
    <SearchBar load={load}/>
    <NavLink
        to="/favorites"
        className={({ isActive }) => isActive ? "menu-actions active" : "menu-actions"}
      >
        {({ isActive }) => (
          <>
            <img className="heart-menu" alt="" src={isActive ? "/images/heartmenufilled.png" : "/images/heartmenu.png"} />
            Favorites
          </>
        )}
      </NavLink>
    </nav>
    
      
  
    

    <Routes>
    <Route path="/" element={<SearchPage loading={loading} error={error} favorites={favorites} movies={movies} onFavorite={onToggleFavorite} hasSearched={hasSearched}/>}/>
    <Route path="/favorites" element={<FavoritesPage favorites={favorites} onFavorite={onToggleFavorite}/>}/>
    <Route path="/movie/:id" element={<MovieDetails />}/>

    </Routes>
    </>
  )
}

export default App
