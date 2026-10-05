
import './App.css'
import MovieCard from './MovieCard.tsx'
import type { Movie } from './types'

type MovieListProps ={
    visible: Movie[];
  }



function MovieList({visible} : MovieListProps) {
  return (
    <ul className="movie-grid">
    {visible.map(movie =>
    
    <MovieCard  key={movie.imdbID} movie={movie} />
  
    )}
    </ul>
  )
}

export default MovieList
