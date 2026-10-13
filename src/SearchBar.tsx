import { useState } from 'react'


type SearchBarProps ={
    handleSearch : (text : string) => void;
  }



function SearchBar({handleSearch} : SearchBarProps) {
const [text, setText] = useState("");

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();          
    if(text.trim()==="") return;
    handleSearch(text);           
  }

  return(
    <form onSubmit={handleSubmit} className="bg-surface max-md:h-10 transition flex flex-1 md:max-w-2xl min-w-0 border border-border mx-auto md:p-1.5 gap-3 rounded-full focus-within:border-accent">
    <input placeholder="Search" aria-label="Search movies" className="flex-1 min-w-0 py-2.5 px-4 text-inherit outline-none placeholder:text-muted " value={text} onChange={(e) => setText(e.target.value)}/>
    <button type="submit" className="bg-linear-135 from-[#8795ff] to-[#643bff] text-white font-semibold py-2 px-5 md:px-7 md:py-3 rounded-full cursor-pointer hover:brightness-110 flex items-center justify-center"><span className='max-md:sr-only'>Search</span><img alt="" className="w-3 md:hidden h-auto" src='/images/phoneSearchIcon.png'/></button>
    </form>
  )
}




export default SearchBar
