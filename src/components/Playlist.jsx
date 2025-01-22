import { Link } from "react-router-dom";
import '../styles/PlayList.css';

function Playlist({ song }) {
  return (
    <div className="Plus-Button">
      {/* Pasar la canción como estado en el enlace */}
      <Link to="/options" state={{ selectedSong: song }}>
        <button className="Plus-Button">
          <i className="bi bi-plus-circle"></i>
        </button>
      </Link>
    </div>
  );
}

export default Playlist;