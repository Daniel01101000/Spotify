import './App.css';
import { useState } from 'react';
import Playlist from './Playlist';
import PlayListContainer from './PlayListContainer';
import BottonPlay from './BottonPlay.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from './Logo.png';

function App() {
  const [song, setSong] = useState('');
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]); // Inicializa como array vacío

  const handleSearch = (e) => {
    e.preventDefault();
    if (song.trim() === '') {
      alert('You have to write a song');
      return;
    }

    setSong('');
    getSong(song);
  };

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'b1eb3c50d2msh287b4e5eb709c81p1890c8jsn9426db5e3503',
      'x-rapidapi-host': 'spotify23.p.rapidapi.com',
    },
  };

  async function getSong(song) {
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
      let data = await fetch(url, options);
      let res = await data.json();
      console.log(res); // Imprime la respuesta completa en la consola
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

  function addToPlaylist(song) {
    if (song && song.data) {
      setPlaylist([...playlist, song]);
    } else {
      console.error('Invalid song data:', song);
    }
  }

  function handleDelete(index) {
    setPlaylist(playlist.filter((_, i) => i !== index));
  }

  return (
    <div>
    <header>
    <img className='Logo' src={logo} alt='logo'/>
      
      <div class="Center-content">
      <form onSubmit={handleSearch}>
        <input type="text" value={song} onChange={(e) => setSong(e.target.value)} className='Buscador' lder="Search..."/>
        <button type="submit" className='Lupa'><i class="bi bi-search"></i></button>
      </form>
      </div>
    </header>

    <div className="Container">

    
    <div className="Playlist">
    
      <PlayListContainer playlist={playlist} handleDelete={handleDelete}/>
     
      </div>

      <div className="Card">
        {songs.map((song, index) => (
          <div key={index} className="card">
            {song.data && song.data.albumOfTrack && song.data.albumOfTrack.coverArt && song.data.albumOfTrack.coverArt.sources && song.data.albumOfTrack.coverArt.sources[0] && (
              <img className='imagenes-Canciones' src={song.data.albumOfTrack.coverArt.sources[0].url} alt='Cancion'/>
            )}
            {song.data && song.data.name && (
             <h2>{song.data.name}</h2>
            )}
            <p>{song.data.date}</p>
            <Playlist song={song} index={index} addToPlaylist={() => addToPlaylist(song)} />
            <BottonPlay song={song} />
          </div>
        ))}
      </div>
    </div>
</div>
  );
}





export default App;