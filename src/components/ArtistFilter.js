
import { useState, useEffect } from "react";

// component that renders the artist filters
export default function ArtistFilter(props){

  const [selectedArtist, setSelectedArtist] = useState("");
  const [checkboxesState, setCheckboxesState] = useState({});

  //re renders to show the selectedartist
  useEffect(() => {
    const newState = {};
    props.songData.forEach((item) => {
      newState[item.artist] = selectedArtist === item.artist;
    });
    setCheckboxesState(newState);
  }, [selectedArtist, props.songData]);

  // when an artist checkbox is selected it updates the artist selection to be currently selected artist
  const handleArtistSelection = (artist) => {
    setSelectedArtist(artist);
    props.handleArtistSelection(artist);
  };


  //function to track checkbox change to allow for only one selection at a time. creates a copy of the checkbox state
  // and updates the state with the checkbox selected and checks if there is an artist selected in the new state, if so it sets the artist, if not its an empty string
  const handleCheckboxChange = (artist) => {
    const newState = { ...checkboxesState };
    newState[artist] = !newState[artist];
    setCheckboxesState(newState);
    handleArtistSelection(newState[artist] ? artist : "");
  };


  return (
    <div className="artistFilterContainer">
      {/* loops through the songData and displays the artists. The new Set array makes sure only unique
       values are displayed (no duplicates) newSet: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set*/}
      {[...new Set(props.songData.map((item) => item.artist))].map(
        (item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checkboxesState[item]}
              onChange={() => handleCheckboxChange(item)}
            />{" "}
            {item}
          </label>
        )
      )}
    </div>
  );
}
