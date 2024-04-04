import { useState } from "react"
import songData from "../assets/song-data.json"


// component that renders the genre filters
export default function ArtistFilter(props){
   
   // keeps track of selected genres
    const [selectedArtist, setSelectedArtist] = useState('')

    // if a selected genre is already in the selected genre list, uncheck the box and update 
    // selectedGenre by taking it out of the list then handleGenreSelection a prop passed into app is empty becasue we have deselected it 
    const handleArtistSlection = (artist) => {
        if (selectedArtist.includes(artist)){
        setSelectedArtist(selectedArtist.filter(item => item !== artist))
        props.handleArtistSlection('')
      }
      // if the selected genre is not already in the selectedGenre list, add it to the list and handleSelected genre with prop in app
      else{
        setSelectedArtist([...selectedArtist, artist])
        props.handleArtistSlection(artist);
      }
    }
    
    
    return (
        <div class ="genreFilterContainer"> 
        {[... new Set(songData.map(item => item.artist))].map((item, index) => (
            <label key={index}> <input type ="checkbox" checked={selectedArtist.includes(item)} onChange={() => handleArtistSlection(item)}
            /> {item} </label>
          )
          )} 
        </div>
    )

}