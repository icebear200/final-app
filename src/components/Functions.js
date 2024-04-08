// This class makes calls that handle the funcionalities such as filtering songs by artist and genre logic, 
// resetting the page, and calculating the total minutes of the songs in the favorite list


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


//this is receiving the songData, setFilteredartist.. where this function is called. in this casse, from the hompage.js
//and has access to its states.
const reset = (
  songData,
  setFilteredArtist,
  setFilteredGenre,
  setSortClicked,
  setFilteredSongs,
) => {
  setFilteredArtist("");
  setFilteredGenre("");
  setSortClicked(false);
  setFilteredSongs(songData);
};

// loops through each song and gets its length and adds it totalMinutes
const calculateMinutes = (favList) => {
    let totalMinutes = 0;
    favList.forEach((song) => {
      totalMinutes += parseFloat(song.length);
    });
    return totalMinutes.toFixed(2);
  };

export { filterSongs, sortSongs, reset, calculateMinutes};