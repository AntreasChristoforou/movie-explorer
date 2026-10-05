
import './App.css'

import MovieList from './MovieList'

import {useFavorites} from './FavoritesProvider'



function FavoritesPage() {
const {favorites} = useFavorites();

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
      <MovieList visible={favorites}/>
      </section>
      </>
  )
}




export default FavoritesPage
