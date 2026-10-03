import { useState , useEffect } from 'react'
import './App.css'
import { useParams,useNavigate} from "react-router"
import type { MovieInfo } from './types'
import { getPosterUrl } from './utils'




function MovieDetails() {
  const {id} = useParams();
  const [movieInfo , setMovieInfo] = useState<MovieInfo | null>(null);
  const [error , setError] = useState<string | null>(null);
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  async function load() {
      setLoading(true);
      setError(null);
      
      try{
        const res = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}`);
        if(!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if(data.Response === "False") throw new Error(`${data.Error}`);
        setMovieInfo(data);
      }
      catch(err){
        if(err instanceof Error){
        setError(err.message);
        }else{
          setError("Something went wrong");
        }
      }finally{
        setLoading(false);
      }
    }
    load();
  },[id] );

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
      <button onClick={() => navigate(-1)}>
      GO BACK
      </button>

  </>
  )
}




export default MovieDetails
