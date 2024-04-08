import { useState} from "react";

//component that renders the genre filter
export default function GenreFilter(props){
  // useState that keeps track of the selected genre
  const [selectedGenre, setSelectedGenre] = useState("");

  //handles the genre selection by setting the genre to the selected genre
  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    props.handleGenreSelection(genre);
  };

 //renders the genre filter checkboxes
  return (
    <div className="genreFilterContainer">
      {/* loops through the songData and displays unique values of the genres and creates checkboxes that check the selected genre */}
      {[...new Set(props.songData.map((item) => item.genre))].map(
        (item, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={selectedGenre === item}
              onChange={() => handleGenreSelection(item)}
            />{" "}
            {item}
          </label>
        )
      )}
    </div>
  );

}
