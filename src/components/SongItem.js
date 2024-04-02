export default function SongItem(props){

    
    return (
        <div>     
        <img class= "songImage" src = {props.data.image} />
        <div className= "itemInfo"> 
        <div className="infoPadding"> 
        <div className="title "> {props.data.name} </div> 
        <div className="genre"> {props.data.genre} </div>
        <div className="year"> {props.data.year} 
         <button onClick={ () => props.favorite(props.data.name)}> Add To Favorites</button> 
         </div> 
         </div>
        </div>
        </div>

    )


}