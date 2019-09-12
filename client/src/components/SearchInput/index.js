import React, { useState, useEffect, useRef } from "react";
import { TextField, Cutout, ListItem, List } from "react95";
import { StyledAppBarInputContainer, SearchResultsWindow } from "../../styles";
import { Loading } from "../../utils";
import { Link } from "react-router-dom";

function SearchInput() {
  const [searchField, setSearchField] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchInputActiveStatus, setSearchInputActiveStatus] = useState(false);
  const searchResultsNode = useRef();

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
    document.addEventListener("mousedown", searchResultsClickListener);
    return () => {
      document.removeEventListener("mousedown", searchResultsClickListener);
    };
  }, []);

  const searchResultsClickListener = event => {
    if (!searchResultsNode.current.contains(event.target)) {
      setSearchInputActiveStatus(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (debouncedSearchTerm) {
      setSearching(true);
      fetch(`${process.env.REACT_APP_ENDPOINT}/api/users/`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: token
        },
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
      <div ref={searchResultsNode}>
        <TextField
          onFocus={() => setSearchInputActiveStatus(true)}
          type="text"
          onChange={event => setSearchField(event.target.value)}
          value={searchField}
          placeholder="search 🔎"
        ></TextField>
        {searchInputActiveStatus &&
          (searchField && (
            <SearchResultsWindow>
              <Cutout>
                {searching ? (
                  <Loading />
                ) : searchResults.length ? (
                  <div>
                    <List fullWidth>
                      {searchResults.map(user => (
                        <Link
                          key={user.id}
                          onClick={() => {
                            setSearchInputActiveStatus(false);
                            setSearchField("");
                          }}
                          to={`/authenticated/profile/${user.id}`}
                        >
                          <ListItem>{user.full_name}</ListItem>
                        </Link>
                      ))}
                    </List>
                  </div>
                ) : (
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
                )}
              </Cutout>
            </SearchResultsWindow>
          ))}
      </div>
    </StyledAppBarInputContainer>
  );
}

export default SearchInput;
