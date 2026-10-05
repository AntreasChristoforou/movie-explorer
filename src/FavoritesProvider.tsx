import { createContext, useContext, useState, useEffect } from "react"
import type { Movie } from './types'

type FavoritesContextProp = {
    favorites : Movie[];
    toggleFavorite : (movie : Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextProp | null>(null);
const STORAGE_KEY = "movie-explorer-favorites";

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return context;
}

function loadFavorites() : Movie[]{
    try{
    const text = localStorage.getItem(STORAGE_KEY);
    if(text === null){
      return [];
    }
    return JSON.parse(text);
    }
    catch 
    {
        return [];
    }

}




export function FavoritesProvider ({ children }: { children: React.ReactNode }){
   const [favorites , setFavorites] = useState<Movie[]>(() => loadFavorites());

   useEffect(() => {
    localStorage.setItem(STORAGE_KEY , JSON.stringify(favorites));
}, [favorites]);

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