import { useState } from 'react'
import './App.css'

type SearchBarProps ={
    load : (text : string) => void;
  }



function SearchBar({load} : SearchBarProps) {
const [text, setText] = useState("");

  return(
    <div className="search-bar">
    <input className="input-bar" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}/>
    <button className="search-button"onClick={() => load(text)}>Search</button>
    </div>
  )
}




export default SearchBar
