import { createContext, useContext, useState } from "react"
import type { Movie } from './types'

type FavoritesContextProp = {
    favorites : Movie[];
    toggleFavorite : (movie : Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextProp | null>(null);


export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}

export function FavoritesProvider ({ children }: { children: React.ReactNode }){
   const [favorites , setFavorites] = useState<Movie[]>([]);

   function toggleFavorite(favMovie : Movie) {
      if(favorites.some(m => m.imdbID === favMovie.imdbID)){
        setFavorites(favorites.filter(n => n.imdbID !== favMovie.imdbID));
      }
      else{
        setFavorites([...favorites , favMovie]);
      }

}

   return(
    <FavoritesContext.Provider value={{favorites, toggleFavorite}}>
        {children}
    </FavoritesContext.Provider>
   )
}