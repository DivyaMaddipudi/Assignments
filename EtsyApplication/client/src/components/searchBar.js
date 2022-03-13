import React, { useState } from "react";

function searchBar(props) {
  const [searchTerms, setSearchTerms] = useState("");

  // const searchInfo = (e) => {
  //   e.preventDefault();
  //   console.log("Search clicked");
  // };

  const onChangeSearchEvent = (e) => {
    setSearchTerms(e.target.value);
    props.refreshFunction(e.target.value);
  };
  return (
    <form className="search_form">
      <input
        type="text"
        id="searchBar"
        className="searchBar"
        placeholder={props.placeholder}
        value={searchTerms}
        onChange={onChangeSearchEvent}
      ></input>

      <div className="search">
        <div className="dataResult"></div>
      </div>
    </form>
  );
}

export default searchBar;
