import React from "react";

function ButtonPlay({ song }) {
  return (
    <div>
        <a href={song.data.uri}><button>a</button></a>
    </div>
  );
}

export default ButtonPlay;