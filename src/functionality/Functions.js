// This class makes calls that handle the funcionalities such as filtering songs by artist and genre logic, resetting, and adding and removing from favorites


//sorting the songs alphabetically by song title

const sortSongs = (filteredSongs, setFilteredSongs, setSortClicked) => {
  const sort = [...filteredSongs].sort((firstSong, secondSong) => firstSong.name.localeCompare(secondSong.name));
  setFilteredSongs(sort);
  setSortClicked(true);
};

//filtering songs by artistes and genre. checks if the artist and genres are not empty and then sets song's artist or genre from the songData 
// to the inputed artist and genre. if the artist and genre is not selected, or is empty, then just return all the songData (not filtered by artist or genre)
const filterSongs = (songData, artist, genre, setFilteredSongs) => {
  let filtered = songData;
  if (artist !== "") {
    filtered = filtered.filter((song) => song.artist === artist);
  }
  if (genre !== "") {
    filtered = filtered.filter((song) => song.genre === genre);
  }
  setFilteredSongs(filtered);
};
//selects one artist at a time to render
const handleArtistSelection = (artist, setFilteredArtist, filterSongs,songData,filteredGenre, setFilteredSongs
) => { setFilteredArtist(artist); 
  filterSongs(songData, artist, filteredGenre, setFilteredSongs);
};

//selects one genre at a time to render
const handleGenreSelection = ( genre, setFilteredGenre,filterSongs, songData, filteredArtist, setFilteredSongs
) => { setFilteredGenre(genre); filterSongs(songData, filteredArtist, genre, setFilteredSongs);
};


//this is receiving the songData, setFilteredartist.. where this function is called. in this case, from the hompage.js and has access to its states.
const reset = ( songData,setFilteredArtist, setFilteredGenre, setSortClicked, setFilteredSongs,
) => {
  setFilteredArtist("");
  setFilteredGenre("");
  setSortClicked(false);
  setFilteredSongs(songData);
};


const handleAddToFavorites = (song, setFavList, songData, favList) => {
  //copying the data related to the song from my songdata.json
  const matchingSong = songData.find((foundSong) => foundSong.name === song);
  if (matchingSong) {
    // add the new song favorite to the favorites lit 
    setFavList((prevList) => [ ...prevList,
      {  name: matchingSong.name,
        image: matchingSong.image,
        artist: matchingSong.artist,
        length: matchingSong.length,
        genre: matchingSong.genre, }]); }
};

//removes songs from favorites
const handleRemoveFromFavorites = (songToRemove, setFavList, favList) => {
  const updatedFavList = favList.filter((song) => song.name !== songToRemove);
  setFavList(updatedFavList);
};

// loops through each song and gets its length and adds it totalMinutes
const calculateMinutes = (favList) => {
    let totalMinutes = 0;
    favList.forEach((song) => {
      totalMinutes += parseFloat(song.length);
    });
    return totalMinutes.toFixed(2);
  };

const Functions = { filterSongs, handleArtistSelection, handleGenreSelection, sortSongs, reset, calculateMinutes, handleAddToFavorites, handleRemoveFromFavorites};
export default Functions