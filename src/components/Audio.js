export default function Audio({
  selectedSong,
  handleSetRefPlayer,
  handleSetProgressMax,
  handleSetProgress,
  handlePlay,
}) {
  debugger;
  return (
    <audio
      ref={handleSetRefPlayer}
      onLoadedMetadata={handleSetProgressMax}
      onTimeUpdate={handleSetProgress}
      onEnded={handlePlay}
    >
      <source src={selectedSong.link} />
    </audio>
  );
}
