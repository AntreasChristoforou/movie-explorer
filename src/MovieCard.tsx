import type { Movie } from './types'
import './App.css'
import {Link} from "react-router"
import { getPosterUrl } from './utils'
import { useFavorites } from './FavoritesProvider'



type MovieCardProps ={
    movie : Movie;
  }

function MovieCard({movie}: MovieCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(m => m.imdbID === movie.imdbID);
   
  return(
      <li className="movie-card">  
        <Link to={`/movie/${movie.imdbID}`}>
        <img className="movie-poster" alt={movie.Title} src={getPosterUrl(movie.Poster)}/>

        <h3>{movie.Title}</h3> 
        </Link>
        <p>{movie.Year}</p> 
        <button className="addfavorite-button" onClick={() => toggleFavorite(movie)}><img src={isFavorite ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>
        
      </li>
   
  )
}




export default MovieCard
