import React, { useState } from "react";
import ListView from "../ListView";
import SearchBox from "../SearchBox";

function AllSongs(props) {
  const data = props.songsdata;
  const [searchValue, setValue] = useState("");

  function onSearchChange(value) {
    setValue(value);
  }

  let tempArr = [];
  searchValue.length &&
    data.forEach((eachSong) => {
      if (
        eachSong.title.substring(0, searchValue.length).toLowerCase() ===
          searchValue.toLowerCase() ||
        eachSong.title.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        tempArr.push(eachSong);
      }
    });
  const songsList = searchValue.length ? tempArr : data;
  return (
    <>
      <SearchBox onChange={onSearchChange} value={searchValue} debounce={true} />
      <ListView ListData={songsList} />
    </>
  );
}

export default AllSongs;
