
import MovieList from './MovieList'
import type { Movie } from './types'
import {Link} from "react-router"
import { getPosterUrl } from './utils'
import { useFavorites } from './FavoritesProvider'


type SearchPageProps ={
    movies: Movie[];
    loading : boolean;
    error : string | null;
    hasSearched : boolean;
}




function SearchPage({movies , loading , error , hasSearched} : SearchPageProps) {

    const remainingMovies = movies.slice(1);
    const featuredMovie = movies[0];
    const {favorites , toggleFavorite} = useFavorites();
    const isFeaturedMovie = favorites.some(m => m.imdbID === featuredMovie?.imdbID);
   

  return(
    <>
        
        {loading  && <p>Loading...</p>}
        {error  && <p>{error}</p>}
        {hasSearched && !loading && !error  &&  movies.length === 0 && <p>no matches</p>}
        
        {
        featuredMovie && !loading && !error &&
        <section className="flex relative overflow-hidden isolate items-center gap-8 p-6 mt-6 bg-surface border border-border rounded-2xl">  
          <img alt="" className="absolute inset-0 w-full h-full object-cover scale-100 blur-sm opacity-25 z-[-1] pointer-events-none" src={getPosterUrl(featuredMovie.Poster)}/>
          <Link to={`/movie/${featuredMovie.imdbID}`}>
          <img alt={featuredMovie.Title} className="w-60 max-w-[40%] h-auto rounded-xl" src={getPosterUrl(featuredMovie.Poster)}/>
          </Link>
          <div className="min-w-0 text-left">
          <p className='m-0 text-muted '>FEATURED RESULT</p>
          <h2 className='mb-3 text-4xl'>{featuredMovie.Title}</h2>
          <p className='m-0 text-muted '>{featuredMovie.Year}</p>
          
          <button aria-label={isFeaturedMovie ? "Remove from favorites" : "Add to favorites"} className="inline-flex items-center justify-center w-12 h-12 mt-6 p-3 bg-surface border border-border rounded-[50%] cursor-pointer transition-colors duration-200 hover:border-accent hover:bg-accent/12 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4" onClick={() => toggleFavorite(featuredMovie)}><img alt="" className='block w-6 h-6 object-contain' src={isFeaturedMovie ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>

          </div>
        </section>
      }

      <MovieList visible={remainingMovies}/>
    </>
  )
}




export default SearchPage
