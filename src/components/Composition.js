import React from 'react';

export default function Composition({ composition, onSongClick, currentCompositionLink }) {
  const handleClick = () => {
    onSongClick(composition);
  };

  return (
    currentCompositionLink !== composition.link && (
      <p className="player__composition" onClick={handleClick}>
        {composition.name} — {composition.author}
        {!!composition.originalAuthor && <span className="playet__song-feat"> {' .feat '} </span>}
        {!!composition.originalAuthor && composition.originalAuthor}
      </p>
    )
  );
}
