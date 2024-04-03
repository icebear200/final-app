import './App.css';
import {useState, useEffect} from "react"
import SongItem from './components/SongItem';
import songData from './assets/song-data.json';

songData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/"+ item.image;
});



function App() {
const [favList, setFavList] = useState ([])
const [sortedSongs, setSortedSongs] = useState(songData)
const [filteredArtist, setFilteredArtist] = useState('')
const [filteredSongsByArtist, setFilteredSongsByArtist] = useState([]);
const [filteredGenre, setFilteredGenre] = useState('')
const [filteredSongsByGenre, setFilteredSongsByGenre]= useState([]);


const favorite = (songName) => {
  if (!favList.includes(songName)){
  setFavList ((prevFavList) => [... prevFavList, songName]);
  }
}


const finalFavList = () => {
  let final = " "; 
  for (const songName in favList){
    const songList = favList[songName]
    final = songList
  }
  return final;
  
}
const sortSongs = () => {
  const sortedSongsCopy = [...sortedSongs];
  const sortedSongsNew = sortedSongsCopy.sort((a, b)=> a.name.localeCompare(b.name))
  setSortedSongs(sortedSongsNew)
};
  const handleArtistPick = (artist) => {
    setFilteredArtist(artist);
    if (artist === ''){
      setFilteredSongsByArtist([]);
    } else {
      const filteredSongsByArtist = songData.filter((song) => song.artist === artist);
      setFilteredSongsByArtist(filteredSongsByArtist);
    }
  };

  const handleGenrePick = (genre) => { setFilteredGenre(genre); 
  if (genre === ''){
    setFilteredSongsByGenre([]);
  } else {
    const filteredSongsByGenre = songData.filter((song) => song.genre === genre);
    setFilteredSongsByGenre(filteredSongsByGenre);
  }}

 const artistOptions = [];
 songData.forEach(song => {
  if (!artistOptions.includes(song.artist)){
    artistOptions.push(song.artist);
  }
 });

 const genreOptions = [];
 songData.forEach(song => { if (!genreOptions.includes(song.genre)){
  genreOptions.push(song.genre);
 }})




  return (
    <div className="App">
      <div className="appTitle">  <h1>Angie's Mix  </h1></div>
      <div class="songListContainer"> 
      <div class="SongList">   
      <button onClick={sortSongs}>Sort Songs Alphabetically</button>


      {/* Citing Source : https://simplefrontend.com/for-vs-htmlfor-label-in-react/  
      https://stackoverflow.com/questions/46453827/react-select-cannot-set-id*/
      }
      <label htmlFor='artistPicker'> Filter by Artist: </label>
      <select id="artistPicker"  value={filteredArtist}
      onChange={(e) => handleArtistPick.call(null, e.target.value)}> 
      <option value=""> All Artists</option>
      {artistOptions.map((artist, index) => (
        <option key={index} value={artist}> {artist}</option>
      ))}
      </select>

      <label htmlFor='genrePicker'> Filter by Genre: </label>
      <select id="genrePicker" value={filteredGenre} onChange={(e) => handleGenrePick(e.target.value)}>
        <option value=""> All Genres</option>
        {genreOptions.map((genre, index) => (
          <option key={index} value={genre}> {genre}</option>
        ))}
      </select>

    
      { // If no artist is chosen in filter by artist, display all the songs 
      (filteredArtist === '' && filteredGenre === '' )? sortedSongs.map((item, index) => (
        <SongItem 
        data={item} key={index} favorite={() => favorite(item.name)}
        name = {item.name}
        artist={item.artist}
        length={item.length}
        genre= {item.genre}
        year = {item.year} />
      )) :
      // If an artist is selected, render the songItem component that matches that artist name
      [...filteredSongsByArtist, ... filteredSongsByGenre].map((item, index) => (
      <SongItem
      data={item} key={index} favorite={() => favorite(item.name)}
      name = {item.name}
      artist={item.artist}
      length={item.length}
      genre= {item.genre}
      year = {item.year} />
      ))
}  

  

      </div> 

      <div className="favSongList">
        <h2> Your Favorite Songs</h2>
        <u1> {favList.map((songName, index) =>
        <li key={index}> {songName}</li>)}</u1>
        <div> {finalFavList}</div>
      </div>
      </div>
      </div>
  

  
    
  );
}

export default App;