import React from "react";
import '../styles/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles/Home.css';
import '../styles/ButtonPlay.css';

function BottonPlay({ song }) {
  if (!song || !song.data || !song.data.uri) {
    return null;
  }

  return (
    <div>
      <a href={song.data.uri}>
        
        <button className="play">
          <i className="bi bi-caret-right-fill"></i>
         
        </button>
      </a>
    </div>
  );
}

export default BottonPlay;