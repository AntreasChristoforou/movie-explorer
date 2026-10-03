import type { Movie } from './types'
import './App.css'
import {Link} from "react-router"
import { getPosterUrl } from './utils'



type MovieCardProps ={
    movie : Movie;
    onToggleFavorite : (movie: Movie) => void;
    isFavorite : boolean;
  }

function MovieCard({movie , onToggleFavorite , isFavorite}: MovieCardProps) {
  return(
      <li className="movie-card">  
        <Link to={`/movie/${movie.imdbID}`}>
        <img className="movie-poster" alt={movie.Title} src={getPosterUrl(movie.Poster)}/>

        <h3>{movie.Title}</h3> 
        </Link>
        <p>{movie.Year}</p> 
        <button className="addfavorite-button" onClick={() => onToggleFavorite(movie)}><img src={isFavorite ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>
        
      </li>
   
  )
}




export default MovieCard
