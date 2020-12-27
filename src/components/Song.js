import React from 'react';
import url from 'url';
import cn from 'classnames';

export default function Composition({ composition, onSongClick, selectedSong }) {
  const handleClick = () => {
    onSongClick(composition);
  };

  return (
    <p
      className={cn('player__song-name player__data-item', {
        'player__data-item_selected': url.parse(composition.link).path === url.parse(selectedSong.link).path,
      })}
      onClick={handleClick}
    >
      {composition.name} — {composition.author}
      {!!composition.originalAuthor && <span className="player__song-feat"> {' .feat '} </span>}
      {!!composition.originalAuthor && composition.originalAuthor}
    </p>
  );
}
