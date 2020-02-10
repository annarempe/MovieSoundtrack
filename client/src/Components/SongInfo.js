import React from "react";

const SongInfo = (  {songTitle, albumImg}) => {
    return (
    <div>
        <p>{songTitle}</p>
        <img alt="album cover" src={albumImg} />
    </div>
  );
};

export default SongInfo;
