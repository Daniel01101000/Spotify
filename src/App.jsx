import './styles/App.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './images/Logo.png';
import Home from './components/Home.jsx';
import Options from './components/Options.jsx';
import ContainerCardPlaylist from './components/ContainerCardPlaylist.jsx';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Playlistssss from './components/Playlistssss.jsx';

function App() {
  // Inicializar playlists desde localStorage
  const [playlists, setPlaylists] = useState(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists')) || [];
    return storedPlaylists;
  });

  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState('Coldplay'); // Valor inicial para buscar canciones predeterminadas

  useEffect(() => {
    // Guardar playlists en localStorage cuando cambien
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  // Llamada a getSong automáticamente al cargar la página
  useEffect(() => {
    getSong(song);
  }, []); // Solo se ejecuta una vez al montar el componente

  async function getSong(song) {
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'b1eb3c50d2msh287b4e5eb709c81p1890c8jsn9426db5e3503',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const url = `https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
      const data = await fetch(url, options);
      const res = await data.json();
      if (res.tracks && res.tracks.items) {
        setSongs(res.tracks.items);
      } else {
        alert('No tracks found');
        setSongs([]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (song.trim() === '') {
      alert('You have to write a song');
      return;
    }
    getSong(song);
    setSong('');
  };

  const PlaylistPage = () => {
    const { index } = useParams();
    const playlistIndex = Number.isNaN(parseInt(index, 10)) ? -1 : parseInt(index, 10);

    if (playlistIndex < 0 || !playlists[playlistIndex]) {
      return <p>Playlist no encontrada</p>;
    }

    return (
      <ContainerCardPlaylist
        playlistIndex={playlistIndex}
        playlist={playlists[playlistIndex]}
        setPlaylists={setPlaylists}
      />
    );
  };

  const updatePlaylists = (playlistIndex, song) => {
    if (playlistIndex < 0 || playlistIndex >= playlists.length) {
      alert('Índice de playlist no válido.');
      return;
    }

    const updatedPlaylists = [...playlists];
    if (!updatedPlaylists[playlistIndex].songs) {
      updatedPlaylists[playlistIndex].songs = [];
    }
    updatedPlaylists[playlistIndex].songs.push(song);
    setPlaylists(updatedPlaylists);
    alert(`La canción "${song}" se agregó a la playlist "${updatedPlaylists[playlistIndex].name}".`);
  };

  const deletePlaylist = (index) => {
    const updatedPlaylists = playlists.filter((_, i) => i !== index);
    setPlaylists(updatedPlaylists);
    alert(`La playlist ${index + 1} ha sido eliminada.`);
  };

  const deleteSongFromPlaylist = (playlistIndex, songIndex) => {
    const updatedPlaylists = [...playlists];
    if (updatedPlaylists[playlistIndex]?.songs) {
      updatedPlaylists[playlistIndex].songs.splice(songIndex, 1);
      setPlaylists(updatedPlaylists);
      alert('La canción fue eliminada de la playlist.');
    } else {
      alert('No se encontró la canción en la playlist.');
    }
  };

  const [placeholderText, setPlaceholderText] = useState("¿Qué quieres reproducir?");

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth < 430) {
        setPlaceholderText("Buscar...");
      } else {
        setPlaceholderText("¿Qué quieres reproducir?");
      }
    };

    // Ejecutar al cargar la página
    updatePlaceholder();

    // Añadir un event listener para cambios de tamaño
    window.addEventListener("resize", updatePlaceholder);

    // Limpieza del event listener al desmontar
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  return (
    <BrowserRouter>
      <div>
        <header>
          <img className="Logo" src={logo} alt="logo" />
          <div className="Center-content">
            <form onSubmit={handleSearch}>
              <div className="Buscador-container">
                <input
                  placeholder={placeholderText}
                  tabIndex="0"
                  type="text"
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  className="Buscador"
                />
                <i className="bi bi-search Buscador-icon"></i>
              </div>
            </form>
          </div>
          <Link to="/" className="Home">
            <i className="bi bi-house-door"></i>
          </Link>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                songs={songs}
                setSongs={setSongs}
                playlists={playlists}
                setPlaylists={setPlaylists}
                updatePlaylists={updatePlaylists}
                deletePlaylist={deletePlaylist}
                deleteSongFromPlaylist={deleteSongFromPlaylist}
              />
            }
          />
          <Route
            path="/options"
            element={<Options playlists={playlists} updatePlaylists={updatePlaylists} />}
          />
          <Route path="/playlist/:index" element={<PlaylistPage />} />
          <Route
            path="/playlist"
            element={<ContainerCardPlaylist playlist={playlists} setPlaylists={setPlaylists} />}
          />

          <Route
            path="/playlistssss"
            element={
            <Playlistssss playlists={playlists} setPlaylists={setPlaylists}/>
          }
          />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
