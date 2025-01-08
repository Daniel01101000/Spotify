import React from "react";

function Playlist({ song, index, addToPlaylist }) {
  return (
    <div>
      <div key={index}>
        <button onClick={addToPlaylist}>Add to Playlist</button>
      </div>
    </div>
  );
}

export default Playlist;