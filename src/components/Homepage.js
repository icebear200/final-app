import React, { useState} from "react";
import SongItem from "./SongItem";
import songData from "../assets/song-data.json";
import GenreFilter from "./GenreFilter";
import ArtistFilter from "./ArtistFilter";
import { filterSongs, sortSongs, reset, calculateMinutes } from "./Functions"; 


//This page renders all the components on the site and includes functionality like handling aritst and genre sleection and 
// favoriting and removing favorite songs

export default function Homepage(){
  const [favList, setFavList] = useState([]);
  const [filteredArtist, setFilteredArtist] = useState("");
  const [filteredGenre, setFilteredGenre] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songData);
  const [sortClicked, setSortClicked] = useState(false);


  // handles the selected artist by filtering the songs by calling on the filterSongs function 
  const handleArtistSelection = (artist) => {
    setFilteredArtist(artist);
    filterSongs(songData, artist, filteredGenre, setFilteredSongs);
  };

  //selects one genre and filters songData based on that
  const handleGenreSelection = (genre) => {
    setFilteredGenre(genre);
    filterSongs(songData, filteredArtist, genre, setFilteredSongs);
  };

  const handleSortSongs = () => {
    sortSongs(filteredSongs, setFilteredSongs, setSortClicked);
  };

  const handleAddToFavorites = (song) => {
    // finding the song in the assets that matches with the some name
    const matchingSong = songData.find((foundSong) => foundSong.name === song);
    if (matchingSong) {
      // add the found songs image, genere, artist, and length to the list of favs
      setFavList((prevList) => [
        ...prevList,
        {
          name: matchingSong.name,
          image: matchingSong.image,
          artis: matchingSong.artist,
          length: matchingSong.length,
          genre: matchingSong.genre,
        },
      ]);
    }
  };

  const handleRemoveFromFavorites = (songToRemove) => {
    const updatedFavList = favList.filter((song) => song.name !== songToRemove);
    setFavList(updatedFavList);
  };

  //  the reset function from function.js
  const handleReset = () => {
    reset(
      songData,
      setFilteredArtist,
      setFilteredGenre,
      setSortClicked,
      setFilteredSongs,
    );
  };

  return (
    <div className="App">
      <div className="appTitle">
        <h1>Angie's Mix</h1>
      </div>
      <div className="buttons">
          <button onClick={handleSortSongs}>Sort Songs Alphabetically</button>
          <button onClick={handleReset}>Reset Filters</button>
          </div>

          <div className = "filtersAndSongsContainer"> 
            <div className="filtersContainer">
              <div className="artistFilterContainer">
                {/* filter by artist */}
                <h3>Filter By Artist</h3>
                <ArtistFilter
                artists={Array.from(new Set(songData.map((item) => item.artist)))}
                  handleArtistSelection={handleArtistSelection}
                  filteredArtist={filteredArtist}
                  songData={songData}
                />
              </div>

              {/* filter by genre */}
              <div className="genreFilterContainer">
                <h3>Filter By Genre</h3>
                <GenreFilter
                  handleGenreSelection={handleGenreSelection}
                  filteredGenre={filteredGenre}
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
              <SongItem
                data={item}
                key={index}
                name={item.name}
                artist={item.artist}
                length={item.length}
                genre={item.genre}
                year={item.year}
                favorite={handleAddToFavorites}
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
              <SongItem
                data={song}
                favorite={handleRemoveFromFavorites}
                isInFavorites={true}
              />
            </li>
          ))}
        </ul>
        <p>You loved {calculateMinutes(favList)} minutes of music </p>
      </div>
      </div>
      </div>
    </div>
  );
}
