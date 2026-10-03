
import './App.css'

import MovieList from './MovieList'
import type { Movie } from './types'

type FavoritesPageProps ={
  
  favorites : Movie[];
  onFavorite : (movie: Movie) => void;
}



function FavoritesPage({ onFavorite ,  favorites} : FavoritesPageProps) {
  return(
    <>
         { favorites.length === 0 && <p>No favorites yet</p>}

         <section className="favorites-section">
      <div className="favorites-intro">
      <img className="favorites-icon" alt="favorites-icon-section" src="/images/favoritessectionheard.png" />
      <div className="favorites-copy">
      <h2>Favorites</h2>
      <p>Your saved movies</p>
      </div>
      </div>
      <MovieList visible={favorites} onFavorite={onFavorite} favorites={favorites}/>
      </section>
      </>
  )
}




export default FavoritesPage
