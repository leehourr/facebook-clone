import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import SearchFacebook from "./SearchFacebook";

const SearchInput = ({
  isSmallScreen,
  showFbSearch,
  onFocus,
  onBlurCapture,
  className,
}) => {
  const searchInput = useRef();
  useEffect(() => {
    if (showFbSearch) {
      searchInput.current.focus();
    }
  }, [showFbSearch]);
  return (
    <>
      <input
        ref={showFbSearch ? searchInput : null}
        onFocus={onFocus}
        onBlurCapture={onBlurCapture}
        type="text"
        placeholder="Search Facebook"
        className={className}
      />
      <div className="absolute top-14">
        {showFbSearch && <SearchFacebook />}
      </div>
    </>
  );
};

export default SearchInput;
