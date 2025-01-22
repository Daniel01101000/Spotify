import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Playlistssss.css";
import Corazon from "../images/Corazon.png";

function Playlistssss({ playlists, setPlaylists }) {
    const [name, setName] = useState("");
  
    // Manejar la creación de nuevas playlists
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && name.trim() !== "") {
        const newPlaylist = { name: name.trim(), songs: [] };
        const updatedPlaylists = [...playlists, newPlaylist];
        setPlaylists(updatedPlaylists);
        savePlaylistsToLocalStorage(updatedPlaylists);
        setName("");
      }
    };
  
    // Cargar playlists desde localStorage al iniciar
    useEffect(() => {
      const storedPlaylists = localStorage.getItem("playlists");
      if (storedPlaylists) {
        setPlaylists(JSON.parse(storedPlaylists));
      }
    }, [setPlaylists]);
  
    // Guardar playlists en localStorage cuando cambien
    useEffect(() => {
      savePlaylistsToLocalStorage(playlists);
    }, [playlists]);
  
    // Función para guardar en localStorage
    const savePlaylistsToLocalStorage = (updatedPlaylists) => {
      try {
        localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
      } catch (error) {
        console.error("Error al guardar en localStorage:", error);
      }
    };
  
    // Manejar eliminación de playlists
    const handleDelete = (index) => {
      const updatedPlaylists = playlists.filter((_, i) => i !== index);
      setPlaylists(updatedPlaylists);
    };
  
    return (
      <div className="PlayListContainer-Container">
        <div className="BigDiv"></div>
        <h2>Playlists</h2>
  
        <input
          placeholder="Crea una nueva Playlist!!!"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="CreatePlaylist"
          aria-label="Crear una nueva Playlist"
        />
  
        {playlists.map((playlist, index) => (
          <Link
            to={`/playlist/${index}`}
            className="Playlist-Tus-me-gusta"
            key={index}
          >
            <div className="Card-Megusta">
              <img src={Corazon} className="Corazon2" alt="Corazón" />
              <p className="Name">{playlist.name}</p>
              <button
                className="Delete"
                onClick={() => handleDelete(index)}
                aria-label={`Eliminar la playlist ${playlist.name}`}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </Link>
        ))}
      </div>
    );
  }

export default Playlistssss;