
import './App.css'
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
    <img src={getPosterUrl(movieInfo.Poster)} alt={movieInfo.Title}/>
    <div>
      <h1>{movieInfo.Title}</h1>
      <p>Year: {movieInfo.Year}</p>
      <p>Genre: {movieInfo.Genre}</p>
      <p>Time: {movieInfo.Runtime}</p>
    </div>
    <div>
      <p>Director: {movieInfo.Director}</p>
      <p>Actors: {movieInfo.Actors}</p>
    </div>
    <div>
      <p>plot: 
        {movieInfo.Plot}
      </p>
      </div>
      <span>
        <p>⭐ {movieInfo.imdbRating}/10</p>
        </span>
      <button className="addfavorite-button" onClick={() => toggleFavorite(movieInfo)}>
        <img alt={isFavorite ? "Remove from favorites" : "Add to favorites"} src={isFavorite ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/>
        </button>
      <button onClick={() => navigate(-1)}>
      GO BACK
      </button>

  </>
  )
}




export default MovieDetails
