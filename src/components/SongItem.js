
import React from "react";

export default function SongItem(props){

  return (
    <div>
      <div className="formatImage">
        <img className="songImage" src={props.data.image} alt={props.data.name} />
        <div className="itemInfo"></div>

        <div className="infoPadding">
          <div className="songAndartist">
            <div className="title">{props.data.name}</div>
            <div className="artist">{props.data.artist}</div>
          </div>
          <div className="attributesContainer">
          <div className="length">Time: {props.data.length}</div>
          <div className="genre"> Genre: {props.data.genre}</div>
          <div className="year"> Year: {props.data.year}</div>
          </div>

          {/* Conditional rendering of adding to favorites */}
          {!props.isInFavorites && (
            <button onClick={() => props.favorite(props.data.name)}>
              Add To Favorites
            </button>
          )}
          {/* and conditional rendering of removing from favorites */}
          {props.isInFavorites && (
            <button onClick={() => props.favorite(props.data.name)}>
              Remove from Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );

    }