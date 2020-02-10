import React from "react";

const SongControls = ({currentlyPlaying, playNext, playPrevious, pauseSong, playSong} ) => {
    return (
    <div>
      <button onClick={playPrevious}> Previous </button>
      <button onClick={playNext}> Skip </button>
        {currentlyPlaying
          ? <button onClick={pauseSong}>Pause</button>
          : <button onClick={playSong}>Play</button>}
    </div>
  );
};

export default SongControls;
