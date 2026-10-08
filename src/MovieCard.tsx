import type { Movie } from './types'
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
    
      <li>  
        <div className='group transition relative hover:shadow-lg hover:shadow-accent/30 border-border border hover:border-accent rounded-2xl overflow-hidden '>
        <Link to={`/movie/${movie.imdbID}`}>
        <img className=" block w-full object-cover aspect-2/3" alt={movie.Title} src={getPosterUrl(movie.Poster)}/>
        </Link>
        
        <button aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} className="size-9 border border-accent/60 rounded-full grid place-items-center bg-surface/90 absolute top-2 right-2" onClick={() => toggleFavorite(movie)}><img alt="" className="w-5 h-auto" src={isFavorite ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>
        
        <Link className="bottom-3 bg-accent/50 whitespace-nowrap p-2 border border-accent rounded-full transition duration-250 ease-out opacity-0 group-focus-within:translate-y-0 group-hover:opacity-100 absolute left-1/2 -translate-x-1/2  group-focus-within:opacity-100 translate-y-2 group-hover:translate-y-0" to={`/movie/${movie.imdbID}`}>View Details</Link>
        </div>
        <h3 className='font-bold mt-2 truncate'>{movie.Title}</h3> 
        
        <p className='text-muted font-light'>{movie.Year}</p> 
        
      </li>
      
   
  )
}




export default MovieCard
