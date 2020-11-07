import React from 'react';
import url from 'url';
import Composition from './Composition';
// import ReactCSSTransitionGroup from 'react-transition-group';
import { listOfSongs } from '../utils/constants';

export default function Player() {
  const [play, setPlay] = React.useState(false);
  const [minimize, setMinimize] = React.useState(true);
  const [progressMax, setProgressMax] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [refPlayer, setRefPlayer] = React.useState();
  const [showText, setShowText] = React.useState(false);
  const [songs, setSongs] = React.useState([]);
  const [selectedSong, setSelectedSong] = React.useState({});
  const [countdown, setCountdown] = React.useState(true);

  React.useEffect(() => {
    setSongs(
      listOfSongs.map((item) => {
        return <Composition composition={item} onSongClick={handleClickOnComposition} key={item.id}></Composition>;
      }),
    );
    setSelectedSong(listOfSongs[0]);
  }, []);

  React.useEffect(() => {}, [selectedSong]);

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
    if (!!ref && url.parse(ref.currentSrc).path !== selectedSong.link) {
      ref.load();
      if (ref.paused && play) {
        ref.play();
      }
    }
  };

  const handleSetProgressMax = () => {
    setProgressMax(refPlayer.duration);
  };

  const handleSetProgress = () => {
    setProgress(refPlayer.currentTime);
  };

  const handleSkipAhead = (evt) => {
    if (!!refPlayer.duration) {
      const pos = (evt.pageX - offsetLeft(evt.currentTarget)) / evt.currentTarget.clientWidth;
      refPlayer.currentTime = pos * refPlayer.duration;
    }
  };

  const handleClickOnComposition = (composition) => {
    setSelectedSong(composition);
  };

  const handleClickOnTime = () => {
    setCountdown(!countdown);
  };

  return (
    <div className={`player`}>
      <div className={`player__header ${minimize ? 'player__header_minimize' : ''}`}>
        <audio
          ref={handleSetRefPlayer}
          onLoadedMetadata={handleSetProgressMax}
          onTimeUpdate={handleSetProgress}
          onEnded={handlePlay}
        >
          <source src={selectedSong.link} />
        </audio>
        <button
          type="button"
          className={`player__btn player__btn_action_${!play ? 'play' : 'stop'}`}
          onClick={handlePlay}
        ></button>

        {/* Пришлось делать дополнительную обертку, т.к. при скрытии эекстра кнопки, более правая от неё начинает прыгать
      Чтобы она не прыгала ширина предыдущего элемента не должна изменяться. */}
        <div className="player__title">
          <div className={`player__song ${minimize ? '' : 'player__song_minimize'}`}>
            <div className="player__song-description">
              <p className="player__song-name">{selectedSong.name}</p>
              <p className="player__song-time" onClick={handleClickOnTime}>
                {formatTime((refPlayer && countdown ? refPlayer.duration : progress + progress) - progress)}
              </p>
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
            {!showText ? 'Текст песни' : 'Релизы'}
          </button>
        </div>
        <button
          type="button"
          className={`player__btn player__btn_action_${!minimize ? 'minimize' : 'maximize'}`}
          onClick={handleMinMax}
        ></button>
      </div>
      <div className={`player__body ${minimize ? 'player__body_minimize' : ''}`}>
        <p className="player__body-title">
          {showText ? 'Текст песни:' : songs.length < 2 ? 'Пока что у нас только 1 релиз.' : 'Релизы:'}
        </p>
        {showText ? <p className="player__text">{selectedSong.text}</p> : songs.length < 2 ? <></> : songs}
      </div>
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

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}
