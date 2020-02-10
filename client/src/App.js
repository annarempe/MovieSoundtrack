import React, { useEffect, useState } from "react";

import "./App.css";
import Login from "./Components/Login";
import NowPlayingBlock from "./Components/NowPlayingBlock";
import UserPlaylist from "./Components/UserPlaylist";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [params, setParams] = useState();
  const [nowPlaying, setNowPlaying] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState();
  const [seconds, setSeconds] = useState(0);
  const [playlists, setPlaylists] = useState({});

  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  useEffect(() => {
    setParams(getHashParams());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [seconds]);

  // useEffect(() => {
  //   getNowPlaying();
  // }, [seconds]);

  useEffect(() => {
    if (params && params.access_token) {
      setLoggedIn(params.access_token ? true : false);
    }
  }, [params]);

  const getNowPlaying = () => {
    if (params) {
      console.log(params.access_token);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + params.access_token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        requestOptions
      )
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(result => {
          if (result && result.item) {
            setNowPlaying({
              img: result.item.album.images[0].url,
              name: result.item.name
            });
          }
        })
        .catch(error => console.log("error", error));
    }
  };

  const getPlaylists = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.access_token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://api.spotify.com/v1/me/playlists", requestOptions)
      .then(response => response.text())
      .then(response => JSON.parse(response))
      .then(response => {
        setPlaylists(response.items);
      })
      .catch(error => console.log("error", error));

    if (playlists) {
      return Array.from(playlists).map(playlist => {
        return (
          <UserPlaylist
            key={playlist.id}
            title={playlist.name}
            cover={playlist.images[0].url}
          />
        );
      });
    }
  };

  const playNext = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.access_token);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://api.spotify.com/v1/me/player/next", requestOptions)
      .then(response => response.text())
      .catch(error => console.log("error", error));
  };

  const playPrevious = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.access_token);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      "https://api.spotify.com/v1/me/player/seek?position_ms=0",
      requestOptions
    )
      .then(response => response.text())
      .catch(error => console.log("error", error));
  };

  const playSong = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.access_token);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      "https://api.spotify.com/v1/me/player/play?device_id=435447ac3c4e16f9e3ba2de7d197bc6f343a5cd3",
      requestOptions
    )
      .then(response => response.text())
      .catch(error => console.log("error", error));
    setCurrentlyPlaying(true);
  };

  const pauseSong = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + params.access_token);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      "https://api.spotify.com/v1/me/player/pause?device_id=435447ac3c4e16f9e3ba2de7d197bc6f343a5cd3",
      requestOptions
    )
      .then(response => response.text())
      .catch(error => console.log("error", error));
    setCurrentlyPlaying(false);
  };

  const UserDashboard = () => {
    return (
      <div>
        {nowPlaying ? (
          <div>
            <NowPlayingBlock
              songTitle={nowPlaying.name}
              albumImg={nowPlaying.img}
              currentlyPlaying={currentlyPlaying}
              pauseSong={pauseSong}
              playSong={playSong}
              playNext={playNext}
              playPrevious={playPrevious}
            />
          </div>
        ) : (
          <div>No song playing</div>
        )}
      </div>
    );
  };
  return (
    <div className="App">
      {!loggedIn ? (
        <Login />
      ) : (
        <div>
          <button onClick={getNowPlaying}> currently playing </button>
          {UserDashboard()}
          <div className="Playlists">{getPlaylists()}</div>
        </div>
      )}
    </div>
  );
}

export default App;
