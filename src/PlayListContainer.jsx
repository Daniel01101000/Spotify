import React from "react";
import BottonPlay from './BottonPlay.jsx';

function PlayListContainer({ playlist, handleDelete }) {

  return (
    <>
      <h2>Playlist</h2>
      {playlist.map((song, index) => (
        <div key={index}>
            <img src={song.data.albumOfTrack.coverArt.sources[0].url} alt='Cancion'/>
            <h2>{song.data.name}</h2>
            <button onClick={() => handleDelete(index)}>quit</button>
            <BottonPlay song={song} />
        </div>
      ))}
    </>
  );
}

export default PlayListContainer;