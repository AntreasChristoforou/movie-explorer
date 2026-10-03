import { useState } from 'react'
import type { Movie } from './types'
import './App.css'
import './types.ts'


type MovieCardProps ={
    movie : Movie;
    onToggleFavorite : (movie: Movie) => void;
    isFavorite : boolean;
  }

function MovieCard({movie , onToggleFavorite , isFavorite}: MovieCardProps) {
  return(
      <li className="movie-card">  
        
        <img className="movie-poster" alt={movie.Title} src={movie.Poster === "N/A" ? "https://placehold.co/300x450?text=No+Poster" : movie.Poster}/>

        <h3>{movie.Title}</h3> 
        <p>{movie.Year}</p> 
        <button className="addfavorite-button" onClick={() => onToggleFavorite(movie)}><img src={isFavorite ? "/images/heartmenufilled.png" : "/images/heartmenu.png"}/></button>
        
      </li>
   
  )
}




export default MovieCard
