import React from "react";
import BottonPlay from './BottonPlay.jsx';
import '../styles/cardPlaylist.css';
import '../styles/App.css';
import Corazon from '../images/Corazon.png'

function CardPlaylist({ playlist, handleDelete }) {
  console.log("Contenido de playlist:", playlist);
  return (
    <div className="card-Playlist">
      {playlist.length === 0 ? (
        <p className="Nosongs">No songs in the playlist.</p>
      ) : (
        playlist.map((song, index) => (
          
          <div className="card" key={index}>
            <div className="Content-Image">
            
            {console.log(song)}
            <img className="imagenes-Canciones" 
  src={song?.data?.albumOfTrack?.coverArt?.sources?.[0]?.url || 'default-image-url'} 
  alt="Cancion" />

<div>
      <a href={song.data.uri}>
        
        <button className="play">
          <i className="bi bi-caret-right-fill"></i>
         
        </button>
      </a>
    </div>

            </div>

           <h3>{song.data?.name}</h3>
           
            <button onClick={() => handleDelete(index)} className="Remove">Remove</button>
            
            
          </div>
        ))
      )}
    </div>
  );
}

export default CardPlaylist;

