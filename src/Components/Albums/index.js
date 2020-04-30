import React, { useEffect, useState } from "react";
import SearchBox from "../SearchBox";
import ListView from "../ListView";

function Albums(props) {
  const [data, setData] = useState([]);
  const [showSongList, setShowSongList] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [searchValue, setValue] = useState("");
  const { songsdata } = props;
  useEffect(() => {
    // we can use data.length to prevent unnecessary Api calls. here it prevented
    //   if(data.length < 0){
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => setData(json));
    //   }
  }, []);

  function onSearchChange(value) {
    setValue(value);
  }

  function handleClick(album) {
    setSelectedAlbum(album);
    setShowSongList(true);
  }

  let songArr = [];
  showSongList &&
    songsdata.forEach((eachSong) => {
      if (eachSong.albumId === selectedAlbum.id) {
        songArr.push(eachSong);
      }
    });

  let tempArr = [];
  const filter = showSongList ? songArr : data;
  searchValue.length &&
    filter.forEach((eachSong) => {
      if (
        eachSong.title.substring(0, searchValue.length).toLowerCase() ===
          searchValue.toLowerCase() ||
        eachSong.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        tempArr.push(eachSong);
      }
    });

  const albumsList = searchValue.length ? tempArr : data;
  return (
    <>
      <SearchBox onChange={onSearchChange} value={searchValue} debounce={true} />
      {showSongList ? (
        <>
          <p className="back-button" onClick={() => setShowSongList(false)}>
            {`< ${selectedAlbum.title}`}
          </p>
          <h4>List Of Songs</h4>
        </>
      ) : (
        <h4>click on the album to see the songslist</h4>
      )}
      <ListView
        ListData={showSongList && !searchValue.length ? songArr : albumsList}
        onclick={!showSongList && handleClick}
      />
    </>
  );
}

export default Albums;
