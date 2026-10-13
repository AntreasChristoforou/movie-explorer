


import MovieList from './MovieList'

import {useFavorites} from './FavoritesProvider'



function FavoritesPage() {
const {favorites} = useFavorites();

  return(
    <>
         { favorites.length === 0 && <p>No favorites yet</p>}

         <section className="flex flex-col md:flex-row gap-6 p-4 mt-6 bg-surface border border-border rounded-2xl">
      <div className="flex items-center gap-3 shrink-0">
      <img alt="" className="size-12 object-contain" src="/images/favoritessectionheard.png" />
      <div>
      <h2 className='text-base'>Favorites</h2>
      <p className='mt-1 text-[13px] text-muted'>Your saved movies</p>
      </div>
      </div>
      <MovieList visible={favorites} variant="compact" />
      </section>
      </>
  )
}




export default FavoritesPage
