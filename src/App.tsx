
import { Routes, Route, NavLink, Link, useNavigate} from "react-router";

import SearchBar from './SearchBar'
import SearchPage from './SearchPage'
import FavoritesPage from './favorites'
import MovieDetails from './MovieDetails'
import { useMovieSearch } from './useMovieSearch';







function App() {
  const navigate = useNavigate();
  
  

  const { movies, loading, error, hasSearched, search } = useMovieSearch();
 

function handleSearch(text: string) {
  navigate("/");
  search(text);
}
  

    

    







  return (
    <>
    <div className="max-w-[1440px] min-h-screen mx-auto p-6">
    <nav className="flex items-center gap-6 w-full">
    <Link to="/"><img className="w-12 h-auto"src="/images/homeicon.png" alt="Home"/></Link>
    
    <SearchBar handleSearch={handleSearch}/>
    <NavLink
        to="/favorites"
        className="relative ml-auto flex shrink-0 items-center gap-2 px-3 py-2
             text-muted transition-colors hover:text-white
             aria-[current=page]:text-accent

             before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2
             before:h-0.5 before:w-7 before:bg-accent before:opacity-0
             aria-[current=page]:before:opacity-40

             after:absolute after:-bottom-2.5 after:left-1/2 after:-translate-x-1/2
             after:size-1.5 after:rounded-full after:bg-accent
             after:shadow-[0_0_8px_var(--color-accent)] after:opacity-0
             aria-[current=page]:after:opacity-100 "
      >
        {({ isActive }) => (
          <>
            <img className="w-6 h-auto" alt="" src={isActive ? "/images/heartmenufilled.png" : "/images/heartmenu.png"} />
            Favorites
          </>
        )}
      </NavLink>
    </nav>
    
      
  
    

    <Routes>
    <Route path="/" element={<SearchPage loading={loading} error={error} movies={movies} hasSearched={hasSearched}/>}/>
    <Route path="/favorites" element={<FavoritesPage/>}/>
    <Route path="/movie/:id" element={<MovieDetails />}/>

    </Routes>
    </div>
    </>
  )
}

export default App
