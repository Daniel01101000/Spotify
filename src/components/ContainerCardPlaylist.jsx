import React from "react";
import "../styles/ContainerCardPlaylist.css";
import CardPlaylist from "./cardPlaylist";
import Corazon from "../images/Corazon.png";

function ContainerCardPlaylist({ playlist, setPlaylists, playlistIndex }) {
  const handleDelete = (songIndex) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.map((p, i) =>
        i === playlistIndex
          ? { ...p, songs: p.songs.filter((_, idx) => idx !== songIndex) }
          : p
      )
    );
  };
  
  return (
    <div className="ContainerCardPlaylist-Father">
      <div className="ContainerCardPlaylist">
        <div className="CorazonContainer">
          <img src={Corazon} className="Corazon" alt="Corazón" />
          <div className="Words">
            <p className="letters-Play">Play list</p>
            <h1 className="Tus-me-gusta">{playlist.name}</h1>
          </div>
        </div>
        <CardPlaylist playlist={playlist.songs} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default ContainerCardPlaylist;
