import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function searchFeature(props) {
  const [searchTerms, setSearchTerms] = useState("");

  const onChangeSearchEvent = (e) => {
    setSearchTerms(e.target.value);
    props.refreshFunction(e.target.value);
  };

  return (
    <div>
      <Search
        value={searchTerms}
        onChange={onChangeSearchEvent}
        placeholder="Search by typing.."
      />
    </div>
  );
}

export default searchFeature;
