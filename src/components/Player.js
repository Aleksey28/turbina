import React from 'react';

export default function Player({ song }) {
  const [play, setPlay] = React.useState(false);
  const [minimize, setMinimize] = React.useState(true);
  const [progressMax, setProgressMax] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [refPlayer, setRefPlayer] = React.useState();
  const [showText, setShowText] = React.useState(true);

  const handlePlay = () => {
    if (!!refPlayer.duration) {
      if (!play) {
        refPlayer.play();
      } else {
        refPlayer.pause();
      }
    }
    setPlay(!play);
  };

  const handleClickExtra = () => {
    setShowText(!showText);
  };

  const handleMinMax = () => {
    setMinimize(!minimize);
  };

  const handleSetRefPlayer = (ref) => {
    setRefPlayer(ref);
  };

  const handleSetProgressMax = () => {
    setProgressMax(refPlayer.duration);
  };

  const handleSetProgress = () => {
    setProgress(refPlayer.currentTime);
  };

  const handleSkipAhead = (evt) => {
    if (!!refPlayer.duration) {
      const pos = (evt.pageX - evt.currentTarget.offsetLeft) / evt.currentTarget.offsetWidth;
      refPlayer.currentTime = pos * refPlayer.duration;
    }
  };

  return (
    <div className="player">
      <audio
        ref={handleSetRefPlayer}
        onLoadedMetadata={handleSetProgressMax}
        onTimeUpdate={handleSetProgress}
        onEnded={handlePlay}
      >
        <source src={song.link} />
      </audio>
      <button
        type="button"
        className={`player__btn player__btn_action_${!play ? 'play' : 'stop'}`}
        onClick={handlePlay}
      ></button>

      {/* Пришлось делать дополнительную обертку, т.к. при скрытии эекстра кнопки, более правая от неё начинает прыгать
      Чтобы она не прыгала ширина предыдущего элемента не должна изменяться. */}
      <div className="player__title">
        <div className={`player__song ${minimize ? '' : 'player__song_small'}`}>
          <div className="player__song-description">
            <p className="player__song-name">{song.name}</p>
            <p className="player__song-time">{formatTime(progress)}</p>
          </div>
          <div className="progress" onClick={handleSkipAhead}>
            <div className="progress__bg">
              <div
                className="progress__bar"
                style={{
                  width: `${(progress / progressMax) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`player__btn player__btn_action_extra ${minimize ? 'player__btn_hidden' : ''}`}
          onClick={handleClickExtra}
        >
          {showText ? 'Текст песни' : 'Релизы'}
        </button>
      </div>
      <button
        type="button"
        className={`player__btn player__btn_action_${!minimize ? 'minimize' : 'maximize'}`}
        onClick={handleMinMax}
      ></button>
    </div>
  );
}

function formatTime(s) {
  if (!s && s !== 0) {
    return '00:00';
  }

  const totalSeconds = Math.floor(s);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) - hours * 60;
  const seconds = totalSeconds - minutes * 60 - hours * 3600;

  if (hours) {
    return hours + ':' + minutes + ':' + format2Number(seconds);
  }

  return minutes + ':' + format2Number(seconds);
}

function format2Number(num) {
  return ('0' + num).slice(-2);
}
