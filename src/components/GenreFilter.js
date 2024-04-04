import { useState } from "react"
import songData from "../assets/song-data.json"

export default function GenreFilter(props){
    const [filteredGenre, setFilteredGenre] = useState('')
    const handleGenreSelection = (genre) => {
        setFilteredGenre(genre)
      }
    
    
    return (
        <div class ="genreFilterContainer"> 
        {[... new Set(songData.map(item => item.genre))].map((item, index) => (
            <label key={index}> <input type ="checkbox" checked={filteredGenre === item} onChange={() => handleGenreSelection(item)}
            /> {item} </label>
          )
          )} 
        </div>
    )

}