import MovieCard from './MovieCard.tsx'
import type { Movie } from './types'

type MovieListProps ={
    visible: Movie[];
  }



function MovieList({visible} : MovieListProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mt-8">
    {visible.map(movie =>
    
    <MovieCard  key={movie.imdbID} movie={movie} />
  
    )}
    </ul>
  )
}

export default MovieList
