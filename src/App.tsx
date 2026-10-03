import { useState } from 'react'
import { Routes, Route, NavLink, Link, useNavigate} from "react-router";
import './App.css'
import type { Movie } from './types'
import SearchBar from './SearchBar'
import SearchPage from './SearchPage'
import FavoritesPage from './favorites'
import MovieDetails from './MovieDetails'
import { useMovieSearch } from './useMovieSearch';






function App() {
  const navigate = useNavigate();
  
  const [favorites , setFavorites] = useState<Movie[]>([]);

  const { movies, loading, error, hasSearched, search } = useMovieSearch();
 

function handleSearch(text: string) {
  navigate("/");
  search(text);
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
    
    <SearchBar handleSearch={handleSearch}/>
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
