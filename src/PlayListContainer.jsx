import React from "react";
import BottonPlay from './BottonPlay.jsx';
import './App.css';

function PlayListContainer({ playlist, handleDelete }) {

  return (
    <>
      <h2>Playlist</h2>
      
      {playlist.map((song, index) => (
        <div className="card">
        <div key={index}>
            <img className='imagenes-Canciones' src={song.data.albumOfTrack.coverArt.sources[0].url} alt='Cancion'/>
            <h2>{song.data.name}</h2>
            <button onClick={() => handleDelete(index)}>quit</button>
            <BottonPlay song={song} />
        </div>
        </div>
      ))}
      
    </>
  );
}

export default PlayListContainer;