import './types.ts'
import './App.css'
import MovieCard from './MovieCard.tsx'
import type { Movie } from './types'

type MovieListProps ={
    visible: Movie[];
    
    onFavorite : (movie: Movie) => void;
    favorites: Movie[];
  }



function MovieList({visible , onFavorite ,  favorites} : MovieListProps) {
  return (
    <ul className="movie-grid">
    {visible.map(movie =>
    
    <MovieCard  key={movie.imdbID} movie={movie} onToggleFavorite={onFavorite} isFavorite={favorites.some(m => m.imdbID === movie.imdbID)}/>
  
    )}
    </ul>
  )
}

export default MovieList
