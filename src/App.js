
import './App.css';
import {useState} from "react"
import SongItem from './components/SongItem';
import songData from './assets/song-data.json';
// import {View, Picker} from 'react-native';

songData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/"+ item.image;
});

function App() {
const [favList, setFavList] = useState ([])
const [sortedSongs, setSortedSongs] = useState(songData)
const [filteredArtist, setFilteredArtist] = useState(songData)
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

  // const filterArtist = () => {
  //   const filterArtistNew = filteredArtistCopy.filter(artist)
  //   setFilteredArtist(filterArtistNew)
  // }
}

  return (
    <div className="App">
      <div className="appTitle">  <h1>Angie's Mix  </h1></div>
      <div class="songListContainer"> 
      <div class="SongList">   
      <button onClick={sortSongs}>Sort Songs Alphabetically</button>
      {/* <Picker> </Picker> */}
    
      <header className="App-header">
        {/* <img src={image} className="App-logo" alt="logo" /> */}
       
       

       
        {sortedSongs.map ((item, index) => (
          <SongItem data={item} key={index} favorite={() => favorite(item.name)}
          name = {item.name}
          artist={item.artist}
          length={item.length}
          genre= {item.genre}
          year = {item.year}
           />
        ))}


      </header>

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