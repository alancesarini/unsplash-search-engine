import React, { useState } from "react";

const ImageSearch = props => {
  const [searchValue, setSearchValue] = useState("");

  const changeHandler = e => {
    setSearchValue(e.target.value);
  };

  const keyPressHandler = e => {
    if (e.keyCode === 13) {
      props.onSearch(searchValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={changeHandler}
        onKeyUp={keyPressHandler}
        placeholder="Enter your search and hit Enter"
        size={45}
        ref={props.inputRef}
      />
    </div>
  );
};

export default ImageSearch;
