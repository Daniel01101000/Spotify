import { useState, useEffect } from "react";
import '../styles/Home.css';
import Playlist from './Playlist.jsx';
import PlayListContainer from './PlayListContainer.jsx';
import BottonPlay from './BottonPlay.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Options from "./Options.jsx";
import Biblioteca from "./Biblioteca.jsx";


function Home({ songs, playlist, setPlaylist, playlists, setPlaylists, setSelectedPlaylistIndex, addToPlaylist, song }) {
  {song && (
    <Options
    song={song}
    />
  )}
  
  return (
    <>
    
    <div className="Container">

    <div className="Playlist1">
      
      <Biblioteca
        playlists={playlists}
      
      />

    </div>

      
     <div className="Playlist">
      
      <PlayListContainer
        playlist={playlist}
        setPlaylist={setPlaylist}
        playlists={playlists}
        setPlaylists={setPlaylists}
        className={PlayListContainer}
      />
    </div>

    


      <div className="CardFondo">
        {songs.map((song, index) => {
          const coverUrl = song?.data?.albumOfTrack?.coverArt?.sources?.[0]?.url || '';
          const name = song?.data?.name || 'Canción desconocida';
          const artist = song?.data?.artists?.items?.[0]?.profile?.name || 'Artista desconocido';
         console.log({song});
          return (
            <div key={index} className="cards">
              <div className="Content-Image">
                {coverUrl && (
                  <img
                    className="imagenes-Canciones"
                    src={coverUrl}
                    alt="Canción"
                  />
                )}

<div>
      <a href={song.data.uri}>
        
        <button className="play">
          <i className="bi bi-caret-right-fill"></i>
         
        </button>
      </a>
    </div>

              </div>

              <h4>{name}</h4>
              <p>{artist}</p>

              {/* Pasar el índice de la canción y la función para agregarla a la playlist */}
              <Playlist
                song={song}  // Pasar la canción completa
                index={index} // Pasar el índice de la canción
                addToPlaylist={addToPlaylist} // Asegúrate de pasar la función que maneja la adición a la playlist
              />
            </div>
            
              );
        })}
      </div>
    </div>
    <div className="ContainerPlaylist2">
    <div className="Playlist2">
      
    <PlayListContainer
        playlist={playlist}
        setPlaylist={setPlaylist}
        playlists={playlists}
        setPlaylists={setPlaylists}
        className={PlayListContainer}
      />

    </div>
</div>
    </>
  );
       
}

export default Home;
