import { useState, useRef, useEffect } from 'react';
import Song from './Song';
import Cover from './Cover';
import { data } from '../utils/constants';
import { Scrollbar } from 'react-scrollbars-custom';
import cn from 'classnames';
import PlayIcon from './icons/PlayIcon';

export default function Player() {
  const refPlayer = useRef(null);
  const refNameSong = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressDuration, setProgressDuration] = useState(0);
  const [minimize, setMinimize] = useState(true);
  const [countdown, setCountdown] = useState(true);
  const [showText, setShowText] = useState(false);
  const [selectedSong, setSelectedSong] = useState(data[0]);
  const [listSongs, setListSongs] = useState([]);

  useEffect(() => {
    setListSongs(
      data.map((item) => (
        <Song
          composition={item}
          onSongClick={handleClickOnComposition}
          key={item.id}
          selectedSong={selectedSong}
        ></Song>
      )),
    );
  }, [selectedSong]);

  // Обработчики событий плеера

  const handlePlayerLoadedMetadata = () => {
    setProgressDuration(refPlayer.current.duration);
  };

  const handlePlayerTimeUpdate = () => {
    const currentTime = Math.floor(refPlayer.current.currentTime);
    if (currentTime !== Math.floor(progress)) {
      setProgress(refPlayer.current.currentTime);
    }
  };

  const handlePlayerEnded = () => {
    setIsPlaying(!isPlaying);
  };

  //Обработчики событий команд
  const handleClickPlay = () => {
    if (!isPlaying) {
      refPlayer.current.play();
    } else {
      refPlayer.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClickOnComposition = (composition) => {
    setSelectedSong(composition);
    setIsPlaying(false);
    refPlayer.current.load();
  };

  const handleClickOnTime = () => {
    setCountdown(!countdown);
  };

  const handleOnProgress = (evt) => {
    if (progressDuration > 0) {
      const pos = (evt.pageX - offsetLeft(evt.currentTarget)) / evt.currentTarget.clientWidth;
      refPlayer.current.currentTime = pos * refPlayer.current.duration;
    }
  };

  const handleClickExtra = () => {
    setShowText(!showText);
  };

  const handleClickMinimize = () => {
    setMinimize(!minimize);
  };

  return (
    <div className={cn('player', { player_maximize: !minimize })}>
      {/* Скрытый тег аудио, чтобы раскрыть, необходимо указать атрибут controls */}
      <audio
        ref={refPlayer}
        onLoadedMetadata={handlePlayerLoadedMetadata}
        onTimeUpdate={handlePlayerTimeUpdate}
        onEnded={handlePlayerEnded}
      >
        <source src={selectedSong.link} type="audio/ogg" />
        <source src={selectedSong.link} type="audio/mpeg" />
      </audio>

      {/* Обложка трека */}
      <Cover link={selectedSong.cover} minimize={minimize} addClass="player__cover_place_top" />

      {/* Блок контроля текущей композицией */}
      <div className={cn('player__controls', { player__controls_minimize: minimize })}>
        {/* Левая часть блока контроля */}
        <div className="player__controls-left">
          {/* Свитчер кнопки запуска и остановки воспроизведения */}
          <button
            type="button"
            className={cn('player__btn', { player__btn_action_play: !isPlaying, player__btn_action_stop: isPlaying })}
            onClick={handleClickPlay}
          ></button>
        </div>

        <div className="player__controls-center">
          <div className="player__controls-top">
            {/* Средний блок контроля */}
            <div className={cn('player__controls-middle', { 'player__controls-middle_minimize': !minimize })}>
              {/* Блок информации о песне */}
              <div className="player__song">
                <p className="player__song-name">
                  <span
                    ref={refNameSong}
                    className={cn({
                      marquee: isOverflow(refNameSong.current),
                    })}
                  >
                    {selectedSong.name} — {selectedSong.author}
                    {!!selectedSong.originalAuthor && <span className="player__song-feat"> {' .feat '} </span>}
                    {!!selectedSong.originalAuthor && selectedSong.originalAuthor}
                  </span>
                </p>
                <p className="player__song-time" onClick={handleClickOnTime}>
                  {formatTime(
                    (!!refPlayer.current && countdown ? refPlayer.current.duration : progress + progress) - progress,
                  )}
                </p>
              </div>

              {/* Блок прогресса */}
              <div className="progress" onClick={handleOnProgress}>
                <div className="progress__bg">
                  <div
                    className="progress__bar"
                    style={{
                      width: `${(progress / progressDuration) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <Cover link={selectedSong.cover} minimize={minimize} addClass="player__cover_place_among" />

            {/* Правый блок контроля */}
            <div className={cn('player__controls-right', { 'player__controls-right_minimize': minimize })}>
              {/* Ссылка для открытия плеера */}

              {!minimize && !!selectedSong.videoLink && (
                <a href={selectedSong.videoLink} className="player__link-video" target="_blank" rel="noreferrer">
                  <PlayIcon className="player__link-icon" />
                  Клип
                </a>
              )}
              {/* Свитчер кнопки экстра (Текст песни/Релизы) */}
              <button
                type="button"
                className={cn('player__btn player__btn_action_extra', { player__btn_hidden: minimize })}
                onClick={handleClickExtra}
              >
                {!showText ? 'Текст песни' : 'Релизы'}
              </button>
            </div>
          </div>

          <div className="player__bottom">
            <Cover link={selectedSong.cover} minimize={minimize} addClass="player__cover_place_left" />

            {/* Блок списка песен и текстов песен */}
            <div className={cn('player__data', { player__data_minimize: minimize })}>
              {/* Компонент скролинга. Можно отключить дефолтные стили для  Scrollbar, но тогда отваляться стили для всех подчиенных элементов и придется их настраивать. А мне нужно настроить только сам скролл.
        Поэтому проще поместить в другой блок, т.к. по умолчани Scrollbar имеет 100% размера родителя.*/}
              <Scrollbar
                // noDefaultStyles="true"
                className={cn('player__data', { player__data_minimize: minimize })}
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
                {/* Заголовок данных */}
                <p className="player__data-title">
                  {showText ? 'Текст песни:' : listSongs.length < 2 ? 'Пока что у нас только 1 релиз.' : 'Релизы:'}
                </p>

                {/* Содержание данных */}
                {showText ? (
                  <p className="player__text">{selectedSong.text}</p>
                ) : listSongs.length < 2 ? (
                  <></>
                ) : (
                  listSongs
                )}
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
      {/* Свитчер раскрытия и закрытия полной формы */}
      <button
        type="button"
        className={cn('player__btn', {
          player__btn_action_minimize: !minimize,
          player__btn_action_maximize: minimize,
        })}
        onClick={handleClickMinimize}
      ></button>
    </div>
  );
}

// Функция форматирования секунд
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

// Функция форматирования до двух знаяков числа
function format2Number(num) {
  return ('0' + num).slice(-2);
}

// Функция подсчета расстояния до края страницы
function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

// Функция проверки вместимости элемента в родительский блок
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
