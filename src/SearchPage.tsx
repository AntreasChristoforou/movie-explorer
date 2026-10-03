
import './App.css'
import MovieList from './MovieList'
import type { Movie } from './types'
import {Link} from "react-router"
import { getPosterUrl } from './utils'


type SearchPageProps ={
    movies: Movie[];
    loading : boolean;
    error : string | null;
    onFavorite : (movie: Movie) => void;
    favorites: Movie[];
    hasSearched : boolean;
}




function SearchPage({movies , loading , error , onFavorite , favorites , hasSearched} : SearchPageProps) {

    const remainingMovies = movies.slice(1);
    const featuredMovie = movies[0];
    const isFeaturedMovie = favorites.some(m => m.imdbID === featuredMovie?.imdbID);

  return(
    <>
        
        {loading  && <p>Loading...</p>}
        {error  && <p>{error}</p>}
        {hasSearched && !loading && !error  &&  movies.length === 0 && <p>no matches</p>}
        
        {
        featuredMovie && !loading && !error &&
        <section className="featured-section">  
          <img className="featured-backdrop" src={getPosterUrl(featuredMovie.Poster)}/>
          <Link to={`/movie/${featuredMovie.imdbID}`}>
          <img className="featured-poster" src={getPosterUrl(featuredMovie.Poster)}/>
          </Link>
          <div className="featured-details">
          <p>FEATURED RESULT</p>
          <h2>{featuredMovie.Title}</h2>
          <p>{featuredMovie.Year}</p>
          
          <button className="featured-favorite" onClick={() => onFavorite(featuredMovie)}><img src={isFeaturedMovie ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>

          </div>
        </section>
      }

      <MovieList visible={remainingMovies} onFavorite={onFavorite} favorites={favorites}/>
    </>
  )
}




export default SearchPage
