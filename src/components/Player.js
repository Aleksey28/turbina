import React from 'react';
import url from 'url';
import Composition from './Composition';
import { listOfSongs } from '../utils/constants';
import { Scrollbar } from 'react-scrollbars-custom';
import cn from 'classnames';

export default function Player() {
  const [play, setPlay] = React.useState(false);
  const [minimize, setMinimize] = React.useState(true);
  const [progressMax, setProgressMax] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [refPlayer, setRefPlayer] = React.useState(null);
  const [showText, setShowText] = React.useState(false);
  const [songs, setSongs] = React.useState([]);
  const [selectedSong, setSelectedSong] = React.useState({});
  const [countdown, setCountdown] = React.useState(true);
  const [refNameSong, setRefNameSong] = React.useState(null);

  React.useEffect(() => {
    setSongs(
      listOfSongs.map((item) => {
        return (
          <Composition
            composition={item}
            onSongClick={handleClickOnComposition}
            currentCompositionLink={selectedSong.link}
            key={item.id}
          ></Composition>
        );
      }),
    );
    if (!selectedSong.link) {
      setSelectedSong(listOfSongs[0]);
    }
  }, [selectedSong]);

  React.useEffect(() => {}, [selectedSong]);

  const handleClickPlay = () => {
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
    if (!!ref && !!selectedSong.link) {
      const currentCompositionLink = url.parse(ref.currentSrc).path;
      const selectedCompositionLink = url.parse(selectedSong.link).path;
      if (!!currentCompositionLink && currentCompositionLink !== selectedCompositionLink) {
        const isPlaying = ref.currentTime > 0 && !ref.paused && !ref.ended && ref.readyState > 2;
        if (isPlaying) {
          ref.autoplay = true;
        }
        ref.load();
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

  const handlePlayAudio = () => {
    refPlayer.autoplay = false;
  };

  const handleSetRefNameSong = (ref) => {
    setRefNameSong(ref);
  };

  return (
    <div className="player">
      <div className={cn('player__header', { player__header_minimize: minimize })}>
        <audio
          ref={handleSetRefPlayer}
          onLoadedMetadata={handleSetProgressMax}
          onTimeUpdate={handleSetProgress}
          onEnded={handleClickPlay}
          onPlay={handlePlayAudio}
        >
          <source src={selectedSong.link} type="audio/ogg" />
          <source src={selectedSong.link} type="audio/mpeg" />
        </audio>
        <button
          type="button"
          className={cn('player__btn', { player__btn_action_play: !play, player__btn_action_stop: play })}
          onClick={handleClickPlay}
        ></button>

        {/* Пришлось делать дополнительную обертку, т.к. при скрытии эекстра кнопки, более правая от неё начинает прыгать
      Чтобы она не прыгала ширина предыдущего элемента не должна изменяться. */}
        <div className="player__title">
          <div className={cn('player__song', { player__song_minimize: !minimize })}>
            <div className="player__song-description">
              <p className="player__song-name">
                <span
                  ref={handleSetRefNameSong}
                  className={cn({
                    marquee: isOverflow(refNameSong),
                  })}
                >
                  {selectedSong.name}
                </span>
              </p>
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
            className={cn('player__btn player__btn_action_extra', { player__btn_hidden: minimize })}
            onClick={handleClickExtra}
          >
            {!showText ? 'Текст песни' : 'Релизы'}
          </button>
        </div>
        <button
          type="button"
          className={cn('player__btn', {
            player__btn_action_minimize: !minimize,
            player__btn_action_maximize: minimize,
          })}
          onClick={handleMinMax}
        ></button>
      </div>
      <div className={cn('player__body', { player__body_minimize: minimize })}>
        {/* Можно отключить дефолтные стили для  Scrollbar, но тогда отваляться стили для всех подчиенных элементов и придется их настраивать. А мне нужно настроить только сам скролл.
        Поэтому проще поместить в другой блок, т.к. по умолчани Scrollbar имеет 100% размера родителя.*/}
        <Scrollbar
          // noDefaultStyles="true"
          className={cn('player__body', { player__body_minimize: minimize })}
          trackYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              restProps.style = {};
              return <span {...restProps} ref={elementRef} className="scroll__track" />;
            },
          }}
          thumbYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              restProps.style = {};
              return <div {...restProps} ref={elementRef} className="scroll__thumb" />;
            },
          }}
        >
          <p className="player__body-title">
            {showText ? 'Текст песни:' : songs.length < 2 ? 'Пока что у нас только 1 релиз.' : 'Релизы:'}
          </p>
          {showText ? <p className="player__text">{selectedSong.text}</p> : songs.length < 2 ? <></> : songs}
        </Scrollbar>
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
    return `${hours}:${minutes}:${format2Number(seconds)}`;
  }

  return `${minutes}:${format2Number(seconds)}`;
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

const isOverflow = (ref) => {
  if (!!ref) {
    return (
      ref.offsetWidth - (ref.classList.contains('marquee') ? ref.parentElement.offsetWidth : 0) >
      ref.parentElement.offsetWidth
    );
  } else {
    return false;
  }
};
