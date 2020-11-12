import cn from 'classnames';
import PlayIcon from './icons/PlayIcon';

export default function BtnPlayClip({ isHidden, onClik }) {
  return (
    <button type="button" className={cn('btn-play-clip')}>
      <PlayIcon className="btn-play-clip__icon" fill="#000000" />
      <span className="btn-play-clip__text">Клип</span>
    </button>
  );
}
