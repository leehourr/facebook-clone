import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useActionData } from "react-router-dom";
import SearchFacebook from "./SearchFacebook";
import { searchActions } from "../../../store/searchSlice";
import store from "../../../store";
import { searchAcc } from "../../../utils/api-call";

const SearchInput = ({ showFbSearch, onFocus, onBlurCapture, className }) => {
  const searchInput = useRef();
  const [searchName, setSearchName] = useState("");
  useActionData();
  useEffect(() => {
    if (showFbSearch) {
      searchInput.current.focus();
    }
  }, [showFbSearch]);

  // console.log("search", searchName);

  const searchNameHandler = async (e) => {
    // console.log("search", e.target.value);
    setSearchName(e.target.value);
    let res = [];
    if (e.target.value !== "") {
      res = await searchAcc(e.target.value);
      // console.log(res);
    }
    if (res.length > 0) {
      store.dispatch(searchActions.search(res));
      return;
    }
    store.dispatch(searchActions.emptySearch());
  };
  return (
    <>
      <input
        ref={showFbSearch ? searchInput : null}
        onFocus={onFocus}
        value={searchName}
        onChange={searchNameHandler}
        onBlurCapture={onBlurCapture}
        type="text"
        placeholder="Search Facebook"
        className={className}
      />
      <div className="absolute w-full top-[3.03rem]">
        {showFbSearch && <SearchFacebook />}
      </div>
    </>
  );
};

export default SearchInput;
