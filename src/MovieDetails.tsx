

import { useParams,useNavigate} from "react-router"

import { getPosterUrl } from './utils'
import { useMovie } from './useMovie';
import {useFavorites} from './FavoritesProvider'




function MovieDetails() {
  const {favorites , toggleFavorite} = useFavorites();
  const {id} = useParams();
  const navigate = useNavigate();
  const {movieInfo , loading, error} = useMovie(id);
  const isFavorite = favorites.some(m => m.imdbID === id);
  

if (loading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;
if (!movieInfo) return null;

  return(
    <>
      <button className="text-muted mt-2" onClick={() => navigate(-1)}>
      ← Back
      </button>
      <div className="grid md:grid-cols-[300px_1fr] gap-4">
      <div>
    <img src={getPosterUrl(movieInfo.Poster)} alt={movieInfo.Title} className="w-full h-100 md:h-auto md:aspect-2/3 object-cover mt-2 rounded-xl"/>
      </div>
      <div>
      <h1 className="text-3xl md:text-5xl font-black">{movieInfo.Title}</h1>
      <div className="grid grid-cols-[2fr_1fr] mt-1 mb-3">
        <div className="grid grid-cols-3 text-muted">
      <p>{movieInfo.Year}</p>
      
      <p>{movieInfo.Runtime}</p>
      <p className="bg-accent/40 text-center border border-accent rounded-2xl p-0">{movieInfo.Genre}</p>
      </div>
      <p className="text-right">
       ⭐ {movieInfo.imdbRating}/10
        </p>
    </div>
    <button className="inline-flex items-center justify-center w-full md:w-auto h-12 mt-3 p-3 bg-accent border border-border rounded-2xl cursor-pointer transition-colors duration-200 hover:border-accent hover:bg-accent/12 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4" onClick={() => toggleFavorite(movieInfo)}>
        <img className="w-10" alt=""  src={isFavorite ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/>
        <span className=" mr-1.5">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </button>
        <div className="mt-5 pb-3">
          <h2 className="mb-3 text-2xl font-bold">Overview</h2>
      <p> 
        {movieInfo.Plot}
      </p>
      </div>
    
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
      <dt  className="text-muted">Director</dt>   <dd> {movieInfo.Director}</dd>
      <dt  className="text-muted">Actors</dt>     <dd>{movieInfo.Actors}</dd>
      </dl>
  
    </div>
    </div>
      
      
    

  </>
  )
}




export default MovieDetails
