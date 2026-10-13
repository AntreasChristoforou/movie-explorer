import MovieCard from './MovieCard.tsx'
import type { Movie } from './types'

type MovieListProps ={
    visible: Movie[];
    variant?: "grid" | "compact";
  }



function MovieList({visible, variant} : MovieListProps) {
  if(variant==="compact"){
    return(
      <ul className="flex flex-col md:flex-row gap-3 flex-1 min-w-0 overflow-x-auto m-0 py-2 px-1">
    {visible.map(movie =>
    
    <MovieCard  key={movie.imdbID} movie={movie} variant={variant} />
  
    )}
    </ul>
    )
  }
  return (
    <ul className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mt-8 ">
    {visible.map(movie =>
    
    <MovieCard  key={movie.imdbID} movie={movie} variant={variant} />
  
    )}
    </ul>
  )
}

export default MovieList
