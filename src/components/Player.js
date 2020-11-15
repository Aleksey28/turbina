import { useState, useRef } from 'react';
import Song from './Song';
import Cover from './Cover';
import { data } from '../utils/constants';
import { Scrollbar } from 'react-scrollbars-custom';
import cn from 'classnames';
import PlayIcon from './icons/PlayIcon';
import StopIcon from './icons/StopIcon';
import WrapIcon from './icons/WrapIcon';
import UnwrapIcon from './icons/UnwrapIcon';
import { formatTime, offsetLeft, isOverflow } from '../utils/functions';

export default function Player({ onSetBlur }) {
  const refPlayer = useRef(null);
  const refNameSong = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressDuration, setProgressDuration] = useState(0);
  const [minimize, setMinimize] = useState(true);
  const [countdown, setCountdown] = useState(true);
  const [showText, setShowText] = useState(false);
  const [selectedSong, setSelectedSong] = useState(data[0]);

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
    setProgress(0);
  };

  //Обработчики событий команд
  const handleClickPlay = () => {
    !isPlaying ? refPlayer.current.play() : refPlayer.current.pause();
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
    onSetBlur(minimize);
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
      <Cover link={selectedSong.cover} minimize={minimize} addModifier="player__cover_place_top" />

      {/* Блок контроля текущей композицией */}
      <div className={cn('player__controls', { player__controls_minimize: minimize })}>
        {/* Левая часть блока контроля */}
        <div className="player__controls-left">
          {/* Свитчер кнопки запуска и остановки воспроизведения */}
          <button type="button" className="player__btn" onClick={handleClickPlay}>
            {isPlaying ? <StopIcon className="player__btn-icon" /> : <PlayIcon className="player__btn-icon" />}
          </button>
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

            <Cover link={selectedSong.cover} minimize={minimize} addModifier="player__cover_place_among" />

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
            <Cover link={selectedSong.cover} minimize={minimize} addModifier="player__cover_place_left" />

            {/* Блок списка песен и текстов песен */}
            <div className={cn('player__data', { player__data_minimize: minimize })}>
              {/* Компонент скролинга. Можно отключить дефолтные стили для  Scrollbar, но тогда отваляться стили для всех подчиенных элементов и придется их настраивать. А мне нужно настроить только сам скролл.
        Поэтому проще поместить в другой блок, т.к. по умолчани Scrollbar имеет 100% размера родителя.*/}
              <Scrollbar
                // noDefaultStyles="true"
                className={cn({ player__data_minimize: minimize })}
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
                  {showText ? 'Текст песни:' : data.length < 2 ? 'Пока что у нас только 1 релиз.' : 'Релизы:'}
                </p>

                {/* Содержание данных */}
                {showText ? (
                  <p className="player__text">{selectedSong.text}</p>
                ) : (
                  data.length > 1 &&
                  data.map((item) => (
                    <Song
                      composition={item}
                      onSongClick={handleClickOnComposition}
                      key={item.id}
                      selectedSong={selectedSong}
                    ></Song>
                  ))
                )}
              </Scrollbar>
            </div>
          </div>
        </div>
      </div>
      {/* Свитчер раскрытия и закрытия полной формы */}
      <button type="button" className="player__btn player__btn_action_open-close" onClick={handleClickMinimize}>
        {minimize ? <UnwrapIcon className="player__btn-icon" /> : <WrapIcon className="player__btn-icon" />}
      </button>
    </div>
  );
}
