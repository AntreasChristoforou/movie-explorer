import type { Movie } from './types'
import {Link} from "react-router"
import { getPosterUrl } from './utils'
import { useFavorites } from './FavoritesProvider'



type MovieCardProps ={
    movie : Movie;
    variant?: "grid" | "compact";
  }

function MovieCard({movie , variant= "grid" }: MovieCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(m => m.imdbID === movie.imdbID);
   if(variant === "compact"){
      return(
      
        <li className='grid w-full md:w-60 shrink-0 grid-cols-[72px_minmax(0,1fr)_32px] gap-x-2.5 items-center text-left focus-within:border-accent'>  
        
        <Link to={`/movie/${movie.imdbID}`} className='col-start-1 row-span-2 '>
        <img className="w-[72px] h-20 object-cover rounded-lg " alt={movie.Title} src={getPosterUrl(movie.Poster)}/>
        </Link>
        
        <button aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} className="col-start-3 row-span-2 p-0 justify-self-center" onClick={() => toggleFavorite(movie)}><img alt="" className="w-5 h-auto" src={isFavorite ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>
        
        
       
        <h3 className='col-start-2 row-start-1 m-0 text-[13px] self-end truncate'>{movie.Title}</h3> 
        
        <p className='col-start-2 row-start-2 m-0 text-[12px] text-muted self-start'>{movie.Year}</p> 
        
      </li>
      
      )
   }
  return(
    
      <li>  
        <div className='group transition relative hover:shadow-lg hover:shadow-accent/30 border-border border hover:border-accent rounded-2xl overflow-hidden focus-within:border-accent'>
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
