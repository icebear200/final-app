import './App.css';
import {useState, useEffect} from "react"
import SongItem from './components/SongItem';
import songData from './assets/song-data.json';
import GenreFilter from './components/GenreFilter';
import ArtistFilter from './components/ArtistFilter';

songData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/"+ item.image;
});



function App() {
const [favList, setFavList] = useState ([])
// const [sortedSongs, setSortedSongs] = useState(songData)
const [filteredArtist, setFilteredArtist] = useState('')
const [filteredGenre, setFilteredGenre] = useState('')
const[resetFilters, setResetFilters] = useState(false)
const[filteredSongs, setFilteredSongs] = useState(songData)
const[sortClicked, setSortClicked] = useState(false);

const reset = () => {
setFilteredArtist('')
setFilteredGenre('')
setSortClicked(false)
console.log("BEING RESET")
setFilteredSongs(songData)

}




const filterSongs = (artist, genre) => {
  let filtered = songData;
  if (artist !== '') {
    filtered = filtered.filter(song => song.artist === artist);
  }
  if (genre !== '') {
    filtered = filtered.filter(song => song.genre === genre);
  }
  setFilteredSongs(filtered);
}

// let filteredSongs;
// if (filteredArtist || filteredGenre) {
//   filteredSongs = songData.filter(song => {
//     if (filteredArtist && filteredGenre) {return song.artist === filteredArtist || song.genre === filteredGenre;
//     }
//     if (filteredArtist) {
//       return song.artist === filteredArtist;
//     }
//     if (filteredGenre) {
//       return song.genre === filteredGenre;
//     }
//     return true; // No filters applied, so include all songs
//   });
// } else { 
//   filteredSongs = songData;
// }



  const handleArtistSelection = (artist) => {
    setFilteredArtist(artist)
    filterSongs(artist, filteredGenre)
  }
  
  // receives the selected genre form the genre component because its passed in as a prop and updates the genre the 
  //filteredGenres list by setting it to the genres selected throguh the genre component
  const handleGenreSelection = (genre) => {
    setFilteredGenre(genre)
    filterSongs(filteredArtist, genre)
  }

const favorite = (songName) => { if (!favList.includes(songName)){
  setFavList ((prevFavList) => [... prevFavList, songName]);
  }
}


const finalFavList = () => {
  let final = " "
  for (const songName in favList){  const songList = favList[songName]
    final = songList
  }
  return final;
}

const removeFavorite = (songName) => {
 const updatedListSongsRemoved = favList.filter((name) => name !== songName)
  setFavList(updatedListSongsRemoved)
}


// gets the each song from the favoriteList and accesses its lengths and adds its lengths to total minutes
const favMinutes = () => {
  let totalMinutes = 0;
  favList.forEach(songName => {const song = songData.find(song => song.name === songName)
  if (song){ totalMinutes += song.length;
  }
})
  return totalMinutes.toFixed(0);
}


// const sortSongs = () => {
//   const getSongInfo = [...sortedSongs];
//   const sort = getSongInfo.sort((a, b) => a.name.localeCompare(b.name))
//   setSortedSongs(sort)
//   console.log("Check sorting")
// }

const sortSongs = () => {
  const sort = [...filteredSongs].sort((a,b ) => a.name.localeCompare(b.name))
  setFilteredSongs(sort)
  setSortClicked(true);
}



  return (
    <div className="App">
      <div className="appTitle">  <h1>Angie's Mix  </h1></div>
      <div class="songListContainer"> 
      <div class="Checkboxes">   
      <button onClick={sortSongs}>Sort Songs Alphabetically</button>
      <button onClick={ () => reset()}> Reset Filters</button>
     <div class="ContainerSongs"> 
     <div class= "filtersContainer"> 
     <div class="artistFilterContainer">  
     <h3> Filter By Artist</h3>

     <ArtistFilter handleArtistSelection={handleArtistSelection} filteredArtist={filteredArtist} songData={songData} />
        {/* {[... new Set(songData.map(item => item.artist))].map((item, index) => (
          <label key={index}> <input type ="checkbox" checked={filteredArtist === item} onChange={() => handleArtistSlection(item)}
          /> {item} </label>
        )
        )}  */}
         </div>

        <div class="genreFilterContainer"> <h3> Filter By Genre</h3>
          <GenreFilter handleGenreSelection={handleGenreSelection} filteredGenre={filteredGenre} songData={songData}/>
          </div>
       
        </div>
       </div>
      

      {/* <div class ="genreFilterContainer"> 
      {[... new Set(songData.map(item => item.genre))].map((item, index) => (
          <label key={index}> <input type ="checkbox" checked={filteredGenre === item} onChange={() => handleGenreSelection(item)}
          /> {item} </label>
        )
        )} 
      </div> */}

        
        <div className="SongList"> 
        {filteredSongs.map((item, index) => (
        <SongItem data={item} key={index} favorite={() => favorite(item.name)} removeFavorite={() => removeFavorite(item.name)}
        name = {item.name}
        artist={item.artist}
        length={item.length}
        genre= {item.genre}
        year = {item.year}/>
      )) } 
      </div>
      </div>
      </div> 

      <div className="favSongList">
        <h2> Your Favorite Songs</h2>
        <u1> {favList.map((songName, index) =>
        <li key={index}> {songName}</li>)}</u1>
        <div> {finalFavList}</div>
      <div> You have listened to {favMinutes()} minutes of your favorite songs </div>
      </div>
      </div>
    
  

  
    
  );
}

export default App;

