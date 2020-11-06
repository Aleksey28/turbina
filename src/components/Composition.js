export default function Composition({ composition, onSongClick }) {
  const handleClick = () => {
    onSongClick(composition);
  };

  return (
    <p className="player__composition" onClick={handleClick}>
      {composition.name}
    </p>
  );
}
