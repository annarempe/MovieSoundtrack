import React from "react";

const UserPlaylist = ({ title, cover }) => {
  return (
    <div>
      <img src={cover} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default UserPlaylist;
