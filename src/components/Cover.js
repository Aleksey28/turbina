import cn from 'classnames';

export default function Cover({ link, minimize, place }) {
  return (
    <img src={link} alt="Обложка трека" className={cn('player__cover', { player__cover_hidden: minimize }, place)} />
  );
}
