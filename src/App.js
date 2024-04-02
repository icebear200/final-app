
import './App.css';
import {useState} from "react"
import SongItem from './components/SongItem';
import songData from './assets/song-data.json';

songData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/"+ item.image;
});

function App() {

const [favList, setFavList] = useState ([])
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
  return (
    <div className="App">
      <div class="SongList">   
      <header className="App-header">
        {/* <img src={image} className="App-logo" alt="logo" /> */}
       
        {songData.map ((item, index) => (
          <SongItem data={item} key={index} favorite={() => favorite(item.name)}
          name = {item.name}
          genre= {item.genre}
          year = {item.year}
           />
        ))}

{/* 
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>

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