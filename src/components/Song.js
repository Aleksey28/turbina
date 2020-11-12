import React from 'react';

export default function Composition({ composition, onSongClick }) {
  const handleClick = () => {
    onSongClick(composition);
  };

  return (
    <p className="player__composition" onClick={handleClick}>
      {composition.name} — {composition.author}
      {!!composition.originalAuthor && <span className="player__song-feat"> {' .feat '} </span>}
      {!!composition.originalAuthor && composition.originalAuthor}
    </p>
  );
}
