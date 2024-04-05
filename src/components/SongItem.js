export default function SongItem(props){

    
    return (
        <div>  
        <div className="formatImage"> 
        <img class= "songImage" src = {props.data.image} />
        <div className= "itemInfo"> 
        <div className="infoPadding"> 
        <div className="songAndartist"> 
        <div className="title "> {props.data.name} </div> 
        <div className="artist">{props.data.artist}</div>
        </div>
        <div className="extraAttributes" > 
        <div className="genre"> Genre: {props.data.genre} </div>
        <div className="year"> Year: {props.data.year} </div>
        <div className="length"> Song Time: {props.data.length}</div>
        </div>
        <div className="favButtons">
         <button onClick={ () => props.favorite(props.data.name)}> Add To Favorites</button> 
         <buttton onClick={() => props.removeFavorite(props.data.name)}> Remove Favorite</buttton>
         </div>
         </div> 
         </div>
        </div>
        </div>   
    

    )


}