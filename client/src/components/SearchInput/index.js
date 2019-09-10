import React, { useState, useEffect } from "react";
import { TextField, Cutout } from "react95";
import { StyledAppBarInputContainer, SearchResultsWindow } from "../../styles";
import { Loading } from "../../utils";
import SearchResults from "./components/SearchResults";

function SearchInput() {
  const [searchField, setSearchField] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchInputActiveStatus, setSearchInputActiveStatus] = useState(false);

  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      if (value) {
        setSearching(true);
      }
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value]);

    return debouncedValue;
  };
  const debouncedSearchTerm = useDebounce(searchField, 400);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/users/`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          string: debouncedSearchTerm
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res.searched_string === debouncedSearchTerm) {
            setSearching(false);
            setSearchResults(res.results);
          }
        })
        .catch(error => {
          console.error(`ERROR: ${error}`);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <StyledAppBarInputContainer>
      <TextField
        onFocus={() => setSearchInputActiveStatus(true)}
        type="text"
        onChange={event => setSearchField(event.target.value)}
        value={searchField}
        placeholder="search 🔎"
      />
      {searchInputActiveStatus &&
        (searchField &&
          (searching ? (
            <SearchResultsWindow>
              <Cutout>
                <Loading />
              </Cutout>
            </SearchResultsWindow>
          ) : searchResults.length ? (
            <SearchResultsWindow>
              <Cutout>
                <SearchResults
                  searchResults={searchResults}
                  setSearchInputActiveStatus={setSearchInputActiveStatus}
                  setSearchField={setSearchField}
                />
              </Cutout>
            </SearchResultsWindow>
          ) : (
            <SearchResultsWindow>
              <Cutout>
                <p
                  style={{
                    padding: "10px",
                    textAlign: "center"
                  }}
                >
                  no matches for "{searchField}"
                  <span role="img" aria-label="broken heart">
                    💔
                  </span>
                </p>
              </Cutout>
            </SearchResultsWindow>
          )))}
    </StyledAppBarInputContainer>
  );
}

export default SearchInput;
