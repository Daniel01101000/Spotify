import { useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/Options.css';
import Corazon from "../images/Corazon.png";

function Options({ playlists, updatePlaylists }) {
  const location = useLocation();
  const { selectedSong } = location.state || {}; // Obtener la canción seleccionada desde el estado
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(0);

  const handleSelect = (e) => {
    const index = parseInt(e.target.value, 10);
    if (!isNaN(index)) {
      setSelectedPlaylistIndex(index);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (selectedPlaylistIndex === null || isNaN(selectedPlaylistIndex)) {
      alert("Selecciona una playlist válida antes de agregar canciones.");
      return;
    }

    if (!selectedSong) {
      alert("No se seleccionó ninguna canción.");
      return;
    }

    updatePlaylists(selectedPlaylistIndex, selectedSong);
    alert(`La canción "${selectedSong?.data?.name}" se agregó a la playlist.`);
  };

  return (
    <div className="Container">
    <div className="Container-opt">
    <div className="Container-opts">
    <div className="Nombres">

    {playlists.map((playlist, index) => (

  <div key={index} className="radio-container">
    <img src={Corazon} className="Corazon2" alt="Corazón" />
    <span className="label-text">{playlist.name}</span>
    <input
      type="radio"
      id={`playlist-${index}`}
      name="playlist-group"
      value={index}
      onChange={handleSelect}
      className="custom-radio"
    />
    <label htmlFor={`playlist-${index}`} className="custom-label"></label>
    

      

  </div>
))}
</div>
<div className="submit1">
      <form onSubmit={handleAdd}>
        <button type="submit" className="submit">Submit</button>
      </form>
      </div>
      </div>
   </div>
   </div>
  );
  
}

export default Options;
