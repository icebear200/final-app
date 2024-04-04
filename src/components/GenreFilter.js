import { useState } from "react"
import songData from "../assets/song-data.json"


// component that renders the genre filters
export default function GenreFilter(props){
   
   // keeps track of selected genres
    const [selectedGenre, setSelectedGenre] = useState('')

    // if a selected genre is already in the selected genre list, uncheck the box and update 
    // selectedGenre by taking it out of the list then handleGenreSelection a prop passed into app is empty becasue we have deselected it 
    const handleGenreSelection = (genre) => {
        if (selectedGenre.includes(genre)){
        setSelectedGenre(selectedGenre.filter(item => item !== genre))
        props.handleGenreSelection('')
      }
      // if the selected genre is not already in the selectedGenre list, add it to the list and handleSelected genre with prop in app
      else{
        setSelectedGenre([...selectedGenre, genre])
        props.handleGenreSelection(genre);
      }
    }
    
    
    return (
        <div class ="genreFilterContainer"> 
        {[... new Set(songData.map(item => item.genre))].map((item, index) => (
            <label key={index}> <input type ="checkbox" checked={selectedGenre.includes(item)} onChange={() => handleGenreSelection(item)}
            /> {item} </label>
          )
          )} 
        </div>
    )

}