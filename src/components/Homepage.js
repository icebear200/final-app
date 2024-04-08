import React, { useState} from "react";
import SongItem from "./SongItem";
import songData from "../assets/song-data.json";
import GenreFilter from "./GenreFilter";
import ArtistFilter from "./ArtistFilter";
import Functions from "../functionality/Functions";


//This page renders all the components on the site" 
export default function Homepage(){
  const [favList, setFavList] = useState([]);
  const [filteredArtist, setFilteredArtist] = useState("");
  const [filteredGenre, setFilteredGenre] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songData);
  const [sortClicked, setSortClicked] = useState(false);


  return (
    <div className="App">
      <div className="appTitle">
        <h1>Angie's Mix</h1>
      </div>
      <div className="buttons">
          <button onClick={() =>  Functions.sortSongs( filteredSongs, setFilteredSongs, setSortClicked)}>Sort Songs Alphabetically</button>
          <button onClick={() =>Functions.reset(songData, setFilteredArtist, setFilteredGenre,setSortClicked,setFilteredSongs)}>Reset Filters</button>
          </div>

          <div className = "filtersAndSongsContainer"> 
            <div className="filtersContainer">
              <div className="artistFilterContainer">
                {/* filter by artist */}
                <h3>Filter By Artist</h3>
                <ArtistFilter
                  handleArtistSelection={(artist) => Functions.handleArtistSelection( artist, setFilteredArtist, Functions.filterSongs, songData,
                 filteredGenre,setFilteredSongs)}
                 filteredArtist={filteredArtist}
                 songData={songData}
             
                />
              </div>

              {/* filter by genre */}
              <div className="genreFilterContainer">
                <h3>Filter By Genre</h3>
                <GenreFilter
                  handleGenreSelection={(genre) =>Functions.handleGenreSelection(genre, setFilteredGenre,Functions.filterSongs,songData, filteredArtist,
                     setFilteredSongs)
}
                  filteredGenre={filteredGenre}
                  setFilteredGenre={setFilteredGenre} // Pass setFilteredGenre
                  songData={songData}
                />
              </div>
            </div>
          

          {/* rendering songs */}
          <div className = "songsAndFavListContainer"> 
          <div className="songLibAndTitle"> 
          <div className= "songLib"> <h2> Your Song Library</h2> </div>
          
          <div className="SongList">
            {filteredSongs.map((item, index) => (
              <SongItem data={item} key={index}
                name={item.name}
                artist={item.artist}
                length={item.length}
                genre={item.genre}
                year={item.year}
                favorite={() => Functions.handleAddToFavorites( item.name,setFavList,songData, favList)}
              />
            ))}
        
        </div>
        </div>
    

      {/* favorite songs list */}

      <div className="favSongList">
        <h2>Your Favorite Songs</h2>
        <ul>
          {favList.map((song, index) => (
            <li key={index}>
              <SongItem data={song}
               favorite={() =>Functions.handleRemoveFromFavorites(song.name,setFavList,favList)}
               isInFavorites={true}
              />
            </li>
          ))}
        </ul>
        <p>You loved {Functions.calculateMinutes(favList)} minutes of music </p>
      </div>
      </div>
      </div>
    </div>
  );
}
