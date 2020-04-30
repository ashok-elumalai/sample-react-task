import React, { useState } from "react";
import { Button } from "antd";
import ListView from "../ListView";
import SearchBox from "../SearchBox";

function Playlist(props) {
  const [showInput, setshowInput] = useState(false);
  const [playListName, setPlayListName] = useState({});
  const [playList, setCreatePlaylist] = useState([]);
  const [showSongList, setShowSongList] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [addSong, setaddSong] = useState(false);
  const [searchValue, setValue] = useState("");
  const { songsdata } = props;
  function createPlaylist() {
    setshowInput(true);
  }

  function onHandleChange(e) {
    let value = e.target.value;
    let currentdate = new Date();
    setPlayListName({
      title: value,
      songs: [],
      createdAt:
        currentdate.getMonth() + 1 + "-" + currentdate.getDate() + "-" + currentdate.getFullYear(),
    });
  }

  function onSubmit() {
    let tempArr = playList;
    tempArr.push(playListName);
    setCreatePlaylist(tempArr);
    setshowInput(false);
  }

  function handleClick(value) {
    setSelectedPlaylist(value);
    setShowSongList(true);
  }

  function onSearchChange(value) {
    setValue(value);
  }

  function addToPlaylist(song) {
    let tempPlaylist = playList;
    tempPlaylist.forEach((eachPlaylist, index) => {
      if (selectedPlaylist.title === eachPlaylist.title) {
        tempPlaylist[index].songs.push(song);
      }
    });
    setCreatePlaylist(tempPlaylist);
    setaddSong(false);
  }

  function onShuffle(data) {
    let arrayToShuffle = data.songs;
    let currentIndex = arrayToShuffle.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arrayToShuffle[currentIndex];
      arrayToShuffle[currentIndex] = arrayToShuffle[randomIndex];
      arrayToShuffle[randomIndex] = temporaryValue;
    }
    setSelectedPlaylist({
      ...data,
      songs: arrayToShuffle,
    });
  }

  function onAddSong() {
    setaddSong(true);
  }

  function onDelete(playlistToDelete) {
    let tempPlaylist = playList.slice();
    tempPlaylist.forEach((eachPlaylist, index) => {
      if (playlistToDelete.title === eachPlaylist.title) {
        tempPlaylist.splice(index, 1);
      }
    });
    setCreatePlaylist(tempPlaylist);
  }

  let tempArr = [];
  searchValue.length &&
    songsdata.forEach((eachSong) => {
      if (
        eachSong.title.substring(0, searchValue.length).toLowerCase() ===
          searchValue.toLowerCase() ||
        eachSong.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        tempArr.push(eachSong);
      }
    });
  let tempsongList = [];
  const songsList = selectedPlaylist?.songs?.length
    ? playList.forEach((eachPlaylist, index) => {
        if (selectedPlaylist.title === eachPlaylist.title) {
          playList[index].songs.forEach((eachSong) => {
            songsdata.forEach((song, index) => {
              if (eachSong.id === song.id) {
                songsdata.splice(index, 1);
              } else {
                tempsongList.push(song);
              }
            });
          });
        }
      })
    : songsdata;
  const data = searchValue.length
    ? tempArr
    : addSong && showSongList
    ? selectedPlaylist?.songs?.length
      ? tempsongList
      : songsList
    : showSongList
    ? selectedPlaylist.songs
    : playList;
  return (
    <>
      {!showSongList && (
        <div className="playlist-container">
          <Button onClick={createPlaylist}>Add New Playlist</Button>
          {showInput && (
            <div>
              <input
                className="textbox"
                type="text"
                placeholder="Create playlist"
                onChange={onHandleChange}
              />
              <Button onClick={onSubmit}>Create Playlist</Button>
            </div>
          )}
        </div>
      )}
      {showSongList && !addSong && (
        <>
          <p className="back-button" onClick={() => setShowSongList(false)}>
            {`< ${selectedPlaylist.title}`}
          </p>
          <div className="sidebar">
            <Button onClick={() => onShuffle(selectedPlaylist)}>Shuffle Play</Button>
            <Button onClick={onAddSong}>Add Song</Button>
          </div>
        </>
      )}
      {addSong && (
        <>
          <p className="back-button" onClick={() => setaddSong(false)}>
            {"< BackToPlaylist"}
          </p>
          <SearchBox onChange={onSearchChange} value={searchValue} debounce={true} />
        </>
      )}
      <ListView
        ListData={data}
        onclick={!addSong && !showSongList && handleClick}
        onDeletingPlaylist={onDelete}
        Tab={addSong ? "AddSong" : showSongList && !addSong ? "" : "playlist"}
        addSongToPlaylist={addToPlaylist}
      />
    </>
  );
}

export default Playlist;
