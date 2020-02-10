import React from "react";

import SongInfo from "./SongInfo";
import SongControls from "./SongControls";

const NowPlayingBlock = ({
  songTitle,
  albumImg,
  currentlyPlaying,
  pauseSong,
  playSong,
  playNext,
  playPrevious
}) => {
  return (
    <div>
      <SongInfo songTitle={songTitle} albumImg={albumImg} />
      <SongControls
        currentlyPlaying={currentlyPlaying}
        pauseSong={pauseSong}
        playSong={playSong}
        playNext={playNext}
        playPrevious={playPrevious}
      />
    </div>
  );
};

export default NowPlayingBlock;
