import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import '../styles/Biblioteca.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Corazon from "../images/Corazon.png";

function Biblioteca({ playlists }) {
 
  return (
    <div className="ContainerCarpeta">
      <Link
          to={`/playlistssss`}
        >
      <div className="IconoCarpeta">
      <i className="bi bi-collection-fill" ></i>
      </div>
      </Link>

      {playlists.map((playlist, index) => (
        <Link
          to={`/playlist/${index}`}
          className="Playlist-Tus-me-gusta"
          key={index}
        >
          <div className="CardCorazonsss">
            <img src={Corazon} className="Corazon2" alt="Corazón" />
          </div>
        </Link>
      ))}

    </div>
  );
}

export default Biblioteca;
