import React, { useState, useCallback } from "react";
import cx from "classnames";
import debouncer from "lodash.debounce";
import searchCloseIcon from "../../Assets/img/search-close.svg";

function SearchBox({ value = "", debounce = true, debounceTime = 1000, onChange, size }) {
  const [searchValue, setValue] = useState(value);

  const valueChanger = useCallback(
    // debounce function will call the onchange functions once it completly finish typing
    // and debouncer is loadash.debounce its pretty good so we can make use of it otherwise
    // we can able to write for own debounce function with setTimeout and clearTimeout function
    debouncer((value) => {
      onChange(value);
    }, debounceTime),
    []
  );

  function onChanger(e) {
    setValue(e.target.value);
    if (debounce) {
      // to call the debounce function
      valueChanger(e.target.value);
    } else {
      onChange(e.target.value);
    }
  }

  function onHandleClose(e) {
    e.stopPropagation();
    e.preventDefault();
    setValue("");
    onChange("");
  }
  let className = cx(
    "search-default",
    { "search-active": searchValue },
    { "block-search": size === "full" }
  );
  return (
    <div className={className} style={{ display: "flex", justifyContent: "center" }}>
      <input
        className="form-control"
        name="searchContent"
        placeholder="Search"
        onChange={onChanger}
        value={searchValue}
      />

      <span className="search-icon">
        <img src={require(`../../Assets/img/search.svg`)} alt="img" />
      </span>
      {searchValue ? (
        <span className="clear-text" onClick={(e) => onHandleClose(e)}>
          <img src={searchCloseIcon} alt="search" />
        </span>
      ) : null}
    </div>
  );
}

export default SearchBox;
